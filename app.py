from flask import Flask, render_template, send_from_directory, abort, jsonify
from config import CONNSTRING
from sqlalchemy import create_engine
import pandas as pd
import os

engine = create_engine(CONNSTRING)

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route("/")
def take_me_to_map():
    return render_template('index.html')

@app.route('/RESOURCES/<path:filename>')
def serve_resource(filename):
    try:
        # Print the absolute path being requested
        file_path = os.path.join(os.getcwd(), 'RESOURCES', filename)
        print(f"Requesting file: {file_path}")
        return send_from_directory('RESOURCES', filename)
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        abort(404)

@app.route('/api')
def api():
    try:
        df = pd.read_json('RESOURCES/ufo_sightings_with_dates.json')
        df_group = df[['date', 'city', 'state', 'shape', 'summary', 'url', 'latitude', 'longitude']]
        df_group.rename(columns={'date': 'Occurred', 'latitude': 'Lat', 'longitude': 'Lng', 'shape': 'Shape', 'summary': 'Summary', 'url': 'Link'}, inplace=True)
        df_group.reset_index(inplace=True, drop=True)
        return df_group.to_json(orient='records')
    except Exception as e:
        print(f"Error reading JSON: {e}")
        abort(500)

# Debug route to check directory contents
@app.route('/debug')
def debug():
    resources_path = os.path.join(os.getcwd(), 'RESOURCES')
    # Print the current working directory and the RESOURCES path
    print(f"Current working directory: {os.getcwd()}")
    print(f"RESOURCES path: {resources_path}")
    if os.path.exists(resources_path):
        print(f"Contents of RESOURCES: {os.listdir(resources_path)}")
        return jsonify(contents=os.listdir(resources_path))
    else:
        print("RESOURCES directory not found")
        return "RESOURCES directory not found", 404

if __name__ == "__main__":
    app.run(debug=True)
