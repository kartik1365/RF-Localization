import matplotlib.pyplot as plt
import numpy as np
from math import sqrt

# We first generate the centers which are non collinear to each other and form an equilateral triangle
centers = [[0, 0], [0.5, 1.732/2], [1, 0]]

# Next we choose some arbitrary point and form a circle from each of the center that passes through this point 
point = [[0.5, 1.732/4], [1, 1], [1/2, 0], [0, 2], [0.5, -1*1.732/4]]

# Next we calculate the distances of this point from each of the center 
def get_distance(pt1, pt2):
	return sqrt((pt1[0]-pt2[0])**2 + (pt1[1]-pt2[1])**2)

distances_all = []
for i in range(len(point)):
	distance = []
	for center in centers:
		distance.append(get_distance(center, point[i]))
	distances_all.append(distance)

for i in range(len(point)):
	print(f"The distances of the point {point[i]} from the {centers} are {distances_all[i]}\n")

# Once I have the distances, then I need to find the intersection point of all of the 3 circles 
def point_lies_on_circle(center, r, point):
	epsilon = 1e-3
	if abs(get_distance(point, center) - r) < epsilon:
		return True
	return False

def get_intersection_point(distances, centers, p):
	# I will first find the intersection points of the first 2 circles 
	intersection_points = []

	center_1 = centers[0]
	r_1 = distances[0]
	center_2 = centers[1]
	r_2 = distances[1]

	for theta in np.linspace(0,2*np.pi,10000):
		x = r_1 * np.cos(theta)
		y = r_1 * np.sin(theta)
		if point_lies_on_circle(center_2, r_2, (x,y)):
			intersection_points.append((x,y))

	print(f"The intersection_points are {intersection_points}")

	# Now we need to check if any of the intersection_points lie on the 3rd circle 
	center_3 = centers[2]
	r_3 = distances[2]

	ans = None

	for inter_point in intersection_points:
		if point_lies_on_circle(center_3, r_3, inter_point):
			ans = inter_point

	print(f"The co-ordinates of the object is {ans}")

	# Just plotting the centers and the given point and estimated point for reference
	
	plt.scatter(*zip(*(centers)))
	plt.scatter(p[0],p[1])
	plt.scatter(ans[0],ans[1])

	plt.show()
	return ans

print(distances_all)
# f_ans = []
# for i in range(len(distances_all)):
# 	f_ans.append(get_intersection_point(distances_all[i], centers, point[i]))

# print(f_ans)



