---
title: Generate a PDF in Go
author: Edd Turtle
type: post
date: 2019-09-19T18:30:00+00:00
url: /generate-a-pdf
categories:
  - Uncategorized
tags:
  - pdf
  - generate
  - fpdf
  - text
  - images
  - a4
  - font
  - page
  - coordinates
meta_image: 2019/generate-pdf.png
---

We have already covered pdf generation to some degree, by [using `wkhtmltopdf` on AWS' Lambda service](/lambda-pdf-generator-from-s3/). This post is about generating pdfs without needing wkhtml - by building the pdf from Go itself. To do this we use a library called [`gofpdf`](https://github.com/jung-kurt/gofpdf) to build the pdf.

It quite straightforward for simple documents, but gets more complicated the more you add to it. In our example we add some text as a title and an image just beneath it. Finally call `OutputFileAndClose()` to save the pdf to file - a screenshot of our example is shown below.

To Install:

```bash
go get github.com/jung-kurt/gofpdf
```

Code:

```go
package main

import (
    "github.com/jung-kurt/gofpdf"
)

func main() {
    err := GeneratePdf("hello.pdf")
    if err != nil {
        panic(err)
    }
}

// GeneratePdf generates our pdf by adding text and images to the page
// then saving it to a file (name specified in params).
func GeneratePdf(filename string) error {

    pdf := gofpdf.New("P", "mm", "A4", "")
    pdf.AddPage()
    pdf.SetFont("Arial", "B", 16)

    // CellFormat(width, height, text, border, position after, align, fill, link, linkStr)
    pdf.CellFormat(190, 7, "Welcome to golangcode.com", "0", 0, "CM", false, 0, "")

    // ImageOptions(src, x, y, width, height, flow, options, link, linkStr)
    pdf.ImageOptions(
        "avatar.jpg",
        80, 20,
        0, 0,
        false,
        gofpdf.ImageOptions{ImageType: "JPG", ReadDpi: true},
        0,
        "",
    )

    return pdf.OutputFileAndClose(filename)
}
```

![how to generate a pdf with go](/img/2019/generate-pdf.png)

For more information and available methods, see the [library's documentation](https://godoc.org/github.com/jung-kurt/gofpdf).