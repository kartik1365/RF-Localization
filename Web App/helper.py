import numpy as np

a = -12.08
b = 5.01

pos_anchor1 = [0, 0]
pos_anchor2 = [0.5, 0.866]
pos_anchor3 = [1, 0]

rssi_anchor1 = [-10, -10, -10]
rssi_anchor2 = [-10, -10, -10]
rssi_anchor3 = [-10, -10, -10]
dis_anchor1 = [0.6614295124954737, 0.6614295124954737, 0.6614295124954737, 0.6614295124954737]
dis_anchor2 = [0.433, 0.433, 0.433, 0.433]
dis_anchor3 = [0.6614295124954737, 0.6614295124954737, 0.6614295124954737, 0.6614295124954737]
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