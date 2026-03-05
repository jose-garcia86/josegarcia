# Accessing Elements in Pandas DataFrames

We can access elements in Pandas DataFrames in many different ways. In general, we can access rows, columns, or individual elements of the DataFrame by using the row and column labels. We will use the same `store_items` DataFrame created in the previous lesson. Let's see some examples:

## Example 1. Access elements using labels

```python
# We print the store_items DataFrame
print(store_items)

# We access rows, columns and elements using labels
print()
print('How many bikes are in each store:\n', store_items[['bikes']])
print()
print('How many bikes and pants are in each store:\n', store_items[['bikes', 'pants']])
print()
print('What items are in Store 1:\n', store_items.loc[['store 1']])
print()
print('How many bikes are in Store 2:', store_items['bikes']['store 2'])
```

|  | **bikes** | **pants** | **watches** | **glasses** |
| --- | --- | --- | --- | --- |
| **store 1** | 20 | 30 | 35 | NaN |
| **store 2** | 15 | 5 | 10 | 50.0 |

How many bikes are in each store:

|  | **bikes** |
| --- | --- |
| **store 1** | 20 |
| **store 2** | 15 |

How many bikes and pants are in each store:

|  | **bikes** | **pants** |
| --- | --- | --- |
| **store 1** | 20 | 30 |
| **store 2** | 15 | 5 |

What items are in Store 1:

|  | **bikes** | **pants** | **watches** | **glasses** |
| --- | --- | --- | --- | --- |
| **store 1** | 20 | 30 | 35 | NaN |

How many bikes are in Store 2: 15

It is important to know that when accessing individual elements in a DataFrame, as we did in the last example above, the labels should always be provided with the **column label first**, i.e., in the form `dataframe[column][row]`. For example, when retrieving the number bikes in store 2, we first used the column label **bikes** and then the row label **store 2**. If you provide the row label first you will get an error.

We can also modify our DataFrames by **adding rows** or **columns**. Let's start by learning how to add new columns to our DataFrames. Let's suppose we decided to add **shirts** to the items we have in stock at each store. To do this, we will need to add a new column to our `store_items` DataFrame indicating how many shirts are in each store. Let's do that:

## Example 2. Add a column to an existing DataFrame

```python
# We add a new column named shirts to our store_items DataFrame indicating the number of
# shirts in stock at each store. We will put 15 shirts in store 1 and 2 shirts in store 2
store_items['shirts'] = [15, 2]

# We display the modified DataFrame
store_items
```

|  | **bikes** | **pants** | **watches** | **glasses** | **shirts** |
| --- | --- | --- | --- | --- | --- |
| **store 1** | 20 | 30 | 35 | NaN | 15 |
| **store 2** | 15 | 5 | 10 | 50.0 | 2 |

We can see that when we add a new column, the new column is added at the end of our DataFrame.

We can also add new columns to our DataFrame by using arithmetic operations between other columns in our DataFrame. Let’s see an example:

## Example 3. Add a new column based on the arithmetic operation between existing columns of a DataFrame

```python
# We make a new column called suits by adding the number of shirts and pants
store_items['suits'] = store_items['shirts'] + store_items['pants']

# We display the modified DataFrame
store_items
```

|  | **bikes** | **pants** | **watches** | **glasses** | **shirts** | **suits** |
| --- | --- | --- | --- | --- | --- | --- |
| **store 1** | 20 | 30 | 35 | NaN | 15 | 45 |
| **store 2** | 15 | 5 | 10 | 50.0 | 2 | 7 |

Suppose now, that you opened a new store and you need to add the number of items in the stock of that new store into your DataFrame. We can do this by adding a new row to the `store_items` Dataframe. To add rows to our DataFrame we first have to create a new Dataframe and then append it to the original DataFrame. Let's see how this works

## Example 4 a. Create a row to be added to the DataFrame

```python
# We create a dictionary from a list of Python dictionaries that will contain the number of different items at the new store
new_items = [{'bikes': 20}]
```