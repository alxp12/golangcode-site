---
title: Generating a SHA256 HMAC Hash
author: Edd Turtle
type: post
date: 2018-03-24T00:20:00+00:00
url: /generate-sha256-hmac
categories:
  - Uncategorized
tags:
  - crypto
  - sha256
  - signature
  - hash
  - key
  - secret
  - hmac
---

Generating HMACs (Keyed-Hash Message Authentication Code) are often used as a way of proving data integrity and authenticity. They involve three integrals parts, the algorithm (in our case SHA256), the secret and the data. They a used mainly because data can be checked between two parties without the sharing of the secret.

In go, there's a convenient library to help us out with this called `crypto/hmac` and we show an example of how to do this below.

```go
package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "fmt"
)

func main() {

    secret := "mysecret"
    data := "data"
    fmt.Printf("Secret: %s Data: %s\n", secret, data)

    // Create a new HMAC by defining the hash type and the key (as byte array)
    h := hmac.New(sha256.New, []byte(secret))

    // Write Data to it
    h.Write([]byte(data))

    // Get result and encode as hexadecimal string
    sha := hex.EncodeToString(h.Sum(nil))

    fmt.Println("Result: " + sha)
}
```

Example:

![Generate SHA256 signature](/img/sha256-hmac.png)
