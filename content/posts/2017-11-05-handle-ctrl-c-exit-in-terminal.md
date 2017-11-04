---
title: Handle Ctrl+C (Signal Interrupt) Close in the Terminal
author: Edd Turtle
type: post
date: 2017-11-05T10:00:00+00:00
url: /handle-ctrl-c-exit-in-terminal
categories:
  - Uncategorized
tags:
  - os
  - signal
  - interrupt
  - sigterm
  - sigint
  - goroutine
  - channel
  - ctrl+c
---

When running a Go program in the terminal, your program could receive a signal interrupt from the OS for any number of reasons. One of which is if the user presses `Ctrl+C` on their keyboard (or whatever your operating system/terminal is set to). We can execute some code when this interrupt is received, mainly to clean up and reset what we were working on.

In our example we use a `goroutine` to listen for the interrupt from `signal.Notify()` and execute our clean up code when one is sent.

```go
package main

import (
    "fmt"
    "os"
    "os/signal"
    "syscall"
    "time"
)

const FILE_NAME = "go-example.txt"

func main() {

    // Setup our Ctrl+C handler
    SetupCloseHandler()

    // Run our program... We create a file to clean up then sleep
    CreateFile()
    for {
        fmt.Println("- Sleeping")
        time.Sleep(10 * time.Second)
    }
}

// SetupCloseHandler creates a 'listener' on a new goroutine which will notify the 
// program if it receives an interrupt from the OS. We then handle this by calling 
// our clean up procedure and exiting the program.
func SetupCloseHandler() {
    c := make(chan os.Signal, 2)
    signal.Notify(c, os.Interrupt, syscall.SIGTERM)
    go func() {
        <-c
        fmt.Println("\r- Ctrl+C pressed in Terminal")
        DeleteFiles()
        os.Exit(0)
    }()
}

// Used to simulate a 'clean up' function to run on shutdown. Because it's
// just an example it doesn't have any error handling.
func DeleteFiles() {
    fmt.Println("- Run Clean Up - Delete Our Example File")
    _ = os.Remove(FILE_NAME)
    fmt.Println("- Good bye!")
}

// Create a file so we have something to clean up when we close our program.
func CreateFile() {
    fmt.Println("- Create Our Example File")
    file, _ := os.Create(FILE_NAME)
    defer file.Close()
}
```

This will output:

```bash
$ go run sigint.go 
- Create Our Example File
- Sleeping
- Ctrl+C pressed in Terminal
- Run Clean Up - Delete Our Example File
- Good bye!
```

And here's what it looks like:

![Example of using Ctrl+C to Exit](/img/handle-ctrl-c-example.gif)