# Creating Pandas DataFrame

Pandas DataFrame are two dimensional data structures with labeled rows and columns, that can hold many data types. If you are familiar with Excel, you can think of Pandas DataFrames as being similar to a spreadsheet. We can create Padas DataFrame manually or by loading data from a file. In this lesson, we will start by learning how to create Pandas DataFrame manually from dictionaries, and later we will see how we can load data into a DataFrame from a data file.

## Create a DataFrame Manually

We will start by creating a DataFrame manually from a dictionary of Pandas Series. It is a two-step process:

1. The first step is to create the dictionary of Pandas Series.
2. After the dictionary is created we can then pass the dictionary to the `pd.DataFrame()` function.

We will create a dictionary that contains items purchased by two people, Alice and Bob, on an online store. The Pandas Series will use the price of the items purchased as data, and the purchased items will be used as the *index* labels to the Pandas Series. Let’s see how this done in code:

```python
```