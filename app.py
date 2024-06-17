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

# @app.route('/RESOURCES/<path:filename>')
# def serve_resource(filename):
#     try:
#         # Print the absolute path being requested
#         file_path = os.path.join(os.getcwd(), 'RESOURCES', filename)
#         print(f"Requesting file: {file_path}")
#         return send_from_directory('RESOURCES', filename)
#     except FileNotFoundError:
#         print(f"File not found: {file_path}")
#         abort(404)

@app.route('/api')
def api():
        with engine.connect() as conn:

            finddf=pd.read_sql('Select * From sightings_with_coordinates',con=conn)
            dfgroup=finddf[['occurred','city','state_x','country','shape','summary','link','lat','lng']]
            dfgroup.reset_index(inplace=True)

        return dfgroup.to_json(orient='records')

# # Debug route to check directory contents
# @app.route('/debug')
# def debug():
#     resources_path = os.path.join(os.getcwd(), 'RESOURCES')
#     # Print the current working directory and the RESOURCES path
#     print(f"Current working directory: {os.getcwd()}")
#     print(f"RESOURCES path: {resources_path}")
#     if os.path.exists(resources_path):
#         print(f"Contents of RESOURCES: {os.listdir(resources_path)}")
#         return jsonify(contents=os.listdir(resources_path))
#     else:
#         print("RESOURCES directory not found")
#         return "RESOURCES directory not found", 404

# if __name__ == "__main__":
#     app.run(debug=True)
