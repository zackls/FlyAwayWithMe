import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
# create our little application :)
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('layout.html')

if __name__ == '__main__':
        app.run()