# Using Built-in Functions to create arrays

One great time-saving feature of NumPy is its ability to create ndarrays using built-in functions. These functions allow us to create certain kinds of ndarrays with jus one line of code. Below we will see a few of the most useful built-in functions for creating ndarrays that you will come across when doing AI programming.

Let’s start by creating an ndarray with a specified shape that is full of zeros. We can do this by using the `np.zeros()` function. The function `np.zeros(shape)` creates an ndarray full of **zeros** with the given **shape**. So, for example, if you wanted to create a rank 2 array with 3 rows and 4 colums, you will pass the shape to the function in the form of `(rows, colums)`, as in the example below:

## Example 1. Create a Numpy array of zeros with a desired shape

```python
# We create a 3 x 4 ndarray full of zeros
X = np.zeros((3, 4))

# We print X
print()
print('X = \n', X)
print()

# We print information about X
print('X has dimensions:', X.shape)
print('X is an object of type:', type(X))
print('The element in X are of type:', X.dtype)

# Output
X =
[[ 0. 0. 0. 0.]
[ 0. 0. 0. 0.]
[ 0. 0. 0. 0.]]
X has dimensions: (3, 4)
X is an object of type: class 'numpy.ndarray'
The elements in X are of type: float64
```

As we can see, the `np.zeros()` function creates by default an array with **dtype** float64. If desired, the data type can be changed by using the keyword `dtype` .

Similarly, we can create an ndarray with a specified shape that is full of *ones*. We can do this by using the `np.ones()` function. Just like the `np.zeros()` function, the `np.ones()` function takes as an argument the shape of the ndarray you want to make. Let’s see an example:

## Example 2. Create a Numpy array of ones.

```python
# We create a 3 x 2 ndarray full of ones
X = np.ones((3,2))

# We print X
print()
print('X = \n', X)
print()

# We print information about X
print('X has dimensions:', X.shape)
print('X is an object of type:', type(X))
print('X
```