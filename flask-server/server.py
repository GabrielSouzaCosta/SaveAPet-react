from distutils.log import debug
from flask import Flask, render_template

app = Flask(__name__)

animalsImages = {"cats": [], "dogs": []}


@app.route('/')
def index():
    pass


if __name__ == "__main__":
    app.run(debug=False)