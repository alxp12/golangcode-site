---
title: Part 1) Download a File (from a URL)
author: Edd Turtle
type: post
date: 2017-11-02T20:00:00+00:00
url: /download-a-file-from-a-url
categories:
  - Uncategorized
tags:
  - download
  - file
  - url
  - io
  - copy
  - stream
  - create
  - http
  - get
  - response
---

This example shows how to download a file from the web on to your local machine. By using `io.Copy()` and passing the response body directly in we stream the data to the file and avoid having to load it all into the memory - it's not a problem with small files, but it makes a difference when downloading large files.

We also have an example of [downloading large files with progress reports](/download-a-file-with-progress).

If you want to use the filename from the url, you can replace the `filepath` variable in DownloadFile with `path.Base(resp.Request.URL.String())` and import the `path` package.

```go
package main

import (
    "io"
    "net/http"
    "os"
)

func main() {

    fileUrl := "https://golangcode.com/images/avatar.jpg"

    if err := DownloadFile("avatar.jpg", fileUrl); err != nil {
        panic(err)
    }
}

// DownloadFile will download a url to a local file. It's efficient because it will
// write as it downloads and not load the whole file into memory.
func DownloadFile(filepath string, url string) error {

    // Get the data
    resp, err := http.Get(url)
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    // Create the file
    out, err := os.Create(filepath)
    if err != nil {
        return err
    }
    defer out.Close()

    // Write the body to file
    _, err = io.Copy(out, resp.Body)
    return err
}
```