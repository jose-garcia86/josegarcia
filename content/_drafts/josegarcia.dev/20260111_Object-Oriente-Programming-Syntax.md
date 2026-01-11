# Object-Oriented Programming Syntax

## Function vs Method

A function and a method looks very similar. They both use the def keyword. They also have inputs an return outputs. The difference is that a method is inside of a class whereas a function is outside of a class.

```python
class Shirt:
    def __init__(self, shirt_color, shirt_size, shirt_style, shirt_price):
        self.color = shirt_color
        self.size = shirt_size
        self.style = shirt_style
        self.price = shirt_price

    def change_price(self, new_price):
        self.price = new_price

    def discount(self, discount):
        return self.price * (1 - discount)

Shirt('red', 'S', 'short sleeve', 15)

new_shirt = Shirt('red', 'S', 'short sleeve', 15)

print(new_shirt.color)
print(new_shirt.size)
print(new_shirt.style)
print(new_shirt.price)

new_shirt.change_price(10)
print(new_shirt.price)

print(new_shirt.discount(.2))

tshirt_collection = []
shirt_one = Shirt('orange', 'M', 'short sleeve', 25)
shirt_two = Shirt('red', 'S', 'short sleeve', 15)
shirt_three = Shirt('purple', 'XL', 'short sleeve', 10)

tshirt_collection.append(shirt_one)
tshirt_collection.append(shirt_two)
tshirt_collection.append(shirt_three )

for i in range(len(tshirt_collection)):
   print (tshirt_collection[i].color)
```

## What is self?

If you instantiate two objects, how does Python differentiate between these two objects?

```python
shirt_one = Shirt(‘red’, ’S’, ’short-sleeve’, 15)
shirt_two = Shirt(‘yellow’, ‘M’, ‘long-sleeve’, 20)
```

That’s where `self` comes into play. If you call the `change_price` method on shirt_one, how does Python know to change the price of shirt_one and not of shirt_two?

```python
shir_one.change_price(12)
```

Behind the scenes, Python is calling the `change_price`method:

```python
def change_price(self, new_price):
    self.price = new_price
```

`Self` tells Python where to look in the computer’s memory for the shirt_one object. And then Python changes the price of the shirt_one object. When you call the `change_price` method, `shirt_one.change_price(12)`. `self` is implicitly passed in.

The word `self` ist just convention. You could actually use any other name as long as your are consistent; however, you should always use `self` rather than some other word or else you might confuse your code reader’s. 