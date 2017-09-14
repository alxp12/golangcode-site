---
title: Read a CSV File into a Struct
author: Edd Turtle
type: post
date: 2017-09-14T21:40:00+00:00
url: /how-to-read-a-csv-file-into-a-struct
categories:
  - Uncategorized
tags:
  - csv
  - encoding
  - read
  - struct
  - file
---

We have a similar post on [writing data to a CSV file](/write-data-to-a-csv-file/). This post however, focuses on the simple task of taking data from a csv file and converting it into data we can work with.

The first part it to open the file, then we read it into the `lines` variable and finally we loop through the lines and we turn them into `CsvLine` objects - obviously in a real scenario we should use a more descriptive naming.

```go
package main

import (
    "encoding/csv"
    "fmt"
    "os"
)

type CsvLine struct {
    Column1 string
    Column2 string
}

func main() {

    filename := "{{ ENTER FILE }}"

    // Open CSV file
    f, err := os.Open(filename)
    if err != nil {
        panic(err)
    }
    defer f.Close()

    // Read File into a Variable
    lines, err := csv.NewReader(f).ReadAll()
    if err != nil {
        panic(err)
    }

    // Loop through lines & turn into object
    for _, line := range lines {
        data := CsvLine{
            Column1: line[0],
            Column2: line[1],
        }
        fmt.Println(data.Column1 + " " + data.Column2)
    }
}
```