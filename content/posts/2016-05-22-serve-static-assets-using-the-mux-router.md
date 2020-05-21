---
title: Serve Static Assets (using the Mux Router)
author: Edd Turtle
type: post
date: 2016-05-22T11:54:24+00:00
url: /serve-static-assets-using-the-mux-router/
categories:
  - Uncategorized
tags:
  - assets
  - css
  - dir
  - file
  - handler
  - images
  - img
  - js
  - mux
  - router
  - serve
  - server
  - static
meta_image: 2016/static-assets.png
---
Using a router is great when passing off incoming requests to functions to handle and return data. Often though, you just want to serve an entire directory and make everything inside it public. This is useful for images, styles and javascript. 

In this example we're using the [Gorilla mux router](https://github.com/gorilla/mux) ("HTTP request multiplexer") and we have setup a new route for the entire directory. We're using `static` as the folder name to serve, which we pass to our `FileServer()` as a new route on the router.

```go
package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	router := NewRouter()
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatal("ListenAndServe Error: ", err)
	}
}

func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)

	// Choose the folder to serve
	staticDir := "/static/"

	// Create the route
	router.
		PathPrefix(staticDir).
		Handler(http.StripPrefix(staticDir, http.FileServer(http.Dir("."+staticDir))))

	return router
}
```

![serve static assets](/img/2016/static-assets.png)

### Without gorilla/mux

Although this post is tailored towards when you are using the gorilla mux router, it's also good to know how to do it the default stdlib way (it's actually very similar). The code below should result in the same out come as the example above.

```go
package main

import (
	"log"
	"net/http"
)

func main() {

	staticDir := "/static/"
	http.Handle(staticDir, http.StripPrefix(staticDir, http.FileServer(http.Dir("."+staticDir))))

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe Error: ", err)
	}
}
```