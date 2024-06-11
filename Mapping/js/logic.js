
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
let defaultLayer = L.layerGroup();

// Define Overlays
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
    "Teardrop Shape": teardropLayer,
    "Defaulf Layer": defaultLayer
};

// Define tile layers
let grayscaleLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
    id: 'mapbox/light-v10', // Grayscale style
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGduYW1lIiwiYSI6ImNseDk3djltdDJvZWYybHBvZm8ycDNjYmgifQ.MVi4dHGFLb5Du360HqicFA' 
});

let outdoorsLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
    id: 'mapbox/outdoors-v11', // Outdoors style
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGduYW1lIiwiYSI6ImNseDk3djltdDJvZWYybHBvZm8ycDNjYmgifQ.MVi4dHGFLb5Du360HqicFA' 
});

let satelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
    id: 'mapbox/satellite-v9', // Satellite style
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGduYW1lIiwiYSI6ImNseDk3djltdDJvZWYybHBvZm8ycDNjYmgifQ.MVi4dHGFLb5Du360HqicFA' 
});

// Adding layers control
let baseLayers = {
    "Grayscale Map": grayscaleLayer,
    "Outdoors Map": outdoorsLayer,
    "Satellite Map": satelliteLayer
};

// Creating the map object
let myMap = L.map("map", {
    center: [23.634501, -102.552784],
    zoom: 6,
    layers: [satelliteLayer] // Setting satellite layer as default
});

L.control.layers(baseLayers,overlays).addTo(myMap);

// Define a larger icon size for markers
const markerSize = 15;

// Fetch GeoJSON data for UFO sightings
d3.json('RESOURCES/ufo_sightings_with_coordinates.json').then(function(data) {
    data.forEach(function(sighting) {
        const { Lat, Lng, Shape, Summary, Link } = sighting;
        // console.log("Avistamiento:", sighting);

        // Create a circle marker with a larger size
        const marker = L.circleMarker([Lat, Lng], {
            radius: markerSize,
            fillColor: "red",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8

        }).bindPopup(`
            <strong>Shape:</strong> ${Shape}<br>
            <strong>Summary:</strong> ${Summary}<br>
            <a href="${Link}" target="_blank">More Information</a>
        `);

        // Add the marker to the appropriate layer based on UFO shape
        if (Shape+' Shape' in overlays) {
            overlays[Shape + ' Shape'].addLayer(marker);
            overlays['Defaulf Layer'].addLayer(marker);
        } else {
            defaultLayer.addLayer(marker);
            console.log('no entra')
        }
    });
}).catch(function(error) {
    console.error('Error fetching or processing GeoJSON data:', error);
});

// console.log(lightLayer)

// Function to get marker radius based on magnitude
// function getRadius(magnitude) {
//     return magnitude ? magnitude * 4 : 1;
// }

// Create legend control and specify its position
// let legend = L.control({ position: 'bottomright' });

// // Function to add legend to the map
// legend.onAdd = function(map) {
//     // Create a div element to act as a container for our legend. This container will hold the visual representation of the legend
//     // Using a <div> element allows us to manipulate its appearance and content using HTML and CSS, providing flexibility in how we design and style the legend
//     let div = L.DomUtil.create('div', 'legend'); //creates a new <div> element with the class name "legend" and assigns it to the variable div

//     // Define legend content directly based on depth conditions
//     div.innerHTML =
//         '<i style="background:#FF0000"></i> 90+<br>' +
//         '<i style="background:#FF4500"></i> 70&ndash;90<br>' +
//         '<i style="background:#FFA500"></i> 50&ndash;70<br>' +
//         '<i style="background:#FFD700"></i> 30&ndash;50<br>' +
//         '<i style="background:#ADFF2F"></i> 10&ndash;30<br>' +
//         '<i style="background:#00FF00"></i> 0&ndash;10';

//     return div; // Return the div element
// };

// // Add legend to the map
// legend.addTo(myMap);



// // URL to fetch the tectonic plates GeoJSON data
// let platesLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// // Fetching the tectonic plates GeoJSON data.
// // It is not required to explicitly specify how to fetch the coordinates. 
// // Leaflet's L.geoJson() function handles that based on the GeoJSON structure provided in platesData.
// d3.json(platesLink).then(function(platesData) {
//     // Add tectonic plates layer to the map
//     L.geoJson(platesData, {
//         style: {
//             color: "#FFA500", // Orange color for tectonic plate boundaries
//             weight: 2, // Line weight
//             opacity: 0.8 // Line opacity
//         }
//     }).addTo(platesLayer);
// });