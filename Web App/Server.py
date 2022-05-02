from helper import *
from flask import Flask, request, render_template, redirect, url_for, jsonify

app = Flask(__name__)

@app.route("/")  
def home():
    return render_template("home.html")
    
@app.route("/queryNode", methods = ["GET", "POST"])
def queryNode():
    global items, counter, rssi_anchor1, rssi_anchor2, rssi_anchor3, dis_anchor1, dis_anchor2, dis_anchor3
    content = request.get_json()

    updateArr(content["rssi_val"],content["anchor_num"])
    print("NODE = ", content["anchor_num"])
    print("RSSI = ", content["rssi_val"])
    print("\n\n")
    if min(len(dis_anchor1), len(dis_anchor2), len(dis_anchor3)) - 1 >= counter:
        new_item = dict(sno = counter, 
                        rssi1 = rssi_anchor1[counter], 
                        rssi2 = rssi_anchor2[counter], 
                        rssi3 = rssi_anchor3[counter], 
                        dis1 = dis_anchor1[counter],
                        dis2 = dis_anchor2[counter],
                        dis3 = dis_anchor3[counter])
        items.append(new_item)
        counter += 1

    return 'JSON posted'

@app.route("/Localize", methods = ["GET", "POST"])
def Localize():

    # if request.form:
    #     algo = request.form["algo"]
    # else:
    #     algo = "trilateration"
    return render_template("localize.html")

@app.route("/RSSI")
def RSSI():
    global items
    return render_template("rssi.html", items = items)

@app.route("/getData", methods = ["GET"])
def getData():
    
    global pos_anchor1, pos_anchor2, pos_anchor3, dis_anchor1, dis_anchor2, dis_anchor3
    
    is_possibe = True
    if len(dis_anchor1) < 1 or len(dis_anchor2) < 1 or len(dis_anchor3) < 1:
        is_possible = False
  
    ptr = min(len(dis_anchor1), len(dis_anchor2), len(dis_anchor3)) - 1

    dis1 = dis_anchor1[ptr]
    dis2 = dis_anchor2[ptr]
    dis3 = dis_anchor3[ptr]
    
    data = {'check': is_possibe,
    'x1' : pos_anchor1[0], 
    'y1' : pos_anchor1[1], 
    'x2' : pos_anchor2[0], 
    'y2' : pos_anchor2[1], 
    'x3' : pos_anchor3[0], 
    'y3' : pos_anchor3[1],
    'd1' : dis1, 
    'd2' : dis2, 
    'd3' : dis3}
    
    return jsonify(data)   

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")