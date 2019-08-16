---
title: Check Element Exists in a Slice
author: Edd Turtle
type: post
date: 2019-08-16T17:00:00+00:00
url: /check-if-element-exists-in-slice
categories:
  - Uncategorized
tags:
  - find
  - slice
  - map
  - element
  - generics
  - key
  - index
  - item
  - contains
meta_image: 2019/slice-element.png
---

Go doesn't have a `find` or `in_array` function as part of it's standard library. They are easy to create however. In this example we create a `Find()` function to search a slice of strings for the element we are looking for.

Cue the "[generics](https://go.googlesource.com/proposal/+/master/design/go2draft-generics-overview.md)" rant from some coders. This is a great example of why they could be useful. We have created our find function, but it only works with strings and you will have to create different find functions for different types - as needed.

```go
package main

import (
    "fmt"
)

func main() {

    items := []string{"A", "1", "B", "2", "C", "3"}

    // Missing Example
    _, found := Find(items, "golangcode.com")
    if !found {
        fmt.Println("Value not found in slice")
    }

    // Found example
    k, found := Find(items, "B")
    if !found {
        fmt.Println("Value not found in slice")
    }
    fmt.Printf("B found at key: %d\n", k)
}

// Find takes a slice and looks for an element in it. If found it will
// return it's key, otherwise it will return -1 and a bool of false.
func Find(slice []string, val string) (int, bool) {
    for i, item := range slice {
        if item == val {
            return i, true
        }
    }
    return -1, false
}
```

![check slice element](/img/2019/slice-element.png)