# Arithmetic Operations on Pandas Series

Just like with NumPy ndarrays, we can perform element-wise arithmetic operations on Pandas Series. In this lesson wie will look at arithmetic operations between Pandas Series and single numbers. Let’s create a new Pandas Series that will hold a grocery list of just fruits.

```python
# We create a Pandas Series that stores a grocery list of just fruits
fruits = pd.Series(data = [10, 6, 3,], index = ['apples', 'oranges', 'bananas'])

# We display the fruits Pandas Series
fruits
```

| Fruit | Quantity |
| --- | --- |
| Apples | 10 |
| Oranges | 6 |
| Bananas | 3 |

We can now modify the data in fruits by performing basic arithmetic operations. Let’s see some examples

## Example 1. Element-wise basic arithmetic operations

```python
# We print fruits for reference
print('Original grocery list of fruits:\n', fruits)

# We perform basic element-wise operations using arithmetic symbols
print()
print('Fruits + 2:\n', fruits + 2) # We add 2 to each item in fruits
print()
print('Fruits - 2:\n', fruits - 2) # We substract 2 to each item in fruits
print()
print('Fruits * 2:\n', fruits * 2) # We multiply each item in fruits
print()
print('Fruits / 2:\n', fruits / 2) # We divide each item in fruits by 2
print()
```

#### Output

| **Fruit** | **Quantity** |
| --- | --- |
| Apples | 10 |
| Oranges | 6 |
| Bananas | 3 |

| fruits + 2 |  |
| --- | --- |
| apples | 12 |
| oranges | 8 |
| bananas | 5 |

| fruits - 2 |  |
| --- | --- |
| apples | 8 |
| oranges | 4 |
| bananas | 1 |

| fruits * 2 |  |
| --- | --- |
| apples | 20 |
| oranges | 12 |
| bananas | 6 |

| fruits / 2 |  |
| --- | --- |
| apples | 5.0 |
| oranges | 3.0 |
| bananas | 1.5 |

You can also apply mathematical functions from NumPy, such as `sort(x)`, to all elements of a Pandas Series.

## Example 2. Use mathematical functions from NumPy to operate on Series

```python
# We import NumPy as np to be able to use the mathematical functions
import numpy as np

# We print fruits for reference
print('Original grocery list of fruits:\n', fruits)

# We apply different mathematical functions to all elements of fruits
print()
print('EXP(X) = \n', np.exp(fruits))
print()
print('SQRT(X) = \n', np.sqrt(fruits))
print()
print('POW(X, 2) = \n', np.power(fruits, 2)) # We raise all elements of fruits to the power of 2
```

#### Output

| Original grocery list |  |
| --- | --- |
| apples | 10 |
| oranges | 6 |
| bananas | 3 |

| EXP(X) = |  |
| --- | --- |
| apples | 22026.465795 |
| oranges | 403.428793 |
| bananas | 20.085537 |

| SQRT(X) = |  |
| --- | --- |
| apples | 3.162278 |
| oranges | 2.449490 |
| bananas | 1.732051 |

| POW(X,2) = |  |
| --- | --- |
| apples | 100 |
| oranges | 36 |
| bananas | 9 |

Pandas also allows us to only apply arithmetic operations on selected items in our fruits grocery list. Let’s see some examples.

## Example 3. Perform arithmetic operations on selected elements

```python
# We print fruits for reference
print('Original grocery list of fruits:\n', fruits)
print()

# We add 2 only to the bananas
print('Amount of bananas + 2 =', fruits['bananas'] + 2)
print()

# We subtract 2 from apples
print('Amount of apples - 2=', fruits.iloc[0] - 2)
print()

# We multiply apples and oranges by 2
print('We double the amount')
```