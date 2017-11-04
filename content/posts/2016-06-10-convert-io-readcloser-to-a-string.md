---
title: Convert io.ReadCloser to a String
author: Edd Turtle
type: post
date: 2016-06-10T10:08:48+00:00
url: /convert-io-readcloser-to-a-string/
categories:
  - Uncategorized
tags:
  - buffer
  - bytes
  - closer
  - get
  - io
  - read
  - string
  - readcloser
  - convert

---
Net/http is an amazing package but there are times you need to work with the body text of the response returned from the call you just made. Many functions require a string as input so we have to convert it first by passing it through a buffer.

```go
package main

import (
    "fmt"
    "net/http"
    "bytes"
)

func main() {
    response, _ := http.Get("https://golangcode.com/")

    // The line below would fail because Body = io.ReadCloser
    // fmt.Printf(response.Body)

    // ...so we convert it to a string by passing it through 
    // a buffer first. A 'costly' but useful process.
    buf := new(bytes.Buffer)
    buf.ReadFrom(response.Body)
    newStr := buf.String()

    fmt.Printf(newStr)
}
```