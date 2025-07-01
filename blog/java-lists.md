---
title: "Java Lists"
date: 2021-03-22T22:36:56+06:00
author: sksaad
slug: "java-lists"
description: "Get a basic know-how on  lists in Java"
keywords: ["java", "lists", "code", "programming"]
draft: false
tags: ["Code", "Java"]
math: false
toc: true
comments: true
---

*PS: This post is structured similarly to my [post about arrays](../java-arrays/index.html). I will also refer to array concepts, so you may want to read that first if you're new to Java collections.*

## What are lists?

Think of lists like a row of cardboard boxes. These boxes can be used to store different types of data - `ints`, `Strings`, even custom data types like `Person`. You can add more boxes to the row, remove boxes from the row, or even have no boxes at all!

One important thing to note is that you can have a variable number of these boxes for each list you make. This is different from arrays, as arrays can only have a constant number of boxes. There are two main types of lists in Java - ArrayList and LinkedList. They can be used identically, but are very different in how they store data. While making the list, you'll need to tell Java which kind of list you'd like to have. If you tell Java that this list will have 10 items, then you will always be able to change its size later to accommodate more or less items.

## Making new lists

There are two ways of creating lists in Java as described below. Make sure you set the type of the variable as List and not ArrayList or LinkedList. This makes your code more modular and portable so that if you ever want to convert between ArrayList and LinkedList, you only need to change it in one place instead of having to re-factor the whole code.

- **The first way** creates a list of Strings without specifying initial items. The type of list must be specified between angle brackets (`<`, `>`).

```java
List<String> fruits = new ArrayList<>();
// or
List<String> fruits = new LinkedList<>();
```

This way of making lists is best used when you don’t know what items the list should initially have, but you know the number of values may vary. An example of this may be in a program that asks the users for their grades throughout a course, and you don’t know the maximum number of tests there are in that course.

- **The second way** creates a list of 3 Strings, and here we're providing each box with an initial value (which can be changed later as needed).

```java
List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Orange"));
// or
List<String> fruits = new LinkedList<>(Arrays.asList("Apple", "Banana", "Orange"));
```

Here's a visual representation of the second list:

| Box | Index | Item     |
| --- | ----- | -------- |
| 1   | 0     | `Apple`  |
| 2   | 1     | `Banana` |
| 3   | 2     | `Orange` |

This way is best used when you know what values you want to start with. An example of this may be when you want a list with the names of all the countries in the world. You could also make a list the first way and add values later, as I’ll show below.

## Manipulating list values

- <u>Adding values</u>:

Let's say you like to keep things clean and simple, and want to use the first way to make an list of countries.<br />How would you add the country names to the list?

Here's how: `listName.add(newValue);`

For example:
```java
List<String> countries = new ArrayList<>();

countries.add("Atlantis");
countries.add("Bangladesh");
// and so on...
countries.add("Wonderland");
```

- <u>Modifying values</u>:

To *re-assign* values, you’ll need to use the `set` method:

```java
countries.set(1, "Neverland");
```

This will change the value of the 2nd box (at index 1) from `Bangladesh` to `Neverland`.

- <u>Removing values</u>:

To remove the value at a specific index:

```java
countries.remove(1);
```

To remove the first occurrence of the specified value:

```java
countries.remove("Neverland");
```

To remove all occurrences of the specified value:

```java
countries.removeAll("Neverland");
```

## Calling list elements

Just like how people can be called by their names, these *elements* can be called by their *indices*. Elements is a technical term for the values in the "boxes" and Index is a technical term for the "position" of the boxes, and the first box is at index 0. So, the n^th^ box will always be at index `(n-1)`, as long as n is at least 1.

To access the nth list element in Java, simply call it by its index using the `get` method, like `fruits.get(1)`.

An example of it in action:
```java
System.out.println(fruits.get(1);
```
This would print `Banana` to the console. Banana is the `2nd` element, so its index is `2 - 1 = 1`.

## Length of a list

After all that creating, assigning and calling lists and their elements, you might not remember what the length of each one is. Well, fear not, because Java has you covered. Lists have a handy little getter method that you can use to know the length of a list. To access it, simply use `listName.size()`.

For example:

```java
System.out.println(countries.size());
// output: 195

System.out.println(fruits.size());
// output: 3
```

## Sorting lists

In case you assigned the names of the countries randomly and now want them sorted in alphabetical order, you can use the `Collections.sort()` method from the `java.util.Collections` class.

Here's how to use it:

```java
import java.util.Collections;

// create the unsorted list of countries here

Collections.sort(countries);

// the list "countries" is now sorted
```

This will also sort numbers in numerical order, and other types in their natural order. It will also sort custom data types implementing the `Comparable` interface as defined in their `compareTo` method.

## Looping over lists

The process of looping through collections like lists, lists, sets, etc. is also known as *iterating*. When we *iterate* over an list, we're simply checking the value in each box of the list one by one and usually performing the same actions with each value, unless specified otherwise by some logic control (`if-else` and such).

There are a few ways to iterate over lists:

- Traditional `for` loop:

