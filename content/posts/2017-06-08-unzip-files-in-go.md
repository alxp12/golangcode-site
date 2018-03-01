---
title: Unzip Files in Go
author: Edd Turtle
type: post
date: 2017-06-08T11:24:10+00:00
url: /unzip-files-in-go/
categories:
  - Uncategorized
tags:
  - archive
  - decompress
  - destination
  - file
  - filex
  - open
  - os
  - source
  - uncompress
  - unzip
  - zip

---
The code below is used to unzip, or decompress, a zip archive file into it&#8217;s constituent files. Because there are likely to be multiple files, it will create the files within a folder (specified with the 2nd parameter).

<!--more-->

Also, try [this code if you are wanting to create zip files][1].

This was based on code from <a href="https://stackoverflow.com/questions/20357223/easy-way-to-unzip-file-with-golang" target="_blank">here</a>.

```go
package main

import (
    "archive/zip"
    "fmt"
    "io"
    "log"
    "os"
    "path/filepath"
    "strings"
)

func main() {

    files, err := Unzip("test.zip", "output")
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("Unzipped:\n" + strings.Join(files, "\n"))
}

// Unzip will decompress a zip archive, moving all files and folders 
// within the zip file (parameter 1) to an output directory (parameter 2).
func Unzip(src string, dest string) ([]string, error) {

    var filenames []string

    r, err := zip.OpenReader(src)
    if err != nil {
        return filenames, err
    }
    defer r.Close()

    for _, f := range r.File {

        rc, err := f.Open()
        if err != nil {
            return filenames, err
        }
        defer rc.Close()

        // Store filename/path for returning and using later on
        fpath := filepath.Join(dest, f.Name)
        filenames = append(filenames, fpath)

        if f.FileInfo().IsDir() {

            // Make Folder
            os.MkdirAll(fpath, os.ModePerm)

        } else {

            // Make File
            if err = os.MkdirAll(filepath.Dir(fpath), os.ModePerm); err != nil {
                return filenames, err
            }

            outFile, err := os.OpenFile(fpath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
            if err != nil {
                return filenames, err
            }

            _, err = io.Copy(outFile, rc)

            // Close the file without defer to close before next iteration of loop
            outFile.Close()

            if err != nil {
                return filenames, err
            }

        }
    }
    return filenames, nil
}
```

 [1]: https://golangcode.com/create-zip-files-in-go/