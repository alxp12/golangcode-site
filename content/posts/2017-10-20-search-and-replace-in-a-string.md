---
title: Search and Replace in a String
author: Edd Turtle
type: post
date: 2017-10-20T11:35:00+00:00
url: /search-and-replace-in-a-string
categories:
  - Uncategorized
tags:
  - strings
  - search
  - replace
  - occurrence
  - escape
  - quotes
meta_image: 2017/str-replace.png
---

As programmers we often need to take a string and replace parts of it with something else. The code below has three examples, first of which is a basic 'find all' and replace, the second changes only the first occurrence of 'sound' and finally the third example demonstrates how to change a string containing quotes to use escaped quotes. These are changed by using the 4th argument to define how many times to replace, with -1 being every time.

All this functionality is managed by the `strings` package and the `Replace` function ([view docs](https://golang.org/pkg/strings/#Replace)).

```go
package main

import (
    "fmt"
    "strings"
)

func main() {

    // Example 1: Willkommen to GoLangCode.com
    myText := "Welcome to GoLangCode.com"
    myText = strings.Replace(myText, "Welcome", "Willkommen", -1)
    fmt.Println(myText)

    // Example 2: Change first occurrence
    // Output: The car sounds sound
    myText = "The sound sounds sound"
    myText = strings.Replace(myText, "sound", "car", 1)
    fmt.Println(myText)

    // Example 3: Replacing quotes (double backslash needed)
    // Output: I \'quote\' this text
    myText = "I 'quote' this text"
    myText = strings.Replace(myText, "'", "\\'", -1)
    fmt.Println(myText)
}
```

![search and replace within string in golang](/img/2017/str-replace.png)