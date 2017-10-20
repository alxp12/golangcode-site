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
  - occurrance
  - escape
  - quotes
---

As programmers we often need to take a string and replace parts of it with something else. The code has three examples, first of which is a basic 'find all' and replace, the second changes only the first occurance of 'sound' and finally the third example demonstrates how to change a string containing quotes to use escaped quotes.

All this functionality is managed by the `strings` package and the `Replace` function.

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    // Example 1: Basic
    myText := "Welcome to GoLangCode.com"
    myText = strings.Replace(myText, "Welcome", "Willkommen", -1)

    // Output: Willkommen to GoLangCode.com
    fmt.Println(myText)

    // Example 2: Change first occurance
    myText = "The sound sounds sound"
    myText = strings.Replace(myText, "sound", "car", 1)

    // Output: The car sounds sound
    fmt.Println(myText)

    // Example 3: Replacing quotes (double backslash needed)
    myText = "I 'quote' this text"
    myText = strings.Replace(myText, "'", "\\'", -1)

    // Output: I \'quote\' this text
    fmt.Println(myText)
}
```