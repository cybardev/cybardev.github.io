---
title: "Java Arrays"
date: 2021-03-08T16:03:05+06:00
author: sksaad
slug: "java-arrays"
description: "Get a basic know-how on one-dimensional arrays in Java"
keywords: ["java", "arrays", "code", "programming"]
draft: false
tags: ["Code", "Java"]
math: false
toc: true
comments: true
---

## What are arrays?

Think of arrays like a row of cardboard boxes. These boxes can be used to store different types of data - `ints`, `Strings`, even custom data types like `Person`.

One important thing to note is that you can only have a constant number of these boxes for each array you make. While making the array, if you tell Java that this array will have 10 items, then that array will always be able to contain up to 10 items - no more, no less, no changes to this size. You can store less than 10 items in that array and leave the others at default value (to change them later), but this might have weird effects on your program and is better avoided.

## Making new arrays

There are two ways of creating arrays in Java:

- **The first way** creates an array of Strings with a fixed number of the "boxes" (3 in the example below), and each box contains a default value given to it by Java. For String arrays like this one, that value is `null`, which isn't actually a String, but you can read more on that [here](https://www.geeksforgeeks.org/interesting-facts-about-null-in-java/).

```java
String[] fruits = new String[3];
```
Here's a visual representation of the first array:

| Box | Index | Item   |
| --- | ----- | ------ |
| 1   | 0     | `null` |
| 2   | 1     | `null` |
| 3   | 2     | `null` |

This way of making arrays is best used when you know how many items the array should have, but you don't know what the values will be. An example of this may be in a program that asks the users for their grades throughout a course, and you know the maximum number of tests there are in that course.

- **The second way** creates an array of 3 Strings too, but here, we're providing each box with an initial value, instead of keeping the default value.

```java
String[] fruits = {"Apple", "Banana", "Orange"};
```

Here's a visual representation of the second array:

| Box | Index | Item     |
| --- | ----- | -------- |
| 1   | 0     | `Apple`  |
| 2   | 1     | `Banana` |
| 3   | 2     | `Orange` |

This way is best used when you know what values you want to start with. An example of this may be when you want an array with the names of all the countries in the world. It would be rather painful if you first made an array of nearly 200 Strings with default value and then added each country name individually.

## Assigning values to arrays

Let's say you're very hard working and like to take challenges, and want to use the first way to make an array of countries. How would you set the values to be country names instead of `null`?

Here's how: `arrayName[index] = newValue;`

For example:
```java
String[] countries = new String[195];

countries[0] = "Atlantis";
countries[1] = "Bangladesh";
// and so on...
countries[194] = "Wonderland";
```

You can also use this to *re-assign* values:

```java
countries[1] = "Neverland";
```

This will change the value of the 2nd box (at index 1) from `Bangladesh` to `Neverland`.

## Calling array elements

Just like how people can be called by their names, these *elements* can be called by their *indices*. Elements is a technical term for the values in the "boxes" and Index is a technical term for the "position" of the boxes, and the first box is at index 0. So, the (n)th box will always be at index (n-1), as long as n is at least 1.

To access the nth array element in Java, simply call it by its index, like `fruits[1]`.

An example of it in action:
```java
System.out.println(fruits[1]);
```
This would print `Banana` to the console. Banana is the `2nd` element, so its index is `2-1 = 1`.

## Length of an Array

After all that creating, assigning and calling arrays and their elements, you might not remember what the length of each one is. Well, fear not, because Java has you covered. Arrays have a really nice property that you can use to know the length of an array. When each array is created, it's assigned an instance variable with the name `length` that stores how many items there can be in the array. To access it, simply use `arrayName.length`.

For example:

```java
System.out.println(countries.length);
// output: 195

System.out.println(fruits.length);
// output: 3
```

## Sorting Arrays

In case you assigned the names of the countries randomly and now want them sorted in alphabetical order, you can use the `Arrays.sort()` method from the `java.util.Arrays` class.

Here's how to use it:

```java
import java.util.Arrays;

// create the unsorted array of countries here

Arrays.sort(countries);

// the array "countries" is now sorted
```

## Looping over arrays

The process of looping through collections like arrays, lists, sets, etc. is also known as *iterating*. When we *iterate* over an array, we're simply checking the value in each box of the array one by one and usually performing the same actions with each value, unless specified otherwise by some logic control (`if-else` and such).

There are a few ways to iterate over arrays:

- Traditional `for` loop:

```java
String country;
for (int i = 0; i < countries.length; i++) {
    if (i != 42) {
        country = countries[i];
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
        country = countries[i];
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

## Check for identical arrays

Now that you've made some arrays, you might want to check if two arrays contain the same things. We could of course make a method to compare two given arrays using loops and `if-else` control, but that would be too much work. Thus, the `Arrays.equals()` method will certainly come in handy and take some load off our shoulders.

Here's how it works:

```java
import java.util.Arrays;

// make an array, countries
// make an array, fruits

boolean isEqual = Arrays.equals(countries, fruits);

System.out.println(isEqual);
// output: false

// output will be "true" if the given arrays are equal
```

## Helpful resources

Here are some resources I use to learn Java. I don't memorize anything, but rather just look them up when I need to. They're all great sites to learn Java (and other languages) and I hope you find them helpful.

- [SoloLearn](https://www.sololearn.com/learning/1068)
- [GeeksforGeeks](https://www.geeksforgeeks.org/java/)
- [W3schools](https://www.w3schools.com/java/)
- [tutorialspoint](https://www.tutorialspoint.com/java/)
- [Javatpoint](https://www.javatpoint.com/java-tutorial)

## Conclusion

That's all about arrays for now. That should cover the basics of one-dimensional arrays, but do let me know in the comments if I've missed something or made a mistake somewhere.

I hope it was helpful for you. Thanks for reading through. See you later.
