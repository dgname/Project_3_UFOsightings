// Set the States on the dropdown menu

function loadStates() {

    const dropdown = d3.select("#selState");

    d3.json('/api').then((data) => {
        // Find the unique values of the states
        const states = Array.from(new Set(data.map(sighting => sighting.state_x)));

        // Order the states alphabetically
        states.sort();

        // Add an option on the dropdown menu per state
        states.forEach(state => {
            dropdown.append("option").text(state).attr("value", state);
        });

        // Set the first visualization for the default state 
        buildCharts(states[0]);
    });
}

// Bar chart visualization
function buildBarChart(data) {
    // count the times a shape was seen
    const shapeCounts = {};
    data.forEach(sighting => {
        const key = sighting.shape;
        shapeCounts[key] = (shapeCounts[key] || 0) + 1;
    });

    const barData = [{
        x: Object.keys(shapeCounts),
        y: Object.values(shapeCounts),
        type: 'bar'
    }];

    // Set the name of the axis and table
    const barLayout = {
        title: 'Number of Sightings per Shape',
        xaxis: { title: 'Shape' },
        yaxis: { title: 'Quantity of Sightings' }
    };

    // Plot
    Plotly.newPlot('bar', barData, barLayout);
}

// Function for Piechart
function buildPieChart(data) {
    // Count the sightings per state per city
    const cityCounts = {};
    data.forEach(sighting => {
        const key = `${sighting.city}`;
        cityCounts[key] = (cityCounts[key] || 0) + 1;
    });

    const pieData = [{
        values: Object.values(cityCounts),
        labels: Object.keys(cityCounts),
        type: 'pie'
    }];

    // Set the title of the chart
    const pieLayout = {
        title: 'Sightings per city'
    };

    // Plot the chart
    Plotly.newPlot('pie', pieData, pieLayout);
}

// Function to set the visualization depending on the state selected
function buildCharts(state) {
    d3.json('/api').then((data) => {
        // Filter the sightings per selected state
        const filteredData = data.filter(sighting => sighting.state_x === state);

        // Plot chart
        buildBarChart(filteredData);
        buildPieChart(filteredData);
    });
}

// function to manage the change of state
function optionChanged(state) {
    // plot the charts depending on the selected state
    buildCharts(state);
}

//initialize dashboard
loadStates();