---
title: "Creating & Writing to Temp Files"
author: Edd Turtle
type: post
date: 2018-07-06T19:00:00+00:00
url: /creating-temp-files
categories:
  - Uncategorized
tags:
  - temp
  - file
  - os
  - ioutil
  - prefix
  - folder
  - bytes
  - write
  - unix
---

We as programmers often use temporary files and this example shows how we can create and write to one. We used the `ioutil` package which has functions for just this.

The `TempFile()` accepts a folder and a prefix. As the folder we get the os' temp directory (which would be /tmp on unix systems) and for the prefix we use a string, but if we don't want one, we just pass an empty string.

The temp files won't be removed until you say, so we use a defer call to delete the file once we're finished with it, with `os.Remove()`.

```go
package main

import (
    "io/ioutil"
    "log"
    "os"
    "fmt"
)

func main() {

    // Create our Temp File
    tmpFile, err := ioutil.TempFile(os.TempDir(), "prefix-")
    if err != nil {
        log.Fatal("Cannot create temporary file", err)
    }

    fmt.Println("Created File: " + tmpFile.Name())

    // Example writing to the file
    _, err = tmpFile.Write([]byte("This is a golangcode.com example!"))
    if err != nil {
        log.Fatal("Failed to write to temporary file", err)
    }

    // Remember to clean up the file afterwards
    defer os.Remove(tmpFile.Name())
}
```

![](/img/2018/tmp-files.png)
