const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

var samples;
var metadatas;
d3.json(url).then(function (data) {
  let selector = d3.select("#selDataset");
  metadatas = data.metadata;
  samples = data.samples;
  data.names.forEach((id) => {
    selector.append("option").text(id).property("value", id);
  });
  metaData(metadatas[0]);
  hbarChart(samples[0]);
  bubbleChart(samples[0]);
  gaugeChart(metadatas[0]);
});

function optionChanged(value) {
  const selectedId = samples.find((item) => item.id === value);
  const demographicInfo = metadatas.find((item) => item.id == value);

  // Insterting Demographic Data
  metaData(demographicInfo);

  // Bar Chart
  hbarChart(selectedId);

  // Bubble Chart
  bubbleChart(selectedId);

  // Gauge Chart
  gaugeChart(demographicInfo);
}

function metaData(demographicInfo) {
  let demoSelect = d3.select("#sample-metadata");

  demoSelect.html(
    `id: ${demographicInfo.id} <br> 
      ethnicity: ${demographicInfo.ethnicity} <br>
    gender: ${demographicInfo.gender} <br>
    age: ${demographicInfo.age} <br>
    location: ${demographicInfo.location} <br>
    bbtype: ${demographicInfo.bbtype} <br>
    wfreq: ${demographicInfo.wfreq}`
  );
}

function hbarChart(selectedId) {
  let x_axis = selectedId.sample_values.slice(0, 10).reverse();
  let y_axis = selectedId.otu_ids
    .slice(0, 10)
    .reverse()
    .map((item) => `OTU ${item}`);
  let text = selectedId.otu_labels.slice(0, 10).reverse();

  barChart = {
    x: x_axis,
    y: y_axis,
    text: text,
    type: "bar",
    orientation: "h",
  };

  let chart = [barChart];

  let layout = {
    margin: {
      l: 100,
      r: 100,
      t: 0,
      b: 100,
    },
    height: 500,
    width: 600,
  };

  Plotly.newPlot("bar", chart, layout);
}

function bubbleChart(selectedId) {
  let x_axis = selectedId.otu_ids;
  let y_axis = selectedId.sample_values;
  let marker_size = selectedId.sample_values;
  let color = selectedId.otu_ids;
  let text = selectedId.otu_labels;

  bubble = {
    x: x_axis,
    y: y_axis,
    text: text,
    mode: "markers",
    marker: {
      color: color,
      colorscale: "Earth",
      size: marker_size,
    },
    type: "scatter",
  };
  let chart = [bubble];

  let layout = {
    xaxis: {
      title: { text: "OTU ID" },
    },
  };
  Plotly.newPlot("bubble", chart, layout);
}
