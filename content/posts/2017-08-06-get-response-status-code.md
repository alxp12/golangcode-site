---
title: HTTP Response Status Codes
author: Edd Turtle
type: post
date: 2017-08-06T14:00:00+00:00
url: /get-the-http-response-status-code/
categories:
  - Uncategorized
tags:
  - net
  - http
  - response
  - status
  - code
  - error-handling
  - constant
  - StatusText
---

When making http requests with Go it is almost always necessary to check the status code of the response which is returned. Generally, if the status code is between 200 and 300 you can treat as successful. But anything except a 200-300 status, we often need to handle.

Go has many built methods to help us with this. For example, we can use `http.StatusText()` to convert the status code to it's human readable name. Likewise, if we need to reference a http status code Go has constants for them, so we could say `if resp.StatusCode == http.StatusNotFound`.

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    resp, err := http.Get("https://golangcode.com")
    if err != nil {
        log.Fatal(err)
    }

    // Print the HTTP Status Code and Status Name
    fmt.Println("HTTP Response Status:", resp.StatusCode, http.StatusText(resp.StatusCode))

    if resp.StatusCode >= 200 && resp.StatusCode <= 299 {
        fmt.Println("HTTP Status is in the 2xx range")
    } else {
        fmt.Println("Argh! Broken")
    }
}
```

![Get the status code of a http request](/img/2017/response-http-status.png)
