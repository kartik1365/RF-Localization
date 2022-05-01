import numpy as np

a = -12.08
b = 5.01

pos_anchor1 = [1, 1]
pos_anchor2 = [1, 1]
pos_anchor3 = [1, 1]

rssi_anchor1 = []
rssi_anchor2 = []
rssi_anchor3 = []
dis_anchor1 = []
dis_anchor2 = []
dis_anchor3 = []
counter = 0
items = []

def distance_to_rssi(x):
    est_dis = np.e**((x-b)/a)
    return est_dis

def updateArr(rssi_received, anchor_num):
    
    dist_received = distance_to_rssi(rssi_received)

    if anchor_num == 1:
        rssi_anchor1.append(rssi_received)
        dis_anchor1.append(dist_received)
    elif anchor_num == 2:
        rssi_anchor2.append(rssi_received)
        dis_anchor2.append(dist_received)
    elif anchor_num == 3:
        rssi_anchor3.append(rssi_received)
        dis_anchor3.append(dist_received) 
    
    return