# Creating Pandas DataFrame

Pandas DataFrame are two dimensional data structures with labeled rows and columns, that can hold many data types. If you are familiar with Excel, you can think of Pandas DataFrames as being similar to a spreadsheet. We can create Padas DataFrame manually or by loading data from a file. In this lesson, we will start by learning how to create Pandas DataFrame manually from dictionaries, and later we will see how we can load data into a DataFrame from a data file.

## Create a DataFrame Manually

We will start by creating a DataFrame manually from a dictionary of Pandas Series. It is a two-step process:

1. The first step is to create the dictionary of Pandas Series.
2. After the dictionary is created we can then pass the dictionary to the `pd.DataFrame()` function.

We will create a dictionary that contains items purchased by two people, Alice and Bob, on an online store. The Pandas Series will use the price of the items purchased as data, and the purchased items will be used as the *index* labels to the Pandas Series. Let’s see how this done in code:

```python
# We import Pandas as pd into Python
import pandas as pd

# We create a dictionary of Pandas Series
items = {'Alice': pd.Series(data = [40, 110, 500, 45], index= ['book', 'glasses', 'bike', 'pants']),'Bob': pd.Series(data=[245, 25, 55], index= ['bike', 'pants', 'watch'])}

# We print the type of items to see that it is a dictionary
print(type(items))

# Output
class 'dict'
```

Now that we have a dictionary, we are ready to create a DataFrame by passing it to the `pd.DataFrame()` function. We will create a DataFrame that could represent the shopping carts of various users, in this case we have only two users, Alice and Bob.

## Example 1. Create a DataFrame using a dictionary of Series

```python
# We create a Pandas DataFrame by passing it a dictionary of Pandas Series
shopping_carts = pd.DataFrame(items)

# We display the DataFrame
shopping_carts
```

|  | **Alice** | **Bob** |
| --- | --- | --- |
| **bike** | 500.0 | 245.0 |
| **book** | 40.0 | NaN |
| **glasses** | 110.0 | NaN |
| **pants** | 45.0 | 25.0 |
| **watch** | NaN | 55.0 |

There are several things to notice here, as explained below:

1. We see that DataFrames are displayed in tabular form, much like an Excel spreadsheet, with the labels of rows and columns in **bold**.
2. Also, notice that the row labels of the DataFrame are built from the union of the index labels of the two Pandas Series we used to construct the dictionary. And the column labels of the DataFrame are taken from the *keys* of the dictionary.
3. The last thing we want to point out is that we see some `NaN` values appear in the DataFrame. `NaN` stands for *Not a Number*, and is Pandas way of indicating that it doesn’t have a value for that particular row and column index. For example, if we look at the column of Alice, we see that it has `NaN` in the watch index. You can see why this is the case by looking at the dictionary we created at the beginning. We clearly see that the dictionary has no item for Alice labeled watches. So whenever a DataFrame is created, if a particular column doesn’t have values for a particular row index, Pandas will put a `NaN` value there.
4. If we were to feed this data into a machine learning algorithm we will have to remove these `NaN` values first. In a later lesson we will learn how to deal with `NaN` values and clean our data. For now, we will leave these values in our DataFrame.

In the example above, we created a Pandas DataFrame from a dictionary of Pandas Series that had a clearly defined indexes. If we don’t provide index labels to the Pandas Series, Pandas will use numerical rows indexes when it creates the DataFrame. Let’s see an example:

## Example 2. DataFrame assigns the numerical row indexes by default.

```python
# We create a dictionary of Pandas Series without indexes
data = {'Alice': pd.Series([40, 110, 500, 45]), 'Bob': pd.Series([245, 25, 55])}

# We create a DataFrame
df = pd.DataFrame(data)

# We display the DataFrame
df
```

|  | **Alice** | **Bob** |
| --- | --- | --- |
| **0** | 40 | 245.0 |
| **1** | 110 | 25.0 |
| **2** | 500 | 55.0 |
| **3** | 45 | NaN |

We can see that Pandas indexes the rows of the DataFrame starting from 0, just like NumPy indexes ndarrays.

Now, just like with Pandas Series we can also extract information from DataFrames using attributes. Let’s print some information from our `shopping_carts` DataFrame.

## Example 3. Demonstrate a few attributes of DataFrame

```python
# We print some information about shopping_carts
print('shopping_carts has shape:', shopping_carts.shape)
print('shopping_carts has dimension:', shopping_carts.ndim)
print('shopping_carts has a total of:', shopping_carts.size, 'elements')
print()
print('The data in shopping_carts is:\n', shopping_carts.values)
print()
print('The row index in shopping_carts is:', shopping_carts.index)
print()
print('The column index in shopping_carts is:', shopping_carts.columns)
```