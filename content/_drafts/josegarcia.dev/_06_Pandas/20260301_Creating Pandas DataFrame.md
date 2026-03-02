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
3. The last thing we want to point out is that we see some `NaN` values appear in the DataFrame. `NaN` sta