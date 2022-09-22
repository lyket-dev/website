import { SubmissionError } from "redux-form-mock";
import setValue from "set-value";
import isNumeric from "utils/isNumeric";

const BASE_ERROR_FIELD = "_error";

const convertObjectsThatLookLikeArrays = (entity) => {
  if (Array.isArray(entity)) {
    return entity.map(convertObjectsThatLookLikeArrays);
  }

  if (typeof entity !== "object") {
    return entity;
  }

  if (entity === null || entity === undefined) {
    return entity;
  }

  const keys = Object.keys(entity);
  const allNumeric = keys.length > 0 && keys.every((key) => isNumeric(key));

  return Object.entries(entity).reduce(
    (acc, [k, v]) => {
      acc[k] = convertObjectsThatLookLikeArrays(v);
      return acc;
    },
    allNumeric ? [] : {}
  );
};

export default function convertToFormErrors(
  response,
  wrapInSubissionError = true
) {
  if (!response.data) {
    return {};
  }

  const { data } = response;

  const result = data.reduce((errors, { attributes }) => {
    if (attributes && attributes.code === "INVALID_FIELD") {
      const {
        field,
        code,
        options,
        field_type: fieldType,
      } = attributes.details;

      let errorField = field;

      if (field === "base") {
        errorField = BASE_ERROR_FIELD;
      }

      if (fieldType === "rich_text") {
        errorField = `_${field}`;
      }

      let values = {};

      if (options) {
        const valorizedKeys = Object.entries(options)
          .filter((entry) => !!entry[1])
          .filter((entry) => !Array.isArray(entry[1]) || entry[1].length > 0)
          .map((entry) => entry[0])
          .sort()
          .join("_");

        const formattedOptions = Object.entries(options).reduce(
          (acc, [option, value]) => {
            if (Array.isArray(value)) {
              return { ...acc, [option]: value.join(", ") };
            }

            return { ...acc, [option]: value };
          },
          {}
        );

        values = { ...formattedOptions, valorizedKeys };
      }

      setValue(errors, errorField, { id: code, values });

      return errors;
    }

    if (attributes && attributes.code) {
      return {
        [BASE_ERROR_FIELD]: {
          id: attributes.code,
          details: attributes.details,
        },

        ...errors,
      };
    }

    return errors;
  }, {});

  const newResult = convertObjectsThatLookLikeArrays(result);

  return wrapInSubissionError ? new SubmissionError(newResult) : newResult;
}
