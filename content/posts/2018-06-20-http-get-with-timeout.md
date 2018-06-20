---
title: HTTP Get with Timeout
author: Edd Turtle
type: post
date: 2018-06-20T19:00:00+00:00
url: /http-get-with-timeout
categories:
  - Uncategorized
tags:
  - get
  - http
  - timeout
  - socket
  - error
  - download
---

We've already covered how to [download a file](/download-a-file-from-a-url/), but this post covers it a little further by specifying the maximum time attempted on the request. Adding timeouts are often important to stop your program coming to a halt.

To do this we make our own http client, giving it our custom timeout value. We can then use this client to make our requests. If a timeout is reached, the `Get()` function will return with an error. Our code is set to a very short timeout of 5 milliseconds to demo the error, but this can be set to any duration you need.

```go
package main

import (
    "net/http"
    "log"
    "time"
)

func main() {

    client := http.Client{
        Timeout: time.Duration(5 * time.Millisecond),
    }

    _, err := client.Get("https://golangcode.com")
    if err != nil {
        log.Fatal(err)
    }
}
```

![](/img/2018/http-timeout.png)
