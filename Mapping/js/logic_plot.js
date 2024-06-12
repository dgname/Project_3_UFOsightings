// function to build both charts
function buildCharts(sample) {
    d3.json('RESOURCES/ufo_sightings_with_coordinates.json').then((data) => {
  
      // Get the samples field
      var samples = data.samples;
  
  
      // Filter the samples for the object with the desired sample number
      var filteredSample = samples.filter(obj => obj.id === sample)[0];
  
  
      // Get the otu_ids, otu_labels, and sample_values
      var otuIds = filteredSample.otu_ids;
      var otuLabels = filteredSample.otu_labels;
      var sampleValues = filteredSample.sample_values;
  
  
      // Build a Bubble Chart
      var trace1 = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
          color: otuIds,
          size: sampleValues
        }
      };
  
      var dataBubble = [trace1];
  
      var layoutBubble = {
        title: 'Bacteria Cultures Per Sample',
        xaxis: { title: 'OTU ID' },
        yaxis: {title:'Number of Bacteria'},
        showlegend: false
      };
  
      // Render the Bubble Chart
   
  
      Plotly.newPlot('bubble', dataBubble, layoutBubble);
  
  
      // For the Bar Chart, map the otu_ids to a list of strings for your yticks
      var yticks = otuIds.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
  
  
      // Build a Bar Chart
      // Don't forget to slice and reverse the input data appropriately
      var trace2 = {
        x: sampleValues.slice(0, 10).reverse(),
        y: yticks,
        text: otuLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      };
  
      var dataBar = [trace2];
  
      var layoutBar = {
        title: 'Top 10 Bacteria Cultures Found',
        xaxis: { title: 'Sample Values' },
        yaxis: { tickmode: "array", tickvals: yticks, ticktext: yticks }
      };
  
  
      // Render the Bar Chart
      Plotly.newPlot('bar', dataBar, layoutBar);
  
    });
  }