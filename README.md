
## UFO Sightings in Mexico - README

This project visualizes UFO sightings in Mexico using an interactive map, data charts, and animation. It combines a Flask backend with Leaflet.js for map rendering, D3.js and Plotly.js for data visualization, and Jupyter Notebooks for data preprocessing.

### Features

- **Interactive Map**: View UFO sightings categorized by shape, location, and time period.
- **Animated Map**: Watch the progression of UFO sightings over the years.
- **Data Visualizations**: Dynamic bar and pie charts display sighting data by state and city.
- **API Endpoint**: Access UFO sighting data in JSON format.
- **Dropdown Filters**: Filter sightings by state and update visualizations in real-time.

### Getting Started

1. **Environment Setup**:
   - Ensure you have Python installed along with the following libraries: `Flask`, `SQLAlchemy`, `pandas`, and `d3`.
   - Install `Jupyter Notebook` for data preprocessing.
   - Configure a PostgreSQL database and set the connection string in `config.py`.

2. **Run the Application**:
   - Start the Flask server using `flask run`.
   - Open `http://localhost:5000` in your browser to explore the application.

### Application Structure

- **Backend (Flask)**:
  - `app.py`: Manages routes, serves API data, and renders HTML templates.
  - Connects to a PostgreSQL database to fetch and serve UFO sighting data.

- **Frontend**:
  - **Leaflet.js**: Renders the interactive map with various layers for different UFO shapes.
  - **D3.js**: Loads data and updates dropdown filters and visualizations.
  - **Plotly.js**: Generates bar and pie charts for sighting data visualization.

- **Data Preprocessing (Jupyter Notebooks)**:
  - **`notebooks/`**: Contains Jupyter Notebooks used for data cleaning, merging, and exporting.
  - Data operations include:
    - Merging multiple data sources to compile a comprehensive UFO sightings dataset.
    - Cleaning data by handling missing values and ensuring correct data types.
    - Exporting cleaned data to CSV for further use in the application.

- **Templates and Static Files**:
  - **`templates/`**: HTML templates for the main interface and Spanish version.
  - **`static/`**: Includes JavaScript, CSS, and image assets for the frontend.

### API

- **Endpoint**: `/api`
- **Description**: Provides UFO sighting data in JSON format, including details such as date, city, state, shape, summary, and coordinates.

### Interactive Map

- **Layers**: Multiple layers categorized by UFO shapes.
- **Icons**: Custom icons for different shapes of UFO sightings.
- **Popups**: Clicking on a marker shows detailed information about the sighting.

### Animated Map

- **Dynamic Display**: Shows UFO sightings over different years.
- **Controls**: A control displays the current year during animation.

### Data Visualizations

- **Dropdown Menu**: Select a state to filter data and dynamically update charts.
- **Bar Chart**: Displays the number of sightings per UFO shape in the selected state.
- **Pie Chart**: Shows the distribution of sightings by city within the selected state.

### JavaScript Functions

- **`loadStates()`**: Initializes the dropdown menu with unique states from the data.
- **`buildCharts(state)`**: Filters data by the selected state and updates bar and pie charts.
- **`optionChanged(state)`**: Handles changes in state selection to update visualizations.
- **`buildBarChart(data)`**: Creates a bar chart showing the number of sightings per shape.
- **`buildPieChart(data)`**: Generates a pie chart displaying sighting counts per city.

### Using Jupyter Notebooks for Data Processing

- **Data Collection and Integration**: Multiple datasets were combined to create a unified database of UFO sightings.
- **Data Cleaning**: Handled missing values, standardized formats, and corrected inconsistencies.
- **Data Export**: Cleaned and processed data were exported to CSV files for use in the Flask application.

### How to Use

1. **View the Main Map**:
   - Visit `http://localhost:5000` to see the interactive map.
   - Toggle layers to view different shapes of UFO sightings.

2. **Watch the Animated Map**:
   - Observe the progression of UFO sightings over the years through animation.

3. **Filter Sightings by State**:
   - Use the dropdown menu to select a state and see related charts and map markers.


