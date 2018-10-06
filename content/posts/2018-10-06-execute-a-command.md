---
title: Run System Commands & Binary Files
author: Edd Turtle
type: post
date: 2018-10-06T20:30:00+00:00
url: /execute-a-command
categories:
  - Uncategorized
tags:
  - cmd
  - command
  - system
  - run
  - execute
  - output
  - binary
---

Within Go, like other languages, we have the ability to call external binaries. These allow us to do all sorts of things, but in our example we're just going to print out our go version by calling our copy (located in `/usr/local/go/bin` on my computer).

The [`Command`](https://golang.org/pkg/os/exec/#Command) function within the `os/exec` package will allow us to do this. It accepts at least one string - the name of the command/binary you're trying to run - followed by any number of strings for it's parameters.

```go
package main

import (
    "fmt"
    "log"
    "os/exec"
)

func main() {

    // Print Go Version
    cmdOutput, err := exec.Command("go", "version").Output()
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("%s", cmdOutput)
}
```

![](/img/2018/run-system-command.png)
