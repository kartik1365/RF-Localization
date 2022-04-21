import matplotlib.pyplot as plt
import numpy as np
from typing import List

class Inverse_sq_reg():

	def __init__(self):
		self.a = 1
		self.b = 1
		self.n = 0 # Number of training Samples

	def get_errors(self):
		"""
		Creates the error vector
		"""
		self.y_hat = self.a / self.x**2 + self.b
		self.errors = self.y - self.y_hat

	def loss(self):
		"""
		From the error vector, calculates the loss function's value, in this case we chose Loss to be Mean Square Error(MSE)
		"""
		return (self.errors ** 2).sum() / self.n

	def gradient_a(self):
		"""
		Calculates the gradient of a and returns it
		"""
		temp1 = (self.errors / (self.x ** 2)).sum()
		return -2 * temp1 / self.n

	def gradient_b(self):
		"""
		Calculates the gradient of b and returns it
		"""
		return -2 * self.errors.sum() / self.n

	def train(self, x: np.array, y: np.array, n_iter: int = 1000, threshold = None) -> None:
		"""
		Updates the gradients till the error minimises or till the number of iterations are finished
		"""
		assert(len(x) == len(y))
		self.x = x
		self.y = y
		self.n = len(x)
		self.loss_values = []
		self.gamma = 1e-2

		for i in range(n_iter):
			self.get_errors()
			current_loss = self.loss()
			self.loss_values.append(current_loss)
			if threshold and current_loss < threshold:
				break
			grad_a = self.gradient_a()
			grad_b = self.gradient_b()
			self.a -= self.gamma * grad_a
			self.b -= self.gamma * grad_b
			print(f"Iteration {i}: {current_loss}")

		print(f"a: {self.a} and b: {self.b}")
		fig, ax = plt.subplots()
		ax.plot(list(range(n_iter)), self.loss_values)
		ax.grid()
		ax.set_title("Loss vs iterations")

	def predict(self, x: np.array) -> None:

		return (self.a / x ** 2) + self.b

def main():
	# Generate n = 100 training points (x, y). y = a/x**2 + b, where a = 2 and b = 1, add some noise to it
	n = 100
	start = 0.5
	end = 1
	x = np.linspace(start, end, n)
	a = 2
	b = 1
	y = a / x**2 + b
	y_t = y + np.random.normal(0, 0.5, n)
	# Train the data 
	model = Inverse_sq_reg()
	model.train(x, y_t)
	y_hat = model.predict(x)
	for i in range(n):
		print(f" Actual : {y[i]} Predicted : {y_hat[i]}")
	# Plot the final and initial plot
	fig, ax = plt.subplots()
	ax.plot(x, y, label = "Clean")
	ax.plot(x, y_t, label = "Noisy")
	ax.plot(x, y_hat, label = "Predicted")
	ax.grid()
	ax.legend()
	plt.show()

if __name__ == "__main__":
	main()
