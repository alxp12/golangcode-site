---
title: Get Unix Time
author: Edd Turtle
type: post
date: 2015-08-02T11:03:43+00:00
url: /get-unix-time/
categories:
  - Uncategorized
tags:
  - format
  - nanosecond
  - now
  - print
  - strconv
  - time
  - unix

---
This is a simple way to get the current system time in the unix format and in this example we&#8217;re just printing the result to screen. This is all accessible from the [`time`](https://golang.org/pkg/time/) package. The `Unix()` function will actually return a type of `Time` (which is the stored time to the nanosecond) - but this can be converted into and int or formatted into a readable string.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    time := time.Now().Unix()
    fmt.Printf("Current Unix Time: %v\n", time)
}
```