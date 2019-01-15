---
title: Disable Log Output During Tests
author: Edd Turtle
type: post
date: 2019-01-14T20:20:00+00:00
url: /disable-log-output-during-tests
categories:
  - Uncategorized
tags:
  - tests
  - log
  - discard
  - disable
  - output
  - TestMain
  - testing
  - assert
  - ioutil
meta_image: 2019/test-without-log.png
---

It's quite common to use the `log` package within your code to keep track of things which the end user might not need to see, like deprecated notices and warnings. These are great when they are in production and you are monitoring the logs - but they will show up during your tests.

Below is an example test for our example application (even further below) which just asserts that the result of the function is 5. But this same function call also uses log.

To disregard the logs for these tests we use the [`TestMain`](https://golang.org/pkg/testing/#hdr-Main) function, set the logging output to discard then run our tests by calling run.

```go
package main

import (
  "testing"
  "log"
  "io/ioutil"
)

// SETUP
// Importantly you need to call Run() once you've done what you need
func TestMain(m *testing.M) {
  log.SetOutput(ioutil.Discard)
  m.Run()
}

func TestDoAndLogSomething(t *testing.T) {
  // Basic Test Example
  if result := DoAndLogSomething(); result != 5 {
    t.Errorf("TestDoAndLogSomething returned an unexpected number: got %v want %v", result, 5)
  }
}
```

Our Example Application:

```go
package main

import "log"

func main() {
  DoAndLogSomething()
}

func DoAndLogSomething() int {
  log.Println("Hello GoLangCode.com")
  return 5
}
```

Screenshot of without and with the discard option:

![](/img/2019/test-without-log.png)