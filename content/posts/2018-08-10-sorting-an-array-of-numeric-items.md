---
title: Sorting an Array of Numbered String Values
author: Edd Turtle
type: post
date: 2018-08-10T19:30:00+00:00
url: /sorting-an-array-of-numeric-items
categories:
  - Uncategorized
tags:
  - sort
  - array
  - slice
  - convert
  - int
  - string
  - numeric
---

This is an issue in programming when numbers are stored as strings - because as strings, when sorted alphabetically they will go by each digit, from first to last. You might encounter this problem when dealing with numbered file names, for example, which will be treated as strings but we might need to process them in order.

In our example below we use both the `sort` and `strconv` packages to sort the array and convert the strings to numbers within our comparison function. This conversion to integer gives us the reliable sorting.

```go
package main 

import (
    "fmt"
    "sort"
    "strconv"
)

func main() {
    
    myList := []string{"1", "10", "11", "2", "3", "4", "5", "6", "7", "8", "9"}

    fmt.Printf("Before: %v\n", myList)

    // Pass in our list and a func to compare values
    sort.Slice(myList, func(i, j int) bool {
        numA, _ := strconv.Atoi(myList[i])
        numB, _ := strconv.Atoi(myList[j])
        return numA < numB
    })

    fmt.Printf("After: %v\n", myList)
}
```

![](/img/2018/array-sort.png)
