import helper
from flask import Flask, request, render_template, redirect, url_for, jsonify

app = Flask(__name__)

@app.route("/")  
def home():
    return render_template("home.html")
    
# @app.route("/query")
# def query():
#     rssi_received = request.args.get('RSSI')
#     anchor_num = request.args.get('Anchor')
#     cnt = request.args.get('Counter')

#     updateArr(rssi_received, anchor_num, cnt)
#     getPosition()

#     return '''<h1>RSSI measured from </h1>'''

@app.route("/Localize", methods = ["GET", "POST"])
def Localize():
    
    if request.form:
        algo = request.form["algo"]
    else:
        algo = "trilateration"
    print(algo)
    return render_template("localize.html", algo = algo)

@app.route("/RSSI")
def RSSI():
    return "Workin on it"

@app.route("/getData")
def getData():
    return jsonify(1)

if __name__ == "__main__":
    app.run(debug=True)