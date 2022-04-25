import matplotlib.pyplot as plt
import numpy as np
from typing import List
import math
# Plot a square given the center and the side length / 2

class Rectangle:
	def __init__(self, left_bot, right_top):
		self.xmin, self.ymin = left_bot
		self.xmax, self.ymax = right_top
	
	def print_coords(self):
		print(f"Left bottom is {self.xmin, self.ymin}")
		print(f"Right top is {self.xmax, self.ymax}")

def make_rect(r: Rectangle) -> tuple[List[float], List[float]]:
	"""
	Returns the (x, y) co-ordinates of the square
	"""
	x_min, y_min = r.xmin, r.ymin
	x_max, y_max = r.xmax, r.ymax
	num_pts = 1000

	x_points = []
	y_points = []

	# Bottom Line 
	x_points = x_points + list(np.linspace(x_min, x_max, num_pts))
	y_points = y_points + list(np.linspace(y_min, y_min, num_pts))

	# Right Line 
	x_points = x_points + list(np.linspace(x_max, x_max, num_pts))
	y_points = y_points + list(np.linspace(y_min, y_max, num_pts))

	# Top line
	x_points = x_points + list(np.linspace(x_max, x_min, num_pts))
	y_points = y_points + list(np.linspace(y_max, y_max, num_pts))

	# Left Line
	x_points = x_points + list(np.linspace(x_min, x_min, num_pts))
	y_points = y_points + list(np.linspace(y_max, y_min, num_pts))

	return (x_points, y_points)

def euclidean_dist(pos1: tuple[float, float], pos2: tuple[float,float]) -> float:
	"""
	Returns the Euclidean Distance between position1 and position2
	(x1 - x2)**2 + (y1 - y2)**2
	"""
	x1, y1 = pos1
	x2, y2 = pos2
	return  math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

def get_distances(centers: List[tuple[float, float]]) -> List[float]:

	random_pt = (0.5, 0.5)
	distances = []
	for center in centers:
		distances.append(euclidean_dist(center, random_pt))
	return random_pt, distances

def get_intersection(r1: Rectangle, r2: Rectangle) -> Rectangle:
	"""
	Gets the Intersection Rectangle's left bottom and right top co - ordinates
	"""
	x1, y1 = max(r1.xmin, r2.xmin), max(r1.ymin, r2.ymin)
	x2, y2 = min(r1.xmax, r2.xmax), min(r1.ymax, r2.ymax)

	assert(x1 <= x2)
	assert(y1 <= y2)

	return Rectangle((x1, y1), (x2, y2))

def plot_rect(r: Rectangle) -> None:
	co_ords = make_rect(r)
	plt.scatter(co_ords[0], co_ords[1], s = 3)

if __name__ == "__main__":
	centers = [(0, 0), (1, 0), (0.5, 1)]
	rectangles = []
	random_pt, distances = get_distances(centers)

	for center, distance in zip(centers, distances):
		x_min, x_max = center[0] - distance, center[0] + distance
		y_min, y_max = center[1] - distance, center[1] + distance
		r = Rectangle((x_min, y_min), (x_max, y_max))
		rectangles.append(r)
		plot_rect(r)

	r1 = get_intersection(rectangles[0], rectangles[1])
	r_final = get_intersection(rectangles[2], r1)
	plot_rect(r_final)
	plt.scatter(random_pt[0], random_pt[1], s = 12)
	plt.show()
