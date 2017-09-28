---
title: Set a HTTP Cookie Response Header
author: Edd Turtle
type: post
date: 2017-09-28T21:35:00+00:00
url: /add-a-http-cookie
categories:
  - Uncategorized
tags:
  - http
  - cookie
  - response
  - writer
  - sessions
  - gorilla
  - date
  - expiry
  - value
---

For many different reasons, there will be times when you need to keep data within a cookie to be sent with subsequent requests or read by the recipient. We can do this with Go's standard library, or by using a package like [gorilla's session](http://www.gorillatoolkit.org/pkg/sessions), but for this simple example we'll use the standard library.

We've created a function called `addCookie()` which takes a name/key and a value to writes it directly against the ResponseWriter `w`.

```go
package main

import (
    "io"
    "net/http"
    "time"
)

// addCookie will apply a new cookie to the response of a http
// request, with the key/value this method is passed.
func addCookie(w http.ResponseWriter, name string, value string) {
    expire := time.Now().AddDate(0, 0, 1)
    cookie := http.Cookie{
        Name:    name,
        Value:   value,
        Expires: expire,
    }
    http.SetCookie(w, &cookie)
}

func indexHandler(w http.ResponseWriter, req *http.Request) {
    addCookie(w, "TestCookieName", "TestValue")
    io.WriteString(w, "Hello world!")
}

func main() {
    http.HandleFunc("/", indexHandler)
    http.ListenAndServe(":8080", nil)
}
```

If we were to run this, like so: `go run cookie.go` and then use `curl` to check the response, we would see something like this:

    < HTTP/1.1 200 OK
    < Set-Cookie: TestCookieName=TestValue; Expires=Fri, 29 Sep 2017 19:18:25 GMT
    < Date: Thu, 28 Sep 2017 19:18:25 GMT
    < Content-Length: 12
    < Content-Type: text/plain; charset=utf-8
