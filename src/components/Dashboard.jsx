import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../ducks/buttons";
import useAsyncEffect from "../utils/useAsyncEffect";

export default function Dashboard() {
  const dispatch = useDispatch();
  const buttons = useSelector((state) => {
    return Object.values(state.buttons);
  });

  const fetchData = async () => {
    await dispatch(fetchAll());
  };

  useAsyncEffect(fetchData, []);

  const handleClick = () => fetchData();

  const renderButton = (button) => {
    return (
      <div key={button.id}>
        {button.attributes.name}|{button.attributes.counter}
      </div>
    );
  };

  return (
    <div className="Page">
      {buttons.length > 0 && buttons.map((button) => renderButton(button))}
      <button onClick={handleClick}>Refresh!</button>
    </div>
  );
}
