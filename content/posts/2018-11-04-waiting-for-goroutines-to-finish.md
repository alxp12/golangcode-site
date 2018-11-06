---
title: Waiting for Goroutines to Finish with a WaitGroup
author: Edd Turtle
type: post
date: 2018-11-04T19:20:00+00:00
url: /waiting-for-goroutines-to-finish
categories:
  - Uncategorized
tags:
  - sync
  - concurrency
  - goroutine
  - wait
  - done
  - finish
  - time
  - reference
---

One of the (many) positives of Go is it's simple but powerful use of concurrency. By using keywords like `go` we're able to run functions in parallel. As easy as this is, we often need a way to run our next bit of code once all these goroutines have finished. That's where a `WaitGroup` comes in. 

A `WaitGroup` allows you to specify how many goroutines have been created then wait for them to all be done. This is much more efficient than waiting, for example, 2 seconds for it to complete. In our example below we create 3 goroutines within a loop and wait for them to be complete.

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {

    total := 3

    // Create the waitgroup and add the total number of goroutines we're going to use
    var wg sync.WaitGroup
    wg.Add(total)

    for i := 1; i <= total; i++ {
        // Spin off the goroutine and pass the waitgroup by reference (not value!)
        go longConcurrentProcess(i, &wg)
    }

    // Wait for all goroutines to be finished
    wg.Wait()
    fmt.Println("Finished")
}

func longConcurrentProcess(sleep int, wg *sync.WaitGroup) {

    // Call Done() using defer as it's be easiest way to guarantee it's called at every exit
    defer wg.Done()

    time.Sleep(time.Duration(sleep) * time.Second)
    fmt.Println("Sleeping for", sleep, "seconds")
}
```

![](/img/2018/waitgroup.png)
