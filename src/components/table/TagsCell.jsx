import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tag, tag as tagButton } from "ducks/buttons";
import { ReactComponent as TagIcon } from "assets/icons/outline/tag.svg";
import ReactTags from "react-tag-autocomplete";

const delimiters = ["Enter", "Tab"];

export default function TagsCell({ buttonId }) {
  const dispatch = useDispatch();

  const [editTags, setEditTags] = useState(false);

  const tags = useSelector((state) => {
    return state.buttons[buttonId] && state.buttons[buttonId].attributes.tags;
  });

  const suggestions = useSelector((state) => {
    const sugg = Object.values(state.buttons).reduce((acc, button) => {
      return [...acc, ...button.attributes.tags];
    }, []);

    return [...new Set(sugg)].map((t) => ({ id: t, name: t }));
  });

  const handleDelete = (i) => {
    dispatch(
      tagButton(buttonId, {
        data: {
          attributes: {
            tags: tags.filter((_tag, index) => index !== i),
          },
        },
      })
    );
  };

  const handleAddition = (tag) => {
    const newTags = [...tags, tag.name];

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

  return editTags ? (
    <div className="ReactTags__container">
      <ReactTags
        tags={tags.map((tag) => ({ id: tag, name: tag }))}
        allowNew
        delimiters={delimiters}
        onAddition={handleAddition}
        onDelete={handleDelete}
        placeholderText="Add tag"
        suggestions={suggestions}
      />
      <button
        className="react-tags__close"
        onClick={(e) => {
          e.preventDefault();
          setEditTags(false);
        }}
      >
        x
      </button>
    </div>
  ) : (
    <div
      className="ReactTags__container"
      onClick={(e) => {
        e.preventDefault();
        setEditTags(true);
      }}
    >
      <>
        {tags.map((tag) => {
          return <button className="react-tags__tag">{tag}</button>;
        })}
      </>
    </div>
  );
}
