---
title: Encode and Decode Strings using Base 64
author: Edd Turtle
type: post
date: 2018-06-30T12:00:00+00:00
url: /base-64-encode-decode
categories:
  - Uncategorized
tags:
  - encoding
  - base64
  - data
  - strings
  - transfer
  - serialize
  - decode
---

The example below shows to how to encode and then subsequently decode a string using [base 64](https://en.wikipedia.org/wiki/Base64). Doing this has many uses, one of which to safely encode byte data in structures like JSON.

We use the [`encoding/base64`](https://golang.org/pkg/encoding/base64/) package to do this, which takes in and returns a byte array into it's `EncodeToString` and `DecodeString` methods.

```go
package main

import (
    "encoding/base64"
    "fmt"
)

func main() {

    myString := "This is golangcode.com testing base 64!"

    // Encode
    encodedString := base64.StdEncoding.EncodeToString([]byte(myString))
    fmt.Printf("Encoded: %s\n", encodedString)

    // Decode
    raw, err := base64.StdEncoding.DecodeString(encodedString)
    if err != nil {
        panic(err)
    }

    fmt.Printf("Decoded: %s\n", raw)
}
```

![](/img/2018/base64.png)
