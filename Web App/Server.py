from flask import Flask, request, render_template, redirect, url_for


anchor1 = anchor2 = anchor3 = []
counter1 = counter2 = counter3 = 0

def updateArr(rssi_received, anchor_num, cnt):
    
    # dist_received = distance_to_rssi(rssi_received)
    dist_received = 1   
    if anchor_num == 1:
        anchor1.append(dist_received)
    if anchor_num == 2:
        anchor2.append(dist_received)
    if anchor_num == 3:
        anchor3.append(dist_received) 
    
def getPosition():
    
    if len(anchor1) < counter1 or len(anchor2) < counter2 or len(anchor3) < counter3:
        return
    
    dis1 = anchor1[counter1]
    dis2 = anchor2[counter2]
    dis3 = anchor3[counter3]
    counter1 += 1
    counter2 += 1
    counter3 += 1


app = Flask(__name__)

@app.route("/", methods = ["GET", "POST"])  
def home():

    if "localize" in request.form:
        return redirect(url_for("Localize"))
    return render_template("home.html")
    
@app.route("/query")
def query():
    rssi_received = request.args.get('RSSI')
    anchor_num = request.args.get('Anchor')
    cnt = request.args.get('Counter')

    updateArr(rssi_received, anchor_num, cnt)
    getPosition()

    return '''<h1>RSSI measured from </h1>'''

@app.route("/Localize")
def Localize():
    return "Workin on it"

if __name__ == "__main__":
    app.run(debug=True)