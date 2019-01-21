---
title: Add Line Numbers to Log Output
author: Edd Turtle
type: post
date: 2017-02-05T09:07:44+00:00
url: /add-line-numbers-to-log-output/
tags:
  - debug
  - example
  - flags
  - line
  - log
  - logging
  - numbers
  - output
meta_image: 2017/logging-with-line-nums.png
---

Many programming languages allow you to print the line number of when and where something has happened. This is very useful for debugging a problem when it has occurred. By default in Go this is off, but you can turn it on when logging by setting flags.

```go
package main

import "log"

func main() {

    // Enable line numbers in logging
    log.SetFlags(log.LstdFlags | log.Lshortfile)

    // Will print: "[date] [time] [filename]:[line]: [text]"
    log.Println("Logging w/ line numbers on golangcode.com")
}
```

![logging in golang with line numbers](/img/2017/logging-with-line-nums.png)