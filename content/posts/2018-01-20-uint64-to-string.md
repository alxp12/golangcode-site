---
title: Convert uint64 to a String
author: Edd Turtle
type: post
date: 2018-01-20T10:45:00+00:00
url: /uint64-to-string
categories:
  - Uncategorized
tags:
  - strconv
  - convert
  - string
  - itoa
  - formatuint
  - print
  - number
  - 64
---

We've already got a post on [converting an integer to a string](/converting-and-int-to-string/) but the process of converting a variable of type `uint64` to a string is a little different. For an int we can use `Itoa()`, but for an unsigned int 64 we can still use `strconv` but we can use the `FormatUint` function instead.

<!--more-->

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {

    // Create our number
    var myNumber uint64
    myNumber = 18446744073709551615
    
    // Format to a string by passing the number and it's base.
    str := strconv.FormatUint(myNumber, 10)

    // Print as string
    // Will output: 'The number is: 18446744073709551615'
    fmt.Println("The number is: " + str)
}
```