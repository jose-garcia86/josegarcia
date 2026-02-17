# Arithmetic operations and Broadcasting

We have reached the last lesson in this introduction to NumPy. In this last lesso we will see how NumPy does arithmetic operations on ndarrays. NumPy allows element-wise operations on ndarrays as well as matrix operations. In this lesson we will only be looking at element-wise operations on ndarrays. In order to do element-wise operations, NumPy sometimes uses something called **Broadcasting**. Broadcasting is the term used to describe how NumPy handles element-wise arithmetic operations with ndarrays on different shapes. For example, broadcasting is used implicitly when doing arithmetic operations between scalars and ndarrys.

Let’s start by doing element-wise addition, subtraction, multiplication, and division, between ndarrays. To do this, NumPy provides a functional approach, where we use functions such as `np.add()`, or by using arithmetic symbols, such as `+`, that resembles more how we write mathematical equations. Both forms will do the same operation, the only difference is that if you use the function approach, the functions usually have options that you can tweak using keywords. It is important to note that when performing element-wise operations, the shapes of the ndarrays being operated on, must hae the same shape or be bradcastable. We’ll explain more about this later in this lesson. Let’s start by performing element-wise arithmetic operations on rank 1 ndarrays:

## Example 1. Element-wise arithmetic operations on 1-D arrays

```python
# We create two rank 1 ndarrays
x = np.array([1, 2, 3, 4])
y = np.array([5.5, 6.5, 7.5, 8.5])

# We print x
print()
print('x = ', x)

# We print y
print()
print('y = ', y)
print()

# We perfrom basic element-wise operations using arithmetic symbols and functions
print('x + y =', x + y)
print('add(x, y) =', np.add(x, y))
print()
print('subtract(x-y) =', np.subtract(x, y))
print()
print('x * y =', x * y)
print('mipliply(x,y) = ', np.multiply(x, y))
print()
print('x / y =', x / y)
print('divide(x,y) =', np.divide(x, y))

# Output
x = [1 2 3 4]

y = [ 5.5 6.5 7.5 8.5]

x + y = [ 6.5 8.5 10.5 12.5]
add(x,y) = [ 6.5 8.5 10.5 12.5]

x - y = [-4.5 -4.5 -4.5 -4.5]
subtract(x,y) = [-4.5 -4.5 -4.5 -4.5]

x * y = [ 5.5 13. 22.5 34. ]
multiply(x,y) = [ 5.5 13. 22.5 34. ]

x / y = [ 0.18181818 0.30769231 0.4 0.47058824]
divide(x,y) = [ 0.18181818 0.30769231 0.4 0.47058824]
```

We can also perform the same element-wise arithmetic operations on rank 2 ndarrays. Again, remember that in order to do these operations the shapes of the ndarray being operated on, must have the same shape or be broadcastable.

## Example 2. Element-wise arithmetic operations on a 2-D array (Same shape)

```python
# We create two rank 2 ndarrays
X = np.array([1, 2, 3, 4]).reshape(2, 2)
Y = np.array([5.5, 6.5, 7.5, 8.5]).reshape(2, 2)

# We print X
print()
print('X = \n', X)

# We print Y
print()
print('Y = \n', Y)
print()

# We perform basic element-wise operations using arithmetic symbols and functions
print('X + Y = \n', X + Y)
print()
print('add(X,Y) = \n', np.add(X,Y))
print()
print('X - Y = \n', X - Y)
print('subtract(X,Y) = \n', np.subtract(X,Y))
print()
print('X * Y = \n', X * Y)
print('multiply(X,Y) = \n', np.multiply(X,Y))
print()
print('X / Y = \n', X / Y)
print('divide(X,Y) = \n', np.divide(X,Y))

# Output
X =
[[1 2]
[3 4]]

Y =
[[ 5.5 6.5]
[ 7.5 8.5]]

X + Y =
[[ 6.5 8.5]
[ 10.5 12.5]]

add(X,Y) =
[[ 6.5 8.5]
[ 10.5 12.5]]

X - Y =
[[-4.5 -4.5]
[-4.5 -4.5]]

subtract(X,Y) =
[[-4.5 -4.5]
[-4.5 -4.5]]

X * Y =
[[ 5.5 13. ]
[ 22.5 34. ]]

multiply(X,Y) =
[[ 5.5 13. ]
[ 22.5 34. ]]

X / Y =
[[ 0.18181818 0.30769231]
[ 0.4 0.47058824]]

divide(X,Y) =
[[ 0.18181818 0.30769231]
[ 0.4 0.47058824]]
```

We can also apply mathematical functions, such as `sqrt(x)`, to all elements of an ndarray at once.

## Example 3.  Additional mathematical functions

```python
# We create a rank 1 ndarray
x = np.array([1, 2, 3, 4])

# We print x
print()
print('x = ', x)

# We apply different mathematical functions to all elements of x
print()
print('EXP(x) = ', np.exp(x))
print()
print('SQRT(x) = ', np.sqrt(x))
print()
print('POW(x,2) = ', np.pow(x, 2)) # We raise all elements to the power of 2

# Output
x = [1 2 3 4]

EXP(x) = [ 2.71828183 7.3890561 20.08553692 54.59815003]

SQRT(x) = [ 1. 1.41421356 1.73205081 2. ]

POW(x,2) = [ 1 4 9 16]
```

Another great feature of NumPy is that it has a wide variety of statistical functions. Statistical functions provide us with statistical information about the elements in an ndarray.

**Note** - Most of the statistical operations can be done using either a function or an equivalent method. For example, both [numpy.mean(opens in a new tab)](https://numpy.org/doc/stable/reference/generated/numpy.mean.html) function and [numpy.ndarray.mean(opens in a new tab)](https://numpy.org/doc/stable/reference/generated/numpy.ndarray.mean.html#:~:text=method%20ndarray.,mean%20for%20full%20documentation.) method will return the arithmetic mean of the array elements along the given axis.

Let’s see some examples showing a variety of statistical operations:

## Example 4. Statistical functions

```python
# We create a 2 x 2 ndarray
X = np.array([[1, 2], [3, 4]])

# We print x
print()
print('X = \n', X)
print()

print('Average of all elements ')
```