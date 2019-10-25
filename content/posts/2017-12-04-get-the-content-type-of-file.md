---
title: How Detect Content Type of a File
author: Edd Turtle
type: post
date: 2017-12-04T21:00:00+00:00
url: /get-the-content-type-of-file
categories:
  - Uncategorized
tags:
  - content-type
  - sniff
  - mime
  - file
  - detect
  - read
  - buffer
  - http
meta_image: 2017/mime-type.png
---

We can use the `net/http` package to find the content type, or mime type, of a file. To do this, we open the file and read the first 512 bytes (as the `DetectContentType()` function only uses the first 512 bytes, there's no point in doing more than needed). This function will then return a mime type, like `application/json` or `image/jpg` for instance.

<!--more-->

```go
package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {

	// Open File
	f, err := os.Open("golangcode.pdf")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	// Get the content
	contentType, err := GetFileContentType(f)
	if err != nil {
		panic(err)
	}

	fmt.Println("Content Type: " + contentType)
}

func GetFileContentType(out *os.File) (string, error) {

	// Only the first 512 bytes are used to sniff the content type.
	buffer := make([]byte, 512)

	_, err := out.Read(buffer)
	if err != nil {
		return "", err
	}

	// Use the net/http package's handy DectectContentType function. Always returns a valid
	// content-type by returning "application/octet-stream" if no others seemed to match.
	contentType := http.DetectContentType(buffer)

	return contentType, nil
}
```

![get content (mime) type of file](/img/2017/mime-type.png)