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

We've created a function called `addCookie()` which takes a name, value and duration, and writes it directly against the ResponseWriter `w`.

```go
package main

import (
	"io"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/", indexHandler)
	http.ListenAndServe(":8080", nil)
}

func indexHandler(w http.ResponseWriter, req *http.Request) {
	// Create a cookie which lasts 30 mins
	addCookie(w, "TestCookieName", "TestValue", 30*time.Minute)
	// Write our example
	io.WriteString(w, "Hello world!")
}

// addCookie will apply a new cookie to the response of a http request
// with the key/value specified.
func addCookie(w http.ResponseWriter, name, value string, ttl time.Duration) {
	expire := time.Now().Add(ttl)
	cookie := http.Cookie{
		Name:    name,
		Value:   value,
		Expires: expire,
	}
	http.SetCookie(w, &cookie)
}
```

If we were to run this with `go run cookie.go` and then use `curl -I http:/localhost:8080` to check the response, we would see something like this:

	< HTTP/1.1 200 OK
	< Set-Cookie: TestCookieName=TestValue; Expires=Fri, 29 Sep 2017 19:18:25 GMT
	< Date: Thu, 28 Sep 2017 19:18:25 GMT
	< Content-Length: 12
	< Content-Type: text/plain; charset=utf-8
