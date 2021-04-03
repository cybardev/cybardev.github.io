---
title: "Prefix (++i) vs Postfix (i++) Operators in Code"
date: 2021-01-24T21:40:48+06:00
author: sksaad
slug: "prefix-vs-postfix"
description: "Learn the differences between i++ and ++i and when it is appropriate to use each one"
keywords: ["programming", "code", "C", "Java", "C++"]
draft: false
tags: ["Code", "Java", "C", "C++"]
math: false
toc: true
---

## The dilemma: `++i` vs `i++`

In C-style languages (C, C++, Java, etc.), the operators `++` and `--` are used to add or subtract `1` from a variable. `++` is called the “increment” operator, and `--` is called the “decrement” operator. If the operator is put before the variable, as in `++i`, it’s called a “prefix” operator. If the operator is put after the variable, as in `i--`, it’s called a “postfix operator” or “suffix operator”. Here’s a table to help visualize all that:

| Operator | Name                       |
| -------- | -------------------------- |
| `i++`    | Postfix increment operator |
| `i--`    | Postfix decrement operator |
| `++i`    | Prefix increment operator  |
| `--i`    | Prefix increment operator  |

The prefix and postfix operators do the same thing but have different operator precedence compared to the assignment operator. This can lead to your code having unexpected behavior when an increment/decrement operator is used in conjunction with the assignment operator. To demonstrate, I’ll show you some examples below.

### Standalone use

- increasing the value of a variable using `++`

```c
#include <stdio.h>
int main() {
    int x = 0;
    x++;
    printf("%d\n", x); // prints 1
}
```

```c
#include <stdio.h>
int main() {
    int x = 0;
    ++x;
    printf("%d\n", x); // prints 1
}
```

```c
#include <stdio.h>
int main() {
    int x = 0;
    x = x + 1; // or x += 1;
    printf("%d\n", x); // prints 1
}
```

The above codes all have the exact same effect: increase the value of `x` by `1` and print it. The decrement operator `--` would have a similar effect. This behavior can be used in while loops to add to a `count` variable on each iteration.

### Use with assignment

- prefix operator

```c++
#include <stdio.h>
int main() {
   int x = 0, y = 0;
   y = ++x;
   printf("%d\n", x); // prints 1
   printf("%d\n", y); // prints 1
}
```

```c++
#include <stdio.h>
int main() {
   int x = 0, y = 0;
   x = x + 1; // or x += 1;
   y = x;
   printf("%d\n", x); // prints 1
   printf("%d\n", y); // prints 1
}
```

As we can see here, the prefix operator first increases the value of `x` and returns the new value which is then assigned to `y` via the assignment operator.

- postfix operator

```c++
#include <stdio.h>
int main() {
   int x = 0, y = 0;
   y = x++;
   printf("%d\n", x); // prints 1
   printf("%d\n", y); // prints 0
}
```

```c++
#include <stdio.h>
int main() {
   int x = 0, y = 0;
   y = x;
   x = x + 1; // or x += 1;
   printf("%d\n", x); // prints 1
   printf("%d\n", y); // prints 0
}
```

Here, the postfix operator first returns the current value which is then assigned to `y` via the assignment operator and then increases the value of `x`. This works a bit differently than what it looks like. More on that [below](#a-little-tip).

### Use in loops

You’ll be glad to know that in for loops, `i++` and `++i` have essentially identical effects. This is because the order of operations in a for loop flows like this:

```c
for (int i = 0; i < 5; ++i) {
    // loop body
}
```

1. initialize loop variable `i = 0` <br />(this is executed *once and **only** once* before anything else is done with the loop)
2. check condition `i < 5`
3. execute loop body
4. add `1` to `i` in `++i` or `i++`
5. repeat from `step 2`

### A little tip

However, due to the nature of the operators and their precedence explained at the start of this post, `++i` is considered a slightly better programming practice. This is because `i++` actually does this:

- save the original value of `i` to a temporary variable
- add `1` to `i` (the same as `++i`)
- return the original value of `i` stored in the temporary variable <br />(`++i` would return the new value since it doesn’t store the original value in any temporary variable)

So, in cases like in the for loop where it doesn’t make a difference in behavior, it just takes up some extra memory and is better avoided. Although, modern compilers are smart enough to catch this and optimize the code to mean the same.