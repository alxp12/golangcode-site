---
title: How to Run a Single Test
author: Edd Turtle
type: post
date: 2019-09-24T18:20:00+00:00
url: /run-one-test
categories:
  - Uncategorized
tags:
  - test
  - single
  - verbose
  - run
  - testing
  - command
  - suite
  - example
meta_image: 2019/single-test.png
---

Go has a simple command line for running its tests, with `go test`. However, often when writing tests you don't care about the rest of the test suite - you just want to run your new test. This post shows you the command you need to run just your test, as well as a full example below.

### TL;DR: use -run

```
go test -run TestSub
```

### Example:

main.go

```go
package main

import "fmt"

func main() {
    fmt.Printf("add: %d\n", add(2, 6))
    fmt.Printf("sub: %d\n", sub(2, 6))
}

func add(num1 int, num2 int) int {
    return num1 + num2
}

func sub(num1 int, num2 int) int {
    return num1 - num2
}
```

main_test.go

```go
package main

import "testing"

func TestAdd(t *testing.T) {
    result := add(2, 4)
    expected := 6
    if result != expected {
        t.Errorf("add() test returned an unexpected result: got %v want %v", result, expected)
    }
}

func TestSub(t *testing.T) {
    result := sub(2, 4)
    expected := -2
    if result != expected {
        t.Errorf("sub() test returned an unexpected result: got %v want %v", result, expected)
    }
}
```

Command: (We are running with the `-v` parameter so we can see which tests have been run.)

```
go test -v -run TestSub
```

![running a single golang test](/img/2019/single-test.png)