```java
String country;
for (int i = 0; i < countries.length; i++) {
    if (i != 42) {
        country = countries.get(i);
        System.out.println(country);
    } else {
        System.out.println(
            "The answer to life, the universe "
            + "and everything..."
        );
    }
}
```

- `for-each` loop:

```java
for (String country : countries) {
    System.out.println(country);
}
```

- `while` loop:

```java
int i = 0;
String country;
while (i < countries.length) {
    if (i != 42) {
        country = countries.get(i);
        System.out.println(country);
    } else {
        System.out.println(
            "The answer to life, the universe "
            + "and everything..."
        );
    }
    i++;
}
```

As you can see, while the `for-each` loop makes life easier for simple iterations, you have slightly less control over things as it doesn't give you the index easily. We can, however, mitigate that problem by using a variable to track the index, like in the `while` loop:

```java
int i = 0;
for (String country : countries) {
    if (i != 42) {
        System.out.println(country);
    } else {
        System.out.println(
            "The answer to life, the universe "
            + "and everything..."
        );
    }
    i++;
}
```

Or you could just use the while loop.

However, this kind of `for-each` loop does have an advantage. The variable `country` is created and used within the scope of this loop alone, so you can create a variable with the same name outside the scope and use it without conflicts. It can be done in the other loops too, but is much cleaner, easily readable and more efficient this way. Do note that the variable to track index, `i`, is declared outside the scope of the `for-each` loop, so make sure to be careful about that later. Next time you want to use it in that scope, you should reset it to `0` before you perform any operations with it, unless you actually want to retain the value it has after going through the loop.

It's often important to choose the correct loop for the task at hand. Take a deep breath, relax and think about which loop might put you at an advantage.

## A better way to iterate

If you tried to modify list elements inside loops and had your program crash with a `ConcurrentModificationException`, no need to panic. It’s just Java being cautious so that nothing weird happens in the program. To get around this, we need to use list iterators and the methods that come with them which we can use to manipulate the list safely.

*“With great power comes great responsibility.”<br />- Uncle Ben*

Here’s a little text filtering program to demonstrate `ListIterator`s in action:

```java
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class FilterLines {
    public static void main(String[] args) {
        // create variables
        List<String> lines = new ArrayList<>();
        ListIterator<String> linesIterator; // declare the iterator
        String currentLine;

        // add lines to the list of lines to filter
        lines.add("There was a line with the word bad here.");
        lines.add("There was another bad line here.");
        lines.add("This line will stay as is.")
        lines.add("Here's a good line.");
        lines.add("Have a good day!");

        // code to filter the lines
        linesIterator = lines.listIterator(); // assign the iterator
        while (linesIterator.hasNext()) {
            currentLine = linesIterator.next();
            if (currentLine.contains("bad")) {
                linesIterator.remove();
            } else if (currentLine.contains("good")) {
                linesIterator.set(currentLine.toUpperCase());
            }
        }

        // print out the lines
        for (String line : lines) {
            System.out.println(line);
        }
    }
}
```

**PS**: It's important to assign the list iterator right before iteration as on `line 20`. It can be declared beforehand, though, as on `line 9`. This is because the `listName.listIterator()` method gets the **current** state of the list and creates a `ListIterator` object out of it. Changes you make directly to the list will not update the iterator and may result in unexpected behaviour.

Running the above program produces the following output:

```
This line will stay as is.
HERE'S A GOOD LINE.
HAVE A GOOD DAY!
```

As you can see, the lines with “bad” were removed and the lines with “good” were converted to uppercase.

## Check for identical lists

Now that you've made some lists, you might want to check if two lists contain the same things. We could of course make a method to compare two given lists using loops and `if-else` control, but that would be too much work. Thus, the `equals` method will certainly come in handy and take some load off our shoulders.

Here's how it works:

```java
// make a list, countries
// make a list, fruits

boolean isEqual = countries.equals(fruits);

System.out.println(isEqual);
// output: false

// output will be "true" if the given lists are equal
```

## Helpful resources

Here are some resources I use to learn Java. I don't memorise anything, but rather just look them up when I need to. They're all great sites to learn Java (some have other languages too) and I hope you find them helpful.

- [Java 8 docs of the List interface](https://docs.oracle.com/javase/8/docs/api/java/util/List.html)
- [Java 8 docs of the ArrayList class](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html)
- [Java 8 docs of the LinkedList class](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html)
- [Java 8 docs of the ListIterator interface](https://docs.oracle.com/javase/8/docs/api/java/util/ListIterator.html)
- [SoloLearn](https://www.sololearn.com/learning/1068)
- [GeeksforGeeks](https://www.geeksforgeeks.org/java/)
- [W3schools](https://www.w3schools.com/java/)
- [tutorialspoint](https://www.tutorialspoint.com/java/)
- [Javatpoint](https://www.javatpoint.com/java-tutorial)

## Conclusion

That's all about lists for now. That should cover the basics of lists, but do let me know in the comments if I've missed something or made a mistake somewhere.

I hope it was helpful for you. Thanks for reading through. See you later.
