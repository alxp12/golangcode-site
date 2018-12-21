---
title: Create a Basic HTTPS Server (using TLS)
author: Edd Turtle
type: post
date: 2018-12-21T16:20:00+00:00
url: /basic-https-server-with-certificate
categories:
  - Uncategorized
tags:
  - https
  - tls
  - certificates
  - self-sign
  - rsa
  - sha
  - server
  - connection
---

This post isn't about the benefits or why you should be using https, instead it's just about how to setup and use it with a basic Go web server. Compared with a basic http server there are two main differences. Firstly we need to generate some certificates and secondly we need to change our code to use the certificates and communicate over a TLS connection.

**Step 1: Commands to make self-signed certificates**

```
openssl genrsa -out https-server.key 2048
```

```
openssl ecparam -genkey -name secp384r1 -out https-server.key
```

Finally self-sign the certificate and specify information like country, name and email:

```
openssl req -new -x509 -sha256 -key https-server.key -out https-server.crt -days 3650
```

**Step 2: Update our Go Code**

```go
package main

import (
    "io"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/", ExampleHandler)

    log.Println("** Service Started on Port 8080 **")

    // Use ListenAndServeTLS() instead of ListenAndServe() which accepts two extra parameters. 
    // We need to specify both the certificate file and the key file (which we've named 
    // https-server.crt and https-server.key).
    err := http.ListenAndServeTLS(":8080", "https-server.crt", "https-server.key", nil);
    if err != nil {
        log.Fatal(err)
    }
}

func ExampleHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Add("Content-Type", "application/json")
    io.WriteString(w, `{"status":"ok"}`)
}
```

**Note:** remember to actually connect to it over https, e.g. [https://localhost:8080](https://localhost:8080)