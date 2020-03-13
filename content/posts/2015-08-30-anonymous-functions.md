---
title: Anonymous Functions (aka Closures)
author: Edd Turtle
type: post
date: 2015-08-30T10:05:07+00:00
url: /anonymous-functions/
categories:
  - Uncategorized
tags:
  - anonymous
  - closure
  - func
  - function
  - lambda
  - message
  - parameters
  - scope
---

Here is a basic example of how an anonymous function, or lambda function, can be used with Go. We're just printing a statement to screen, but it can be used for various things - one of which can be just to segment code which will only need to get run once and doesn't need to be referenced.

It also has the use case of encapsulating the variables used within itself, so only from within are you able to access a variable from within. Once the function has finished the variables can then be garbage collected. To pass data into the function we have to add it to the execution parenthesis at the end.

```go
package main

import "fmt"

func main() {

    message := "Hello golangcode.com readers!"

    func(m string) {
        fmt.Println(m)
    }(message)
}
```

![using an anonymous function in go](/img/2015/anony-func-valid.png)

This technique is especially useful in Go, because once you have this structure, you can turn it into a goroutine by simple adding the word `go` before your `func`.

**This is also possible:**

```go
package main

import "fmt"

func main() {
    message := "Hello golangcode.com readers!"
    func() {
        fmt.Println(message)
    }()
}
```

**This is *not* possible:**

```go
package main

import "fmt"

func main() {
    func() {
        message := "Hello golangcode.com readers!"
    }()
    fmt.Println(message)
}
```

![an error when using an anonymous function incorrectly](/img/2015/anony-func-invalid.png)