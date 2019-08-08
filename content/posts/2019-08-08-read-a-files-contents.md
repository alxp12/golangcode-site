---
title: Read a File to String
author: Edd Turtle
type: post
date: 2019-08-08T17:00:00+00:00
url: /read-a-files-contents
categories:
  - Uncategorized
tags:
  - file
  - read
  - content
  - text
  - string
  - ioutil
  - open
  - buffer
  - reading
meta_image: 2019/read-from-file.png
---

This is a matching post to ["Writing to a File"](/writing-to-file/) and explains how to simply get the contents of a file as text and print it to screen.

There are different ways to achieve this in Go - all valid. In this guide though we've gone for the simple approach. Using `ioutil` makes this easy for us by not having to worry about closing files or using buffers. At the cost though of not having flexibility over which parts of the file we need.

```go
package main

import (
    "fmt"
    "io/ioutil"
    "log"
)

func main() {

    // Read entire file content, giving us little control but
    // making it very simple. No need to close the file.
    content, err := ioutil.ReadFile("golangcode.txt")
    if err != nil {
        log.Fatal(err)
    }

    // Convert []byte to string and print to screen
    text := string(content)
    fmt.Println(text)
}
```

![read from a file](/img/2019/read-from-file.png)