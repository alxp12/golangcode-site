---
title: "Basic Docker Setup for HTTP Server (using docker-compose)"
author: Edd Turtle
type: post
date: 2019-02-24T13:00:00+00:00
url: /basic-docker-setup
categories:
  - Uncategorized
tags:
  - docker
  - compose
  - container
  - project
  - server
  - dockerfile
  - port
  - build
meta_image: 2019/basic-docker.gif
---

There are many guides on how to setup a docker container running Go, but the aim of this post is to provide a basic starting point - as often they become complicated and split across many files. It's also aimed at getting it running locally for development purposes quickly, so it might not be production ready.

To begin with we create a basic http server, which just says `status: ok` on the root endpoint. We then create a `Dockerfile` and `docker-compose.yml` to define how the container should be built.

### Example Go HTTP Server: main.go

```go
package main

import (
    "io"
    "log"
    "net/http"
    "os"
)

func main() {

    http.HandleFunc("/", ExampleHandler)

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    log.Println("** Service Started on Port " + port + " **")
    if err := http.ListenAndServe(":"+port, nil); err != nil {
        log.Fatal(err)
    }
}

func ExampleHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Add("Content-Type", "application/json")
    io.WriteString(w, `{"status":"ok"}`)
}
```

### Dockerfile

```
FROM golang:1.11.5

ENV APP_NAME myproject
ENV PORT 8080

COPY . /go/src/${APP_NAME}
WORKDIR /go/src/${APP_NAME}

RUN go get ./
RUN go build -o ${APP_NAME}

CMD ./${APP_NAME}

EXPOSE ${PORT}
```

### docker-compose.yml

```
version: '3'
services:
  web:
    build: .
    ports:
     - "8080:8080"
```

Once we're all setup, we can use docker-compose to get us up and running. Note that this implementation doesn't have any form of live reload, so any changes made you'll need to stop the current container and rebuild on up with the command below.

```bash
docker-compose up --build
```

Once everything is set correctly, it should be all running and look like this:

![basic docker setup](/img/2019/basic-docker.gif)