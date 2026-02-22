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
print('Fruits * 2:\n', fruits * 2) # We multiply
```