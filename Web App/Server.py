from helper import *
from flask import Flask, request, render_template, redirect, url_for, jsonify

app = Flask(__name__)

@app.route("/")  
def home():
    return render_template("home.html")
    
@app.route("/queryNode", methods = ["GET", "POST"])
def query():
    content = request.get_json()

    rssi_received = content["rssi_val"]
    anchor_num = content["anchor_num"]
    updateArr(rssi_received, anchor_num)
    
    return 'JSON posted'

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
        return render_template("rssi.html")

@app.route("/getData", methods = ["GET"])
def getData():
    
    is_possibe = True
    # if len(rssi_anchor1) < 6 or len(rssi_anchor2) < 6 or len(rssi_anchor3) < 6:
    #     is_possible = False
    if len(rssi_anchor1) < 6:
        is_possible = False
    # ptr = min(len(dis_anchor1), len(dis_anchor2), len(dis_anchor3)) - 1
    ptr = len(dis_anchor1)
    dis1 = dis_anchor1[ptr - 4 : ptr + 1]
    # dis2 = dis_anchor2[ptr - 4 : ptr + 1]
    # dis3 = dis_anchor3[ptr - 4 : ptr + 1]
    
    data = {'check': is_possibe,
    'x1' : pos_anchor1[0], 
    'y1' : pos_anchor1[1], 
    'x2' : pos_anchor2[0], 
    'y2' : pos_anchor2[1], 
    'x3' : pos_anchor3[0], 
    'y3' : pos_anchor3[1],
    'd1' : dis1, 
    'd2' : 1, 
    'd3' : 1}
    
    return jsonify(data)   

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")