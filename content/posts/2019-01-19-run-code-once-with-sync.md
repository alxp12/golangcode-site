---
title: Run Code Once on First Load  (Concurrency Safe)
author: Edd Turtle
type: post
date: 2019-01-19T17:00:00+00:00
url: /run-code-once-with-sync
categories:
  - Uncategorized
tags:
  - concurrency
  - sync
  - once
  - do
  - mutex
  - load
  - resources
meta_image: 2019/sync-do.png
---

Using a web server as an example, there are multiple stages you can load resources. Within the `main()` function and within the handler are the obvious two - each with their own advantages and disadvantages. Within the main function can hinder the start-up time of the server, while code within the handler is run on every request.

Sometimes we want to load a resource only once and when it's first needed. This means it needs to be in the http handler. We have to be careful how we do this  though, as each time the handler is called it will be in a separate goroutine. We *could* use a global variable and if it hasn't been set (or == nil), load the resource - but this won't be safe from a concurrency point of view as you could end up running the load sequence twice.

The best way to achieve this is therefore using the `sync.Once` mutex to efficiently run code once even across goroutines. The example below should demonstrate this.

```go
package main

import (
    "fmt"
    "sync"
)

var doOnce sync.Once

func main() {
    DoSomething()
    DoSomething()
}

func DoSomething() {
    doOnce.Do(func() {
        fmt.Println("Run once - first time, loading...")
    })
    fmt.Println("Run this every time")
}
```

Screenshot of without and with the discard option:

![sync.Do - run function once](/img/2019/sync-do.png)