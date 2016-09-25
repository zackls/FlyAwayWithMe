import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

from expedia import getFlightInfo
app = Flask(__name__)

@app.route('/')
def index():
    #orderedOffers = getFlightInfo('ATL')
    return render_template('layout.html', orderedOffers=orderedOffers)

@app.route('/', methods=['POST'])
def my_form_post():
    flightInfo = request.form['ajax']
    console.log(flightInfo);
    orderedOffers = getFlightInfo('ATL')
    return render_template('layout.html', orderedOffers=orderedOffers)

if __name__ == '__main__':
    app.run()
