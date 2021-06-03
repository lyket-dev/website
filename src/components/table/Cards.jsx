import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import palette from "utils/palette";
import { sort } from "utils/sort";

const Chart = ({ buttons }) => {
  const colors = [...palette];

  const values = buttons.map((button) => {
    const color =
      colors.length > 0
        ? colors.pop([Math.floor(Math.random() * palette.length)])
        : { hex: "#fffca1" };

    return {
      title: button.name,
      value: button.score,
      color: color.hex,
    };
  });

  return <PieChart data={values} animate labelPosition={0} />;
};

const Top = ({ three }) => {
  return (
    <div className="card">
      <div className="card__label">Top 3</div>
      {three.map((button, index) => (
        <div
          className="card__bullet"
          key={`${button.type}${button.namespace}${button.name}`}
        >
          <div className="card__bullet__num">{index + 1}. </div>
          <span>{`${button.type}-buttons/${button.namespace}/${button.name}`}</span>
        </div>
      ))}
    </div>
  );
};

const Total = ({ buttons }) => {
  const total = buttons.reduce((sum, button) => {
    return sum + button.total_votes;
  }, 0);

  return (
    <div className="card">
      <div className="card__label">Total votes</div>
      <div className="card__container">
        <p className="card__bigtext">{total}</p>
      </div>
    </div>
  );
};

const ChartCard = ({ buttons }) => {
  const toShow = buttons.filter((b) => b.score > 0);

  return (
    <div className="card">
      <div className="card__label">Score chart</div>
      {toShow.length === 0 ? (
        <div className="card__container">
          <p className="card__bigtext">-</p>
        </div>
      ) : (
        <Chart buttons={toShow} />
      )}
    </div>
  );
};

export default function Cards({ buttons }) {
  return (
    <div className="cards">
      <Top three={sort(buttons, "desc", "score").slice(0, 3)} />
      <Total buttons={buttons} />
      <ChartCard buttons={buttons} />
    </div>
  );
}
