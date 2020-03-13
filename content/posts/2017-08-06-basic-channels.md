---
title: Passing Data between Go Routines with Channels
author: Edd Turtle
type: post
date: 2017-08-06T13:00:00+00:00
url: /basic-channels/
categories:
  - Uncategorized
tags:
  - goroutine
  - channel
  - chan
  - concurrency
  - parallelism
  - syncronization
  - make
meta_image: 2017/pass-data-back-from-channel.png
---

Go, as a language, makes it very easy to work in parallel on data through its use of go routines (more info on [go routines here](/basic-go-routines-threading/)). However, one of the tricky parts about using go routines is a) to know when they are finished and b) to pass data back from the go routine. Channels make both of these things possible.

In this post we're only going to look at a basic use case of channels. In the code below we ask the `work()` function to run on a separate go routine and when it's finished pass back the string 'done' - which will then be printed to screen.

```go
package main

import (
    "fmt"
)

func main() {

    messages := make(chan string)

    go work(messages)

    msg := <-messages
    fmt.Println("Channel running on", msg)
}

func work(messages chan<- string) {
    messages <- "golangcode.com"
}
```

You'll notice that channels are defined with the `chan` keyword and can be made with `make()`.

In this example, the work function also explicitly states which way the channel it expects will send data. So `chan<-` will accept data passed into it, and `<-chan` will expect a channel to pass data out of.

![passing data back from a channel in go](/img/2017/pass-data-back-from-channel.png)

### Syncronization

In exactly the same way we can achieve syncronization between go routines by using a channel but only sending back a bool to say it's complete.

```go
package main

import (
    "fmt"
    "time"
)

func main() {

    isDone := make(chan bool, 1)

    go work(isDone)

    <-isDone
    fmt.Println("Finished")
}

func work(isDone chan bool) {
    fmt.Println("Working...")
    time.Sleep(time.Second)
    isDone <- true
}
```

![sync go routines with channels](/img/2017/routine-sync-with-channel.gif)