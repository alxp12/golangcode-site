---
title: Apply Middleware to Your Route Handlers
author: Edd Turtle
type: post
date: 2018-03-30T00:20:00+00:00
url: /middleware-on-handlers
categories:
  - Uncategorized
tags:
  - middleware
  - routes
  - http
  - request
  - response
  - auth
  - api
  - key
  - handler
meta_image: 2018/middleware-auth.png
---

Middleware is a term used in many different ways within software development, but we're referring to it as a way to wrap requests and responses in simple abstracted functions which can be applied to some routes easily.

In our example below we're using an `AuthMiddleware` to check incoming requests for the correct api key and rejecting them if they don't. Another good example for this technique is applying headers to responses, if you know the content type of the response, we can set it in middleware.

```go
package main

import (
    "io"
    "net/http"
)

const (
    MyAPIKey = "MY_EXAMPLE_KEY"
)

func main() {

    // Create an example endpoint/route
    http.Handle("/", Middleware(
        http.HandlerFunc(ExampleHandler),
        AuthMiddleware,
    ))

    // Run...
    if err := http.ListenAndServe(":8080", nil); err != nil {
        panic(err)
    }
}

// Middleware (this function) makes adding more than one layer of middleware easy
// by specifying them as a list. It will run the last specified handler first.
func Middleware(h http.Handler, middleware ...func(http.Handler) http.Handler) http.Handler {
    for _, mw := range middleware {
        h = mw(h)
    }
    return h
}

// AuthMiddleware is an example of a middleware layer. It handles the request authorization
// by checking for a key in the url.
func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        requestKey := r.URL.Query().Get("key")
        if len(requestKey) == 0 || requestKey != MyAPIKey {
            // Report Unauthorized
            w.Header().Add("Content-Type", "application/json")
            w.WriteHeader(http.StatusUnauthorized)
            io.WriteString(w, `{"error":"invalid_key"}`)
            return
        }

        next.ServeHTTP(w, r)
    })
}

func ExampleHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Add("Content-Type", "application/json")
    io.WriteString(w, `{"status":"ok"}`)
}
```

Example:

![](/img/2018/middleware-auth.png)
