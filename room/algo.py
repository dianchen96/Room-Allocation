from itertools import izip
from operator import add, sub, mul

def get_owner(elements):
	'''
	Get the owner index by counting odd elements
	'''
	return sum(map(lambda x: x % 2 != 0, elements))


class Point(object):
	'''
	The object that represents a point in triangulized simplex
	@coordinates: the value of each axis
	@label: the "owner" of this point
	@level: the dimension of the point for explanation, check https://www.math.hmc.edu/~su/papers.dir/rent.pdf
	'''
	def __init__(self, coordinates=[], label=None, level=None):
		self.coordinates = coordinates[:]
		self.label = label;
		self.level = level


	def __getitem__(self, key):
		return self.coordinates[key]

	def __setitem__(self, key, item):
		self.coordinates[key] = item

	def __add__(self, other):
		new_coordinates = map(add, izip(self.coordinates, other.coordinates))
		return Point(coordinates=new_coordinates)

	def __sub__(self, other):
		new_coordinates = map(sub, izip(self.coordinates, other.coordinates))
		return Point(coordinates=new_coordinates)

	def __mul__(self, scalar):
		new_coordinates = map(lambda x: x*scalar, self.coordinates)
		return Point(coordinates=new_coordinates)

	def __div__(self, scalar):
		new_coordinates = map(lambda x: x/scalar, self.coordinates)
		return Point(coordinates=new_coordinates)

	def dot(self, other):
		new_coordinates = map(mul, izip(self.coordinates, other.coordinates))
		return Point(coordinates=new_coordinates)

	def transform(self):
		'''
		Return a proposed scheme of rent based on point's coordination
		'''
		prices = self.coordinates[:]
		dimension = len(prices)
		divisor = 2 ** self.level
		prices.append(divisor)
		prices = map(lambda p: p / divisor, prices)

		i = dimension
		while i > 0:
			prices[i] = dimension * (prices[i-1]-prices[i]) + 1
			i -= 1
		prices[0] = 1 - dimension * prices[0]
		return prices

class Simplex(object):
	'''
	The object that represents a simplex.

	@dimension: simplex's dimension
	@players: the number of players
	@level: the dimension of the frontier simplex. check https://www.math.hmc.edu/~su/papers.dir/rent.pdf for more explanation
	@marker: the index of the last coordinate tha stands for dimension
	@newPoint: the index of the new unlabeld point
	'''
	def __init__(self, n):
		self.dimension = n+1
		self.players = n
		self.level = 0
		'''Set up initial points'''
		self.points = []
		for i in xrange(self.dimension):
			self.points.append(Point(
					coordinates = [0 for _ in xrange(n)],
					label = i+1
				))
		for col in xrange(n):
			self.points[col][col] = 1
		self.points[self.players] = Point(
			coordinates = map(sum, izip(self.points[0]), self.points[self.players-1]),  
			level=1
		)

		self.marker = self.dimension-2
		self.newPoint = self.dimension-1


	def shift(self, start, end, where):
		'''
		Shift point in-place
		'''
		if where > 0:   		# Shift right
			i = end
			while i >= start:
				self.points[i+where] = self.points[i]
				i -= 1					
		else:					# Shift left
			i = start
			while i <= end:
				self.points[i+where] = self.points[i]

	def get_current_player(self):
		'''
		Get the current player 
		'''
		return get_owner(self.points[self.newPoint])

	def get_current_prices(self):
		point = self.points[self.newPoint]
		return point.transform()


	def current_player_choose(self, label):
		'''
		Label the vertex with the label the current player has chosen.
		@label: an INTEGER that represents the label
		'''
		self.points[self.newPoint].label = label
		'''
		Update the newly labeled simplex
		'''
		pivot = self.findPivot()
		return self.update(pivot)

	def findPivot(self):
		'''
		Find a pivot point of the simplex
		'''
		target = -1
		for i in xrange(self.dimension):
			if self.points[i].label == self.points[self.newPoint].label and i != self.newPoint:
				target = i
		return target

	def update(self, pivot):
		'''
		Return whether the simplex has gone up one level, a.k.a, 
		We found a fully labeled simpelx and able to suggest a division
		'''
		prev_level = self.level
		dimension = self.dimension

		if pivot == 0 and self.marker == 0:
			self.shift(1, dimension-1, -1)	# Left shift 
			self.newPoint = dimension-1
			self.marker = dimension-2
			self.points[newPoint] = self.points[0] + self.points[self.marker]
			self.level += 1
			self.points[self.newPoint].level = self.level+1
		elif pivot == self.marker or (self.marker != 0 and pivot == 0):
			self.shift(pivot+1, dimension-1, -1)
			self.newPoint = dimension-1
			self.marker -= 1
			self.points[self.newPoint] = self.points[0] + self.points[self.marker]
			self.points[self.newPoint].level = self.points[dimension-2].level
		elif pivot != 0 and pivot != self.marker and pivot != self.marker+1 and pivot != dimension-1:
			self.points[pivot] = self.points[pivot-1] + self.points[pivot+1] - self.points[pivot]
			self.points[pivot].level = self.points[pivot-1].level
			self.newPoint = pivot
		elif pivot == self.marker+1 and pivot != dimension-1:
			tmp = self.points[pivot+1] * 2
			self.points[pivot] = tmp - self.points[pivot]
			self.points[pivot].level = self.level + 1
			self.newPoint = pivot
		elif pivot == self.marker+1 and pivot == dimension-1:
			self.shift(0, pivot-1, 1)
			self.marker = 0
			self.points[0] = self.points[dimension-1] / 2
			self.level -= 1
			self.points[0].level = self.level
			self.newPoint = 0
		elif pivot == dimension-1 and self.marker < dimension-2:
			tmp = self.points[pivot] - self.points[pivot-1]
			check = sum(tmp.dot(self.points[0]).coordinates)
			if check % 2 == 0:
				self.shift(0, dimension-2, 1)
				self.marker += 1
				self.points[0] = self.points[dimension-1] - self.points[self.marker]
				self.points[0].level = self.points[1].level
				self.newPoint = 0
			else:
				self.shift(self.marker+1, dimension-2, 1)
				self.marker += 1
				self.points[self.marker] = self.points[dimension-1] - self.points[0]
				self.points[self.marker].level = self.level
				self.newPoint = self.marker

		return prev_level != self.level

	def get_suggested_owner(self, label):
		vertex = None
		for i, point in enumerate(self.points):
			if p.label == label and i != self.newPoint:
				return get_owner(p.coordinates)

		# NOT REACHED 
		assert False

	def get_suggested_transform(self):
		points = zip(*filter(lambda i, p: i != self.newPoint, enumerate(self.points)))[1]
		sum_transform = reduce(
			lambda a,b: map(add, izip(a, b)),
			map(lambda p: p.transform(), points),
			[0 for _ in xrange(self.players)])
		sum_transform = map(lambda x: x / float(self.players))
		return sum_transform.coordinates

	def get_suggested_division(self):
		transformed = self.get_suggested_transform()
		division = []
		for i in xrange(len(transformed)):
			division.push({'room': i+1, 'rent':transformed[i]})

	def get_precision(self):
		return 2 * (1.0/ 2**self.level)