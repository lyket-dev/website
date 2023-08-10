import { addYears } from 'date-fns';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import isSameYear from 'date-fns/isSameYear';
import setDate from 'date-fns/setDate';
import startOfYear from 'date-fns/startOfYear';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const thousandsLabel = ['', 'k', 'M'];

function formatUnit(num, precision = 0, showUnit = true) {
  if (isNaN(parseFloat(num)) || !isFinite(num)) {
    return '-';
  }

  if (num < 1) {
    return showUnit ? 'No pageviews' : '0';
  }

  if (num < 2) {
    return showUnit ? '1 pageview' : '1';
  }

  const number = Math.floor(Math.log(num) / Math.log(1000));
  const thousands = number === 0 && !showUnit ? '' : thousandsLabel[number];

  return `${(num / 1000 ** Math.floor(number)).toFixed(
    precision,
  )} ${thousands}`;
}

const generatePeriod = () => {
  const startDate = startOfYear(new Date());
  let currDate = startDate;
  const result = [];

  do {
    result.push(currDate);
    currDate = addMonths(currDate, 1);
  } while (isSameYear(currDate, startDate));

  return result;
};

const generatePoints = (period, data, metrics) => {
  const points = [];

  period.forEach((date) => {
    const id = format(date, 'M-yyyy');
    const prevId = format(addYears(date, -1), 'M-yyyy');
    const point = { date: format(date, 'MMM') };

    metrics.forEach((metric) => {
      point[metric] = {
        current: data[id] ? data[id].attributes[metric] : null,
        previous: data[prevId] ? data[prevId].attributes[metric] : null,
      };
    });

    points.push(point);
  });

  return points;
};

const colors = {
  pageviews: '#22c1c3',
};

const previousYearColors = {
  pageviews: '#a8a2b8',
};

const renderValueWithUnit = (value, precision = 2, showUnit = true) => {
  return formatUnit(value, precision, showUnit);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    const currentMonth = setDate(new Date(), label);
    const previousMonth = addMonths(currentMonth, -1);

    const currentPoints = payload.filter((data) => data.unit === 'current');
    const previousPoints = payload.filter((data) => data.unit === 'previous');

    return (
      <div className="UsageChart__tooltip">
        {currentPoints.length > 0 && (
          <div className="UsageChart__tooltip__group">
            <div className="UsageChart__tooltip__label">{currentMonth}</div>
            {currentPoints.map((data) => (
              <div key={data.color}>
                <span>
                  <span
                    className="UsageChart__tooltip__square"
                    style={{ backgroundColor: data.fill }}
                  />{' '}
                  {data.name}:
                </span>{' '}
                {data.formatter(data.value)}
              </div>
            ))}
          </div>
        )}

        <div className="UsageChart__tooltip__group">
          <div className="UsageChart__tooltip__label">{previousMonth}</div>
          {previousPoints.map((data) => (
            <div key={data.color}>
              <span>
                <span
                  className="UsageChart__tooltip__square"
                  style={{ backgroundColor: data.fill }}
                />{' '}
                {data.name}:
              </span>{' '}
              {data.formatter(data.value)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.object,
  label: PropTypes.string,
};

const UsageChart = ({ data, metrics, threshold, unit }) => {
  const period = useMemo(generatePeriod, []);

  const points = useMemo(
    () => generatePoints(period, data, metrics),
    [data, metrics, period],
  );

  const total = useMemo(
    () =>
      period.reduce((acc, date) => {
        const id = format(date, 'M-yyyy');
        return (
          acc +
          metrics.reduce((acc2, metric) => {
            return acc2 + (data[id] ? data[id].attributes[metric] : 0);
          }, 0)
        );
      }, 0),
    [data, metrics, period],
  );

  return (
    <div className="UsageChart">
      <div className="UsageChart__header">
        <div className="menu__item space__bottom-2">
          Total Pageviews:{' '}
          {total !== undefined
            ? renderValueWithUnit(total, 0, false)
            : 'Loading...'}
        </div>
      </div>
      <div className="UsageChart__graph">
        <ResponsiveContainer height={250} width="100%">
          <BarChart
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            data={points}
            syncId="usage"
          >
            <CartesianGrid strokeDasharray="1px 1px" vertical={false} />
            <YAxis
              dataKey={(point) =>
                Math.max(
                  metrics.reduce(
                    (sum, metric) => sum + (point[metric].previous || 0),
                    0,
                  ),
                  metrics.reduce(
                    (sum, metric) => sum + (point[metric].current || 0),
                    0,
                  ),
                )
              }
              tickFormatter={(v) => renderValueWithUnit(v, 0, false)}
            />
            <XAxis dataKey="date" />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ top: '-10px' }}
              payload={[
                {
                  value: 'pageviews',
                  type: 'square',
                  color: colors.pageviews,
                },
                {
                  value: 'pageviews last year',
                  type: 'square',
                  color: previousYearColors.pageviews,
                },
              ]}
            />
            {threshold && (
              <ReferenceLine
                y={threshold}
                label="Max"
                stroke="red"
                strokeDasharray="3 3"
              />
            )}
            {metrics.map((metric) => (
              <Bar
                type="linear"
                key={`previous-${metric}`}
                id={`previous-${metric}`}
                name={'pageviews'}
                dataKey={(point) => point[metric].previous}
                fill={previousYearColors[metric]}
                unit="previous"
                formatter={(v) => renderValueWithUnit(v, 2, false)}
                stackId="previous"
              />
            ))}
            {metrics.map((metric) => (
              <Bar
                id={`current-${metric}`}
                key={`current-${metric}`}
                name={'pageviews'}
                type="linear"
                dataKey={(point) => point[metric].current}
                fill={colors[metric]}
                formatter={(v) => renderValueWithUnit(v, 2, false)}
                stackId="current"
                unit="current"
              />
            ))}
            {false && (
              <Tooltip
                offset={30}
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(87, 227, 255, 0.1)', zIndex: '-1' }}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

UsageChart.propTypes = {
  name: PropTypes.string,
  unit: PropTypes.string,
  data: PropTypes.object,
  metrics: PropTypes.array.isRequired,
  threshold: PropTypes.number,
};

export default UsageChart;
