import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import palette from 'utils/palette';
import { sort } from 'utils/sort';

const Chart = ({ buttons }) => {
  const colors = [...palette];

  const values = buttons.map((button) => {
    const color =
      colors.length > 0
        ? colors.pop([Math.floor(Math.random() * palette.length)])
        : { hex: '#fffca1' };

    return {
      title: button.name,
      value: button.score,
      color: color.hex,
    };
  });

  return <PieChart data={values} animate labelPosition={0} />;
};

const Top = ({ three, currentNamespace }) => {
  return (
    <div className="card">
      <div className="card__label">Top 3</div>
      <div className="card__bullet__container">
        {three.map((button, index) => {
          const name = currentNamespace
            ? `${button.name}`
            : `${button.namespace || 'no-namespace'}/${button.name}`;

          return (
            <div
              className="card__bullet"
              key={`${button.type}${button.namespace}${button.name}`}
            >
              <div className="card__bullet__num">{index + 1}. </div>
              <span>{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Total = ({ currentTotalCount }) => {
  return (
    <div className="card">
      <div className="card__label">Total buttons</div>
      <div className="card__container">
        <p className="card__bigtext">{currentTotalCount}</p>
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

export default function Cards({
  buttons,
  currentNamespace,
  currentTotalCount,
}) {
  return (
    <div className="cards">
      <Top
        three={sort(buttons, 'desc', 'score').slice(0, 3)}
        currentNamespace={currentNamespace}
      />
      <Total currentTotalCount={currentTotalCount || 0} />
      <ChartCard buttons={buttons} />
    </div>
  );
}
