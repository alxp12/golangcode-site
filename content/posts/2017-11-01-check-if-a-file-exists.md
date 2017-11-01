---
title: Check If a File Exists Before Using It
author: Edd Turtle
type: post
date: 2017-11-01T19:35:00+00:00
url: /check-if-a-file-exists
categories:
  - Uncategorized
tags:
  - file
  - io
  - exists
  - check
  - os
  - stat
  - isnotexists
---

In this basic example, we check to see if a file exists before interacting with it (otherwise something's not going to work as expected). We leverage the power of the `os` standard library and first use the `Stat()` function which although it's usually used to get information about a file, we're only looking at the errors. 

We can't just check for `err == nil` because any number of errors could be returned so we pass it to `IsNotExists()` to confirm that it's an error because the file does not exist.

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    filename := "example.txt"
    if _, err := os.Stat(filename); os.IsNotExist(err) {
        fmt.Println("File does not exist")
    } else {
        fmt.Println("File exists")
    }
}
```