---
title: "How Long Does a Function Take: Measuring Execution Time"
author: Edd Turtle
type: post
date: 2017-12-07T20:00:00+00:00
url: /function-execution-time
categories:
  - Uncategorized
tags:
  - time
  - execution
  - measuring
  - duration
  - since
  - defer
---

We often need to measure execution time in programming, as it helps us understand the programs we're working with and knowing where potential bottlenecks are occurring.

In Go, we are able to use the `time` package and the `defer` keyword to run our time tracking function at the end of our long function. The parameters will be calculated at the beginning of the function (thus freezing the start time). Once the deferred function is running, all we need to do is show the difference in start time and current time.

```go
package main

import (
    "log"
    "time"
)

func main() {
    LongRunningFunction()
}

func LongRunningFunction() {

    // Use our time taken function to log the current time with the defer 
    // so it will actually run at the end at the end of this function.
    defer TimeTaken(time.Now(), "LongRunningFunction")

    // ... to illustrate pause.
    time.Sleep(2 * time.Second)

}

func TimeTaken(t time.Time, name string) {
    elapsed := time.Since(t)
    log.Printf("TIME: %s took %s\n", name, elapsed)
}
```

Example:

![Example of Measuring Function Execution Time](/img/function-execution-time.gif)