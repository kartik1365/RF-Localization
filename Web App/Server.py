from crypt import methods
import helper
from flask import Flask, request, render_template, redirect, url_for, jsonify


a = b = c = d = 0
app = Flask(__name__)

@app.route("/")  
def home():
    return render_template("home.html")
    
# @app.route("/query", , methods = ["GET", "POST"])
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
    global a, b, c, d
    a+=1
    b+=2
    c+=3
    d+=4
    return "Workin on it"

@app.route("/getData", methods = ["GET"])
def getData():
    
    is_possibe = True
    if len(rssi_anchor1) - 1 < counter or len(rssi_anchor2) - 1 < counter or len(rssi_anchor3) - 1 < counter:
        is_possible = False

    dis1 = dis_anchor1[counter]
    dis2 = dis_anchor2[counter]
    dis3 = dis_anchor3[counter]
    counter += 1

    
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
    app.run(debug=True)