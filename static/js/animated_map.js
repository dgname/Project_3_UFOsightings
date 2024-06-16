const years = [...Array(2023 - 1947 + 1).keys()].map(i => i + 1947);
let currentYear = 1947;

function showYear(year) {
    // Remove existing markers
    myMap.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
            myMap.removeLayer(layer);
        }
    });

    // Add markers for the given year
    d3.json(`/api/year/${year}`).then(data => {
        data.forEach(sighting => {
            const { lat, lng, shape, city, summary, link } = sighting;
            if (lat !== undefined && lng !== undefined && !isNaN(lat) && !isNaN(lng)) {
                let marker = L.marker([lat, lng], {
                    icon: pinIcon
                }).bindPopup(`<strong>Shape:</strong> ${shape}<br>
                              <strong>Summary:</strong> ${summary}<br>
                              <a href="${link}" target="_blank">More Information</a>`);
                marker.addTo(myMap);
            }
        });
    }).catch(error => {
        console.error('Error fetching or processing data:', error);
    });
}

function animateYears() {
    showYear(currentYear);
    currentYear = (currentYear < 2023) ? currentYear + 1 : 1947;
    setTimeout(animateYears, 3000);
}

// Start the animation
animateYears();
