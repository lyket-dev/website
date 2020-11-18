import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../ducks/buttons";
import useAsyncEffect from "../utils/useAsyncEffect";
import { Page, Section } from "components/sub/Page";

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
        {button.attributes.name} | {button.attributes.counter}
      </div>
    );
  };

  return (
    <Page>
      <Section>{buttons.map((button) => renderButton(button))}</Section>
      <Section>
        <button onClick={handleClick}>Refresh!</button>
      </Section>
    </Page>
  );
}
