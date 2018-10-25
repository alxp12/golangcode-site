---
title: Get the Current Unix Time
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
This is a simple way to get the current system time in the unix format and in this example we're just printing the result to screen. This is all accessible from the [`time`](https://golang.org/pkg/time/) package. The `Unix()` function will actually return a type of `Time` (which is the stored time to the nanosecond) - but this can be converted into an int or formatted into a readable string.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    currentTime := time.Now().Unix()
    fmt.Println("Current Unix Time:", currentTime)
}
```

![](/img/2015/unix-time.png)