---
title: "Working with POST Request Data"
author: Edd Turtle
type: post
date: 2019-06-09T10:00:00+00:00
url: /handle-post-request-data
categories:
  - Uncategorized
tags:
  - http
  - post
  - request
  - data
  - form
  - param
  - contenttype
  - parse
meta_image: 2019/post-params.png
---
This is an overview post (pun intended) about how to work with post request data sent to an endpoint via HTTP. This is slightly different to data stored in query parameters sent in the url and has to be handled differently.

Because we're using a http server, we can parse the request (in variable `r`) using `ParseForm()` and then use the data from the map generated.

This will only work with data sent with a Content-Type header of `application/x-www-form-urlencode` or `multipart/form-data`. JSON is handled in a [different way](/json-decode-into-objects/).

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/", ExampleHandler)
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}

func ExampleHandler(w http.ResponseWriter, r *http.Request) {

    // Double check it's a post request being made
    if r.Method != http.MethodPost {
        w.WriteHeader(http.StatusMethodNotAllowed)
        fmt.Fprintf(w, "invalid_http_method")
        return
    }

    // Must call ParseForm() before working with data
    r.ParseForm()

    // Log all data. Form is a map[]
    log.Println(r.Form)

    // Print the data back. We can use Form.Get() or Form["name"][0]
    fmt.Fprintf(w, "Hello "+r.Form.Get("name"))
}
```

![parse post params in golang](/img/2019/post-params.png)