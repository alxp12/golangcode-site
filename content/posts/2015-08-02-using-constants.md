---
title: Using Constants
author: Edd Turtle
type: post
date: 2015-08-02T11:22:13+00:00
url: /using-constants/
categories:
  - Uncategorized
tags:
  - block
  - compile
  - const
  - constants
  - declaration
  - fmt
  - println
  - var
  - variables

---
Using constants can often be more efficient than using variables where possible because any references to the constant will be replaced at compile time, where as a variable would have memory allocated to it and can be changed. Using a defined constant is very similar to using a variable and can be declared as a block outside of a function (usually at the top of a file) - a little like your `import`.

```go
package main

import "fmt"

const (
    MESSAGE = "Hello Readers"
    URL     = "http://golangcode.com"
)

func main() {
    // Will output "Hello Readers of http://golangcode.com"
    fmt.Println(MESSAGE + " of " + URL)
}
```