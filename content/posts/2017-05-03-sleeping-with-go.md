---
title: Sleeping in Go – How to Pause Execution
author: Edd Turtle
type: post
date: 2017-05-03T19:45:38+00:00
url: /sleeping-with-go/
categories:
  - Uncategorized
tags:
  - seconds
  - sleep
  - sleeping
  - time
  - unix
  - wait
  - goroutine
  - pause
meta_image: 2017/sleep-in-go.gif
---
Sleeping, or waiting in Go, is part of the [time package][1]. It's a very simple process, all you need to do is specify the duration to sleep for, which in this case is a number followed by it's unit, so `2*time.Second` means 2 seconds. This will sleep the current goroutine so other go routines will continue to run.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Printf("Current Unix Time: %v\n", time.Now().Unix())

    time.Sleep(2 * time.Second)

    fmt.Printf("Current Unix Time: %v\n", time.Now().Unix())
}
```

And here's what it looks like:

![Example of pausing execution](/img/2017/sleep-in-go.gif)

 [1]: https://golang.org/pkg/time/
