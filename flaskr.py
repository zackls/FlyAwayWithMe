import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

from expedia import getFlightInfo

# create our little application :)
app = Flask(__name__)

@app.route('/')
def index():
    flightInfo = getFlightInfo
    return render_template('layout.html',flightInfo=flightInfo)

if __name__ == '__main__':
        app.run()
