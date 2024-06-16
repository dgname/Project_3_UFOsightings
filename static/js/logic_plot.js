// Define the global data variable
let data = [];

// Function to populate the dropdown menu with states
function populateDropdown(states) {
    let dropdown = d3.select("#selState");
    dropdown.html(""); // Clear existing options

    states.forEach(state => {
        dropdown.append("option").text(state).property("value", state);
    });

    // Debugging: Log the states to ensure they are populated
    console.log("States populated in dropdown:", states);
}

// Function to update the charts based on the selected state
function updateCharts(state) {
    // Filter data based on the selected state
    let stateData = data.filter(sighting => sighting.State_x === state);

    // Debugging: Log the stateData to ensure it is filtered correctly
    console.log(`Data for state ${state}:`, stateData);

    // Update the pie chart
    let shapeCounts = Array.from(d3.group(stateData, d => d.Shape), ([key, value]) => ({ key, value: value.length }));

    let pieData = [{
        values: shapeCounts.map(d => d.value),
        labels: shapeCounts.map(d => d.key),
        type: 'pie'
    }];

    Plotly.newPlot('pie', pieData);

    // Update the bar chart
    let cityCounts = Array.from(d3.group(stateData, d => d.City), ([key, value]) => ({ key, value: value.length }));

    let barData = [{
        x: cityCounts.map(d => d.key),
        y: cityCounts.map(d => d.value),
        type: 'bar'
    }];

    Plotly.newPlot('bar', barData);
}

// Load the data and initialize the charts and dropdown menu
d3.json('/RESOURCES/ufo_sightings_with_coordinates.json').then(function(loadedData) {
    data = loadedData; // Assign the loaded data to the global variable

    // Debugging: Log the loaded data
    console.log("Loaded data:", data);
    console.log("Data structure:", JSON.stringify(data, null, 2));

    // Get the unique states
    let states = [...new Set(data.map(sighting => sighting.State_x))].sort();

    // Debugging: Log the unique states
    console.log("Unique states:", states);

    // Populate the dropdown menu with states
    populateDropdown(states);

    // Initialize the charts with the first state
    if (states.length > 0) {
        updateCharts(states[0]);
    }

    // Update the charts when a new state is selected
    window.optionChanged = function(state) {
        updateCharts(state);
    };
}).catch(function(error) {
    console.error('Error loading data:', error);
});
