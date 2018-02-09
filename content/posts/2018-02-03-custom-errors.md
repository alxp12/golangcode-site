---
title: Creating Your Own Custom Errors
author: Edd Turtle
type: post
date: 2018-02-03T10:40:00+00:00
url: /custom-error-messages
categories:
  - Uncategorized
tags:
  - errors
  - package
  - new
  - handling
  - interface
  - return
---

In Go, although errors are a controversial subject, they are in fact very simple. As programmers of Go we also spend a lot of our time writing `if err != nil`. But we often also need to create these errors and pass them back to other functions to handle.

The `errors` package allows to create errors, as per the error interface, which can be dealt with like any other error. In our example below we handle the error on `main()` and produce the error in `DoSomething()`.

```go
package main

import (
    "errors"
    "log"
)

func main() {
    // Run our function & catch any errors, we're going to report this error and exit.
    if err := DoSomeThing(); err != nil {
        log.Fatal(err)
    }
}

// DoSomething returns a type of error, these can be passed back directly from
// other functions inside this one, or created within it.
func DoSomeThing() error {
    return errors.New("Example Error, DoSomething has gone wrong!")
}
```