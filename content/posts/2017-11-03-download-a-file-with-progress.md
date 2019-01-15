---
title: Part 2) Download Large Files with Progress Reports
author: Edd Turtle
type: post
date: 2017-11-03T20:05:00+00:00
url: /download-a-file-with-progress
categories:
  - Uncategorized
tags:
  - writer
  - file
  - url
  - io
  - copy
  - stream
  - teereader
  - progress
meta_image: download-file-example.gif
---

We've already covered [basic downloading of files](/download-a-file-from-a-url/) - this post goes beyond that to create a more complete downloader by including progress reporting of the download. This means if you're pulling down large files you are able to see how the download's going.

In our basic example we pass the response body into `io.Copy()` but if we use a `TeeReader` we can pass our counter to keep track of the progress.

We also save the file as a temporary file while downloading so we don't overwrite a valid file until the file is fully downloaded.

```go
package main

import (
	"fmt"
	"github.com/dustin/go-humanize"
	"io"
	"net/http"
	"os"
	"strings"
)

// WriteCounter counts the number of bytes written to it. It implements to the io.Writer
// interface and we can pass this into io.TeeReader() which will report progress on each
// write cycle.
type WriteCounter struct {
	Total uint64
}

func (wc *WriteCounter) Write(p []byte) (int, error) {
	n := len(p)
	wc.Total += uint64(n)
	wc.PrintProgress()
	return n, nil
}

func (wc WriteCounter) PrintProgress() {
	// Clear the line by using a character return to go back to the start and remove
	// the remaining characters by filling it with spaces
	fmt.Printf("\r%s", strings.Repeat(" ", 35))

	// Return again and print current status of download
	// We use the humanize package to print the bytes in a meaningful way (e.g. 10 MB)
	fmt.Printf("\rDownloading... %s complete", humanize.Bytes(wc.Total))
}

func main() {
	fmt.Println("Download Started")

	fileUrl := "https://upload.wikimedia.org/wikipedia/commons/d/d6/Wp-w4-big.jpg"
	err := DownloadFile("avatar.jpg", fileUrl)
	if err != nil {
		panic(err)
	}

	fmt.Println("Download Finished")
}

// DownloadFile will download a url to a local file. It's efficient because it will
// write as it downloads and not load the whole file into memory. We pass an io.TeeReader
// into Copy() to report progress on the download.
func DownloadFile(filepath string, url string) error {

	// Create the file, but give it a tmp file extension, this means we won't overwrite a
	// file until it's downloaded, but we'll remove the tmp extension once downloaded.
	out, err := os.Create(filepath + ".tmp")
	if err != nil {
		return err
	}
	defer out.Close()

	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Create our progress reporter and pass it to be used alongside our writer
	counter := &WriteCounter{}
	_, err = io.Copy(out, io.TeeReader(resp.Body, counter))
	if err != nil {
		return err
	}

	// The progress use the same line so print a new line once it's finished downloading
	fmt.Print("\n")

	err = os.Rename(filepath+".tmp", filepath)
	if err != nil {
		return err
	}

	return nil
}
```

This will output:

```bash
$ go run download-file.go 
Download Started
Downloading... 111 MB complete     
Download Finished
```

And here's what it looks like:

![Example on the file downloader](/img/download-file-example.gif)
