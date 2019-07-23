---
title: Timeout a Function Call (with Goroutines & Channels)
author: Edd Turtle
type: post
date: 2019-07-23T17:00:00+00:00
url: /timing-out-a-goroutine
categories:
  - Uncategorized
tags:
  - goroutine
  - channel
  - timeout
  - time
  - seconds
  - select
  - after
  - kill
  - execution
meta_image: 2019/timeout-goroutine.png
---

Some applications and programs can be very time sensitive - and they often need to return something in a timely fashion. However, it's not always within our control to set a cut off point these operations. Go makes this process somewhat easier though through it's use of goroutines and channels.

In the example below we execute `LongRunningProcess` which we've given 3 seconds complete - but it contains code to sleep for 5, so it will never complete. We manage this by using a `select` to listen on multiple channels, one we've created for our function and another one for our timeout.

```go
package main

import (
    "fmt"
    "time"
)

func main() {

    c1 := make(chan string, 1)

    // Run your long running function in it's own goroutine and pass back it's
    // response into our channel.
    go func() {
        text := LongRunningProcess()
        c1 <- text
    }()

    // Listen on our channel AND a timeout channel - which ever happens first.
    select {
    case res := <-c1:
        fmt.Println(res)
    case <-time.After(3 * time.Second):
        fmt.Println("out of time :(")
    }

}

func LongRunningProcess() string {
    time.Sleep(5 * time.Second)
    return "My golangcode.com example is finished :)"
}
```

![timeout a goroutine](/img/2019/timeout-goroutine.png)