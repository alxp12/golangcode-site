---
title: Hello world! How to Start any Go Application
author: Edd Turtle
type: post
date: 2015-07-30T19:23:08+00:00
url: /hello-world/
categories:
  - Uncategorized
tags:
  - echo
  - fmt
  - go
  - golang
  - hello world
  - print

---
This is a simple first version of any go application &#8211; The famous _Hello World_.

Using the format library and a c-style printf function to output a string to screen.

```go
package main

import (
    "fmt"
)

func main() {
    fmt.Printf("Hello World")
}
```