---
title: "While True: Looping in Go"
author: Edd Turtle
type: post
date: 2017-12-17T11:00:00+00:00
url: /while-true
categories:
  - Uncategorized
tags:
  - while
  - for
  - loop
  - looping
  - true
  - boolean
  - infinite
---

In Go, the traditional while true loop, found in many programming languages, can done through the `for` keyword. Below are two alternative versions, a `for` can work as an infinite loop without any parameters, or with a true boolean.

<!--more-->

```go
package main

import (
    "fmt"
    "time"
)

func main() {

    // while true loop
    for {
        fmt.Println("Infinite Loop 1")
        time.Sleep(time.Second)
    }

    // Alternative Version
    for true {
        fmt.Println("Infinite Loop 2")
        time.Sleep(time.Second)
    }
}
```