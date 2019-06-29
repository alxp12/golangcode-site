---
title: How to Check If a String Starts With ...
author: Edd Turtle
type: post
date: 2019-06-29T19:00:00+00:00
url: /check-if-string-starts-with
categories:
  - Uncategorized
tags:
  - string
  - prefix
  - starts
  - slice
  - length
  - hasprefix
meta_image: 2019/string-starts-with.png
---

In this post we look at how to check if a given string starts with something. This is often used in programming and there are different ways to achieve the same goal.

We provide two options in this example. The first is to use the `strings` package along with the `HasPrefix` function - this is probably the simplest/best solution. We did include a second option though, if you know how long the prefix that you're looking for is, you can use the string as a slice and check it's value.

```go
package main

import (
    "fmt"
    "strings"
)

func main() {

    myString := "Hello golangcode.com"

    // Option 1: (Recommended)
    if strings.HasPrefix(myString, "Hello") {
        fmt.Println("Hello to you too")
    } else {
        fmt.Println("Goodbye")
    }

    // Option 2:
    if len(myString) > 6 && myString[:5] == "Hello" {
        fmt.Println("Option 2 also matches")
    }
}
```

![check if a string starts with a value](/img/2019/string-starts-with.png)