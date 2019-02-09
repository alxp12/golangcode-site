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
  - directory
meta_image: 2017/check-file-exists.png
---

In this basic example, we check to see if a file exists before interacting with it (otherwise something's not going to work as expected). We leverage the power of the `os` standard library and first use the `Stat()` function, which although it's usually used to get information about a file, we're only looking at the errors. 

We can't just check for `err == nil` because any number of errors could be returned so we pass it to `IsNotExists()` to confirm that it's an error because the file does not exist.

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    if fileExists("example.txt") {
        fmt.Println("Example file exists")
    } else {
        fmt.Println("Example file does not exist (or is a directory)")
    }
}

// fileExists checks if a file exists and is not a directory before we
// try using it to prevent further errors.
func fileExists(filename string) bool {
    info, err := os.Stat(filename)
    if os.IsNotExist(err) {
        return false
    }
    return !info.IsDir()
}
```

![check if a file exists before using it](/img/2017/check-file-exists.png)