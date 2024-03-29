import Chartist from "chartist";

/* eslint-disable */

var defaultOptions = {
  threshold: 0,
  classNames: {
    aboveThreshold: "ct-threshold-above",
    belowThreshold: "ct-threshold-below",
  },
  maskNames: {
    aboveThreshold: "ct-threshold-mask-above",
    belowThreshold: "ct-threshold-mask-below",
  },
};

function createMasks(data, options) {
  // Select the defs element within the chart or create a new one
  var defs = data.svg.querySelector("defs") || data.svg.elem("defs");
  // Project the threshold value on the chart Y axis
  var projectedThreshold =
    data.chartRect.height() -
    data.axisY.projectValue(options.threshold) +
    data.chartRect.y2;
  var width = data.svg.width();
  var height = data.svg.height();

  // Create mask for upper part above threshold
  defs
    .elem("mask", {
      x: 0,
      y: 0,
      width: width,
      height: height,
      maskUnits: "userSpaceOnUse",
      id: options.maskNames.aboveThresholdID,
    })
    .elem("rect", {
      x: 0,
      y: 0,
      width: width,
      height: projectedThreshold,
      fill: "white",
    });

  // Create mask for lower part below threshold
  defs
    .elem("mask", {
      x: 0,
      y: 0,
      width: width,
      height: height,
      maskUnits: "userSpaceOnUse",
      id: options.maskNames.belowThresholdID,
    })
    .elem("rect", {
      x: 0,
      y: projectedThreshold,
      width: width,
      height: height - projectedThreshold,
      fill: "white",
    });

  return defs;
}

Chartist.plugins = Chartist.plugins || {};
Chartist.plugins.ctThreshold = function (options) {
  options = Chartist.extend({}, defaultOptions, options);

  // Ensure mask names are unique
  options.maskNames.aboveThresholdID =
    options.maskNames.aboveThreshold +
    "-" +
    Math.random().toString(36).substr(2, 9);
  options.maskNames.belowThresholdID =
    options.maskNames.belowThreshold +
    "-" +
    Math.random().toString(36).substr(2, 9);

  return function ctThreshold(chart) {
    if (chart instanceof Chartist.Line || chart instanceof Chartist.Bar) {
      chart.on("draw", function (data) {
        if (data.type === "point") {
          // For points we can just use the data value and compare against the threshold in order to determine
          // the appropriate class
          data.element.addClass(
            data.value.y >= options.threshold
              ? options.classNames.aboveThreshold
              : options.classNames.belowThreshold
          );
        } else if (
          data.type === "line" ||
          data.type === "bar" ||
          data.type === "area"
        ) {
          // Cloning the original line path, mask it with the upper mask rect above the threshold and add the
          // class for above threshold
          data.element
            .parent()
            .elem(data.element._node.cloneNode(true))
            .attr({
              mask: "url(#" + options.maskNames.aboveThresholdID + ")",
            })
            .addClass(options.classNames.aboveThreshold);

          // Use the original line path, mask it with the lower mask rect below the threshold and add the class
          // for blow threshold
          data.element
            .attr({
              mask: "url(#" + options.maskNames.belowThresholdID + ")",
            })
            .addClass(options.classNames.belowThreshold);
        }
      });

      // On the created event, create the two mask definitions used to mask the line graphs
      chart.on("created", function (data) {
        createMasks(data, options);
      });
    }
  };
};
