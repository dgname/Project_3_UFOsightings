// Creating the map object
let myMap = L.map("map", {
    center: [23.634501, -102.552784],
    zoom: 2
});

// Define layers
let lightLayer = L.layerGroup();
let sphereLayer = L.layerGroup();
let circleLayer = L.layerGroup();
let unknownLayer = L.layerGroup();
let cylinderLayer = L.layerGroup();
let cigarLayer = L.layerGroup();
let diskLayer = L.layerGroup();
let triangleLayer = L.layerGroup();
let otherLayer = L.layerGroup();
let fireballLayer = L.layerGroup();
let orbLayer = L.layerGroup();
let chevronLayer = L.layerGroup();
let coneLayer = L.layerGroup();
let ovalLayer = L.layerGroup();
let diamondLayer = L.layerGroup();
let starLayer = L.layerGroup();
let changingLayer = L.layerGroup();
let eggLayer = L.layerGroup();
let crossLayer = L.layerGroup();
let formationLayer = L.layerGroup();
let flashLayer = L.layerGroup();
let rectangleLayer = L.layerGroup();
let teardropLayer = L.layerGroup();

// Custom control for earthquakes and tectonic plates
let overlays = {
    "Light Shape": lightLayer,
    "Sphere Shape": sphereLayer,
    "Circle Shape": circleLayer,
    "Unknown Shape": unknownLayer,
    "Cylinder Shape": cylinderLayer,
    "Cigar Shape": cigarLayer,
    "Disk Shape": diskLayer,
    "Triangle Shape": triangleLayer,
    "Other Shape": otherLayer,
    "Fireball Shape": fireballLayer,
    "Orb Shape": orbLayer,
    "Chevron Shape": chevronLayer,
    "Cone Shape": coneLayer,
    "Oval Shape": ovalLayer,
    "Diamond Shape": diamondLayer,
    "Star Shape": starLayer,
    "Changing Shape": changingLayer,
    "Egg Shape": eggLayer,
    "Cross Shape": crossLayer,
    "Formation Shape": formationLayer,
    "Flash Shape": flashLayer,
    "Rectangle Shape": rectangleLayer,
    "Teardrop Shape": teardropLayer
};

// Define tile layers

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

L.control.layers(overlays).addTo(myMap);

// Fetching our GeoJSON data
d3.json('/RESOURCES/ufo_sightings_with_coordinates.json').then(function(data) {
    L.geoJson(data, {
        // Turn each point into a circle marker using Leaflet's circleMarker() method.
        // pointToLayer allows you to define how each point feature should be represented on the map.
            pointToLayer: function(feature, latlng) {
                // Extract latitude and longitude
                const latitude = latlng.lat;
                const longitude = latlng.lng;
                // Customize marker appearance
                return L.circleMarker([latitude, longitude], {
                    radius: getRadius(feature.properties.mag),
                    fillColor: getColor(feature.geometry.coordinates[2]), // Calling getColor function, defined below
                    color: '#000',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            // Function to attach popups to each marker
            // onEachFeature binds a popup to each marker displaying information such as location, magnitude, depth, and time, shown when clicked.
            onEachFeature: (feature, layer) => {
                layer.bindPopup(`
                    <strong>Location:</strong> ${feature.properties.place}<br>
                    <strong>Magnitude:</strong> ${feature.properties.mag}<br>
                    <strong>Depth:</strong> ${feature.geometry.coordinates[2]}<br>
                    <strong>Time:</strong> ${new Date(feature.properties.time).toLocaleString()}
                `);
            }
        }).addTo(earthquakeLayer);
    });

    function getColor(depth) {
        return depth > 90 ? '#FF0000' :    // Red for depth > 90
               depth > 70 ? '#FF4500' :    // Orange-Red for depth > 70
               depth > 50 ? '#FFA500' :    // Orange for depth > 50
               depth > 30 ? '#FFD700' :    // Gold for depth > 30
               depth > 10 ? '#ADFF2F' :    // Green-Yellow for depth > 10
                            '#00FF00';      // Green for any other depth
    }

// Function to get marker radius based on magnitude
function getRadius(magnitude) {
    return magnitude ? magnitude * 4 : 1;
}

// Create legend control and specify its position
let legend = L.control({ position: 'bottomright' });

// Function to add legend to the map
legend.onAdd = function(map) {
    // Create a div element to act as a container for our legend. This container will hold the visual representation of the legend
    // Using a <div> element allows us to manipulate its appearance and content using HTML and CSS, providing flexibility in how we design and style the legend
    let div = L.DomUtil.create('div', 'legend'); //creates a new <div> element with the class name "legend" and assigns it to the variable div

    // Define legend content directly based on depth conditions
    div.innerHTML =
        '<i style="background:#FF0000"></i> 90+<br>' +
        '<i style="background:#FF4500"></i> 70&ndash;90<br>' +
        '<i style="background:#FFA500"></i> 50&ndash;70<br>' +
        '<i style="background:#FFD700"></i> 30&ndash;50<br>' +
        '<i style="background:#ADFF2F"></i> 10&ndash;30<br>' +
        '<i style="background:#00FF00"></i> 0&ndash;10';

    return div; // Return the div element
};

// Add legend to the map
legend.addTo(myMap);



// URL to fetch the tectonic plates GeoJSON data
let platesLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Fetching the tectonic plates GeoJSON data.
// It is not required to explicitly specify how to fetch the coordinates. 
// Leaflet's L.geoJson() function handles that based on the GeoJSON structure provided in platesData.
d3.json(platesLink).then(function(platesData) {
    // Add tectonic plates layer to the map
    L.geoJson(platesData, {
        style: {
            color: "#FFA500", // Orange color for tectonic plate boundaries
            weight: 2, // Line weight
            opacity: 0.8 // Line opacity
        }
    }).addTo(platesLayer);
});