---
title: "Substring: How to Split a String"
author: Edd Turtle
type: post
date: 2018-05-05T09:00:00+00:00
url: /substring-num-of-characters
categories:
  - Uncategorized
tags:
  - substring
  - split
  - characters
  - rune
  - convert
meta_image: 2018/sub-string.png
---

In the example below we are looking at how to take the first x number of characters from the start of a string. If we know a character we want to separate on, like a space, we can use `strings.Split()` instead. But for this we're looking to get the first 6 characters as a new string.

To do this we first convert it into a rune, allowing for better support in different languages and allowing us to use it like an array. Then we pick the first characters using `[0:6]` and converting it back to a string.

```go
package main

import (
    "fmt"
)

func main() {

    myString := "Hello! This is a golangcode.com test ;)"

    // Step 1: Convert it to a rune
    a := []rune(myString)

    // Step 2: Grab the num of chars you need
    myShortString := string(a[0:6])

    fmt.Println(myShortString)
}
```

Example:

![](/img/2018/sub-string.png)
