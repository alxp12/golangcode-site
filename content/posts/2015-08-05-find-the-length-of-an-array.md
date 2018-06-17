---
title: Find the Length of an Array/Slice
author: Edd Turtle
type: post
date: 2015-08-05T17:26:55+00:00
url: /find-the-length-of-an-array/
categories:
  - Uncategorized
tags:
  - array
  - find
  - fmt
  - len
  - length

---
With Go, you can find the length of an array (or more accurately a slice) by using the internal len() function. Our example shows us creating a slice and then printing out it's length, then adding an extra item and printing the length again.

```go
package main

import "fmt"

func main() {

    // Create an exmaple array
    array := []int{1, 2, 3, 4, 5}

    // Print number of items
    fmt.Println("First Length:", len(array))

    // Add an item and print again
    array = append(array, 6)
    fmt.Println("Second Length:", len(array))
}
```

![Get the length of a slice](/img/2015/array-length.png)