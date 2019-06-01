---
title: Create Zip Files in Go
author: Edd Turtle
type: post
date: 2017-06-08T10:51:35+00:00
url: /create-zip-files-in-go/
categories:
  - Uncategorized
tags:
  - archive
  - compression
  - create
  - deflate
  - file
  - files
  - os
  - writer
  - zip
  - zipping
meta_image: 2017/create-zip.png
---
The code below shows how you can create a zip archive after being passed a number of files to compress. This is useful for both bundling files together and creating smaller file sizes.

The basics of it are to create the initial zip file then cycle through each file and add it to the archive using a zip writer, being sure to specify the deflate method to get better compression.

Also, try [this code if you are unzipping files][1].

Initially based on <a href="https://www.socketloop.com/tutorials/zip-compress-file-in-go" target="_blank">this code</a>. There&#8217;s also the <a href="https://golang.org/pkg/archive/zip/" target="_blank">docs for archive/zip</a>.

```go
package main

import (
    "archive/zip"
    "fmt"
    "io"
    "os"
)

func main() {

    // List of Files to Zip
    files := []string{"example.csv", "data.csv"}
    output := "done.zip"

    if err := ZipFiles(output, files); err != nil {
        panic(err)
    }
    fmt.Println("Zipped File:", output)
}

// ZipFiles compresses one or many files into a single zip archive file.
// Param 1: filename is the output zip file's name.
// Param 2: files is a list of files to add to the zip.
func ZipFiles(filename string, files []string) error {

    newZipFile, err := os.Create(filename)
    if err != nil {
        return err
    }
    defer newZipFile.Close()

    zipWriter := zip.NewWriter(newZipFile)
    defer zipWriter.Close()

    // Add files to zip
    for _, file := range files {
        if err = AddFileToZip(zipWriter, file); err != nil {
            return err
        }
    }
    return nil
}

func AddFileToZip(zipWriter *zip.Writer, filename string) error {

    fileToZip, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer fileToZip.Close()

    // Get the file information
    info, err := fileToZip.Stat()
    if err != nil {
        return err
    }

    header, err := zip.FileInfoHeader(info)
    if err != nil {
        return err
    }

    // Using FileInfoHeader() above only uses the basename of the file. If we want
    // to preserve the folder structure we can overwrite this with the full path.
    header.Name = filename

    // Change to deflate to gain better compression
    // see http://golang.org/pkg/archive/zip/#pkg-constants
    header.Method = zip.Deflate

    writer, err := zipWriter.CreateHeader(header)
    if err != nil {
        return err
    }
    _, err = io.Copy(writer, fileToZip)
    return err
}
```

![](/img/2017/create-zip.png)

 [1]: https://golangcode.com/unzip-files-in-go/