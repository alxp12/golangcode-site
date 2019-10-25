---
title: Get the IP Address of a HTTP Request
author: Edd Turtle
type: post
date: 2019-10-25T19:20:00+00:00
url: /get-the-request-ip-addr
categories:
  - Uncategorized
tags:
  - request
  - http
  - ip
  - address
  - header
  - forwardedfor
  - remoteaddr
  - proxy
meta_image: 2019/get-ip-addr.png
---

This post demonstrates how to get the IP address of incoming HTTP requests in Go. As a function, it attempts to use the `X-FORWARDED-FOR` header for code behind proxies and load balancers (such as on hosts like Heroku) while falling back to the `RemoteAddr` if the header isn't found.

Just as an example, we created an echo server (of sorts) below to reply to incoming requests with the requesting ip address in json form.

```go
package main

import (
	"encoding/json"
	"net/http"
)

func main() {
	http.HandleFunc("/", ExampleHandler)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}

func ExampleHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	resp, _ := json.Marshal(map[string]string{
		"ip": GetIP(r),
	})
	w.Write(resp)
}

// GetIP gets a requests IP address by reading off the forwarded-for
// header (for proxies) and falls back to use the remote address.
func GetIP(r *http.Request) string {
	forwarded := r.Header.Get("X-FORWARDED-FOR")
	if forwarded != "" {
		return forwarded
	}
	return r.RemoteAddr
}
```

![get http request ip address](/img/2019/get-ip-addr.png)

*(ignore the `printf` - it's just keep the output tidy)*