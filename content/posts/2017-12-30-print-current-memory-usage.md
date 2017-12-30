---
title: Print The Current Memory Usage
author: Edd Turtle
type: post
date: 2017-12-30T12:45:00+00:00
url: /print-the-current-memory-usage
categories:
  - Uncategorized
tags:
  - memory
  - ram
  - usage
  - monitoring
  - state
  - runtime
  - heap
  - alloc
  - memstats
---

The program below is designed to print out the current state of how much memory is being used, how much has been used and how much the system has reserved. You only really need the `PrintMemUsage()` function to do this, the rest of the `main()` is there to illustrate it working (with a gif showing this at the end of this post).

The most important figure if often the `Alloc` which is the amount allocated heap objects. Our example also illustrates that the `Alloc` memory is not reduced necessarily when a variable is cleared, but when the garbage collector runs.

```go
package main

import (
    "runtime"
    "fmt"
    "time"
)

func main() {
    // Below is an example of using our PrintMemUsage() function
    // Print our starting memory usage (should be around 0mb)
    PrintMemUsage()

    var overall [][]int
    for i := 0; i<4; i++ {

        // Allocate memory using make() and append to overall (so it doesn't get 
        // garbage collected). This is to create an ever increasing memory usage 
        // which we can track. We're just using []int as an example.
        a := make([]int, 0, 999999)
        overall = append(overall, a)

        // Print our memory usage at each interval
        PrintMemUsage()
        time.Sleep(time.Second)
    }

    // Clear our memory and print usage, unless the GC has run 'Alloc' will remain the same
    overall = nil
    PrintMemUsage()

    // Force GC to clear up, should see a memory drop
    runtime.GC()
    PrintMemUsage()
}

// PrintMemUsage outputs the current, total and OS memory being used. As well as the number 
// of garage collection cycles completed.
func PrintMemUsage() {
        var m runtime.MemStats
        runtime.ReadMemStats(&m)
        // For info on each, see: https://golang.org/pkg/runtime/#MemStats
        fmt.Printf("Alloc = %v MiB", bToMb(m.Alloc))
        fmt.Printf("\tTotalAlloc = %v MiB", bToMb(m.TotalAlloc))
        fmt.Printf("\tSys = %v MiB", bToMb(m.Sys))
        fmt.Printf("\tNumGC = %v\n", m.NumGC)
}

func bToMb(b uint64) uint64 {
    return b / 1024 / 1024
}
```

Example:

![Example of Measuring Function Execution Time](/img/print-memory-usage.gif)