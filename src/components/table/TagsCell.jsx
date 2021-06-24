import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WithContext as ReactTags } from "react-tag-input";
import { tag as tagButton } from "ducks/buttons";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function TagsCell({ buttonId }) {
  const dispatch = useDispatch();

  const tags = useSelector((state) => {
    return (
      state.buttons[buttonId] &&
      state.buttons[buttonId].attributes.tags.map((t) => ({ id: t, text: t }))
    );
  });

  const [suggestions, setSuggestions] = useState([]);

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

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
  };

  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        delimiters={delimiters}
      />
    </div>
  );
}
