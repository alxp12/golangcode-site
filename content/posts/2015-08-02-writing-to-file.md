---
title: Writing to a File
author: Edd Turtle
type: post
date: 2015-08-02T11:50:20+00:00
url: /writing-to-file/
categories:
  - Uncategorized
tags:
  - close
  - create
  - defer
  - file
  - log
  - writestring
  - os
  - fsync
  - write
meta_image: 2015/write-to-file.png
---
Often it's very useful being able to write to a file from a program for logging purposes, saving results or as a data store. This is a little snippet on how to write text/data to a file.

We use the `os` package to create the file, exiting the program and logging if it can't do this and printing a string into the file using [`io.WriteString`](https://golang.org/pkg/io/#WriteString). We're also using defer to close the file access once the function has finished running (which is a really neat way of remembering to close files). With a final file sync on close to prevent any un-caught errors ([see this post for info](https://www.joeshaw.org/dont-defer-close-on-writable-files/)).

```go
package main

import (
    "io"
    "log"
    "os"
)

func main() {
    err := WriteToFile("result.txt", "Hello Readers of golangcode.com\n")
    if err != nil {
        log.Fatal(err)
    }
}

// WriteToFile will print any string of text to a file safely by
// checking for errors and syncing at the end.
func WriteToFile(filename string, data string) error {
    file, err := os.Create(filename)
    if err != nil {
        return err
    }
    defer file.Close()

    _, err = io.WriteString(file, data)
    if err != nil {
        return err
    }
    return file.Sync()
}
```


![Write Text to File in Go](/img/2015/write-to-file.png)