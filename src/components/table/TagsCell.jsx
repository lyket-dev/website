import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WithContext as ReactTags } from "react-tag-input";
import { tag as tagButton } from "ducks/buttons";
import { ReactComponent as Pencil } from "assets/icons/outline/tag.svg";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function TagsCell({ buttonId }) {
  const dispatch = useDispatch();

  const [readOnly, setReadOnly] = useState(true);

  const tags = useSelector((state) => {
    return (
      state.buttons[buttonId] &&
      state.buttons[buttonId].attributes.tags.map((t) => ({ id: t, text: t }))
    );
  });

  const suggestions = useSelector((state) => {
    const sugg = Object.values(state.buttons).reduce((acc, button) => {
      return [...acc, ...button.attributes.tags];
    }, []);

    return [...new Set(sugg)].map((t) => ({ id: t, text: t }));
  });

  const handleDelete = (i) => {
    dispatch(
      tagButton(buttonId, {
        data: {
          attributes: {
            tags: tags.filter((tag, index) => index !== i).map((t) => t.text),
          },
        },
      })
    );
  };

  const handleAddition = (tag) => {
    const newTags = [...tags, tag].map((t) => t.text);

    dispatch(
      tagButton(buttonId, {
        data: {
          attributes: {
            tags: newTags,
          },
        },
      })
    );
  };

  return (
    <div className="ReactTags__container">
      {tags.length > 0 ? (
        <ReactTags
          tags={tags}
          readOnly={readOnly}
          suggestions={suggestions}
          handleDelete={handleDelete}
          allowDragDrop={false}
          handleAddition={handleAddition}
          delimiters={delimiters}
        />
      ) : (
        <button
          className="flex"
          onClick={(e) => {
            e.preventDefault();
            setReadOnly(!readOnly);
          }}
        >
          <Pencil className="ReactTags__icon" />
        </button>
      )}
    </div>
  );
}
