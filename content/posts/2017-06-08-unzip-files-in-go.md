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
meta_image: 2017/unzip-files.png
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

    files, err := Unzip("done.zip", "output-folder")
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

        // Store filename/path for returning and using later on
        fpath := filepath.Join(dest, f.Name)

        // Check for ZipSlip. More Info: http://bit.ly/2MsjAWE
        if !strings.HasPrefix(fpath, filepath.Clean(dest)+string(os.PathSeparator)) {
            return filenames, fmt.Errorf("%s: illegal file path", fpath)
        }

        filenames = append(filenames, fpath)

        if f.FileInfo().IsDir() {
            // Make Folder
            os.MkdirAll(fpath, os.ModePerm)
            continue
        }

        // Make File
        if err = os.MkdirAll(filepath.Dir(fpath), os.ModePerm); err != nil {
            return filenames, err
        }

        outFile, err := os.OpenFile(fpath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
        if err != nil {
            return filenames, err
        }

        rc, err := f.Open()
        if err != nil {
            return filenames, err
        }

        _, err = io.Copy(outFile, rc)

        // Close the file without defer to close before next iteration of loop
        outFile.Close()
        rc.Close()

        if err != nil {
            return filenames, err
        }
    }
    return filenames, nil
}
```

![](/img/2017/unzip-files.png)

 [1]: https://golangcode.com/create-zip-files-in-go/