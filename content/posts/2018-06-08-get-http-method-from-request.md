---
title: Get the HTTP Method from a Request
author: Edd Turtle
type: post
date: 2018-06-08T15:00:00+00:00
url: /get-http-method-from-request
categories:
  - Uncategorized
tags:
  - http
  - method
  - get
  - post
  - constants
  - net
  - request
---

When working with any form of http communication in Go you're going to come across scenarios where you need to know a request's method - whether it's a `GET`, `POST`, etc.

If you're writing an API with Go you'll most likely have the incoming request in the form of a `http.Request` object. This request has `Method` property which allows you to get the http method in the form of a string. Optionally, we can also use some constants to make working with these methods easier.

```go
package main

import (
    "net/http"
    "io"
)

func main() {
    // Create a basic http example to demonstrate example
    http.Handle("/", http.HandlerFunc(ExampleHandler))
    http.ListenAndServe(":8080", nil)
}

func ExampleHandler(w http.ResponseWriter, r *http.Request) {
    // This handler will run for all types of HTTP request, but we can use r.Method to 
    // determine which method is being used and validate the request based on this.
    if r.Method == http.MethodGet {
        io.WriteString(w, "This is a get request")
    } else if r.Method == http.MethodPost {
        io.WriteString(w, "This is a post request")
    } else {
        io.WriteString(w, "This is a " + r.Method + " request")
    }
}
```

![](/img/2018/http-method.png)
