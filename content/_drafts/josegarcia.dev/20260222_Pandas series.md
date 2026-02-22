# Pandas Series

A Pandas series is a *one-dimensonal* array-like object that can hold many data types, such as numbers or strings, and has an option to provide axis labels.

## Difference between NumPy ndarrays and Pandas Series

1. One of the main differences between Pandas Series and NumPy ndarrays is that you can assign an index label to each element in the Pandas Series. In other words, you can name the indices of your Pandas Series anything you want.
2. Another big difference between Pandas Series and NumPy ndarrays is that Pandas Series can hold data of different data types.

Let’s start by importing Pandas into Python. It has become a convention to import Pandas as `pd`, therefore, you can import Pandas by typing the following command in your Jupyter notebook:

```python
import pandas as pd
```

Let’s begin by creating a Pandas Series. You can create Pandas Series by using the command `pd.Series(data, index)`, where `index` is a list of index labels. Let’s use a Pandas Series to store a grocery list. We will use the food items as index labels and the quantity we need to buy of each item as our data.

## Example 1 - Create a Series

```python
# We import Pandas as pd into Python
import pandas as pd

# We create a Pandas Series that stores a grocery list
groceries = pd.Series(data = [30, 6, 'Yes', 'No'], index = ['eggs', 'apples', 'milk', 'bread'])

# We display the Groceries Pandas Series
groceries

# Output
eggs            30
apples          6
milk            Yes
bread           No
dtype: object
```