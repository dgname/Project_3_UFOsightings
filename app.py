from flask import Flask,render_template
from config import CONNSTRING

from sqlalchemy import create_engine
import pandas as pd

engine=create_engine(CONNSTRING)

app = Flask(__name__,static_folder='static',template_folder='templates')

@app.route("/")
def take_me_to_map():
    return render_template('index.html')

@app.route('/graphs')
def take_me_to_graphs():
    return render_template('page2.html')

@app.route('/api')
def api():

    with engine.connect() as conn:

        findf=pd.read_sql('Select * From sightings_with_coordinates',con=conn)
        dfgroup=findf[['occurred','city','state_x','country','shape','summary','link','lat','lng']]
        dfgroup.reset_index(inplace=True)

    return dfgroup.to_json(orient='records')