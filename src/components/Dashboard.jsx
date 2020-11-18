import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAll } from "../ducks/buttons";
import useAsyncEffect from "../utils/useAsyncEffect";
import { Page, Section } from "components/sub/Page";
import { Panes, Pane, Menu } from "components/sub/Panes";
import ButtonsTable from "components/sub/ButtonsTable";
import "rsuite-table/dist/css/rsuite-table.css";

export default function Dashboard() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(fetchAll());
  };

  const namespaces = useSelector((state) => {
    return Object.values(state.buttons)
      .map((b) => b.attributes.namespace)
      .filter((value, index, self) => self.indexOf(value) === index);
  });

  useAsyncEffect(fetchData, []);

  const handleClick = () => fetchData();

  return (
    <Page>
      <Section>
        <Panes minSize={50}>
          <Menu>
            <li>
              <Link to={`/dashboard`}>All</Link>
            </li>
            {namespaces.map((namespace) => {
              const slug = namespace ? namespace : "no-namespace";
              return (
                <li key={slug}>
                  <Link to={`/dashboard/${slug}`}>{slug}</Link>
                </li>
              );
            })}
            <div className="space__bottom" />
            <button className="button" onClick={handleClick}>
              Refresh buttons!
            </button>
          </Menu>
          <Pane>
            <ButtonsTable />
          </Pane>
        </Panes>
      </Section>
    </Page>
  );
}
