---
title: Converting a PDF to JPG (using ImageMagick)
author: Edd Turtle
type: post
date: 2018-02-09T20:20:00+00:00
url: /convert-pdf-to-jpg
categories:
  - Uncategorized
tags:
  - Imagick
  - Image
  - Process
  - Convert
  - PDF
  - JPG
  - File
---

In the example below we use the `gographics/imagick` package as a wrapper to the C library for ImageMagick to convert our PDF into a JPG. The processes goes as follows: We use the package to load in our test file which we then process by setting the resolution, compression levels and alpha channel settings then we save the final output file. Because the library is built on C, it's important we call the `Terminate` and `Destroy` functions appropriately to keep our memory usage in check. 

This is a useful process for creating thumbnails or converting the files to show in the web browser. It is limited to the first page of the PDF at the moment though.

Prerequisites for running under Ubuntu 18.04:

```bash
sudo apt install libmagic-dev libmagickwand-dev
```

The code:

```go
package main

import (
    "log"
    "gopkg.in/gographics/imagick.v2/imagick"
)

func main() {

    pdfName := "ref.pdf"
    imageName := "test.jpg"

    if err := ConvertPdfToJpg(pdfName, imageName); err != nil {
        log.Fatal(err)
    }
}

// ConvertPdfToJpg will take a filename of a pdf file and convert the file into an 
// image which will be saved back to the same location. It will save the image as a 
// high resolution jpg file with minimal compression.
func ConvertPdfToJpg(pdfName string, imageName string) error {

    // Setup
    imagick.Initialize()
    defer imagick.Terminate()

    mw := imagick.NewMagickWand()
    defer mw.Destroy()

    // Must be *before* ReadImageFile
    // Make sure our image is high quality
    if err := mw.SetResolution(300, 300); err != nil {
        return err
    }

    // Load the image file into imagick
    if err := mw.ReadImage(pdfName); err != nil {
        return err
    }

    // Must be *after* ReadImageFile
    // Flatten image and remove alpha channel, to prevent alpha turning black in jpg
    if err := mw.SetImageAlphaChannel(imagick.ALPHA_CHANNEL_FLATTEN); err != nil {
        return err
    }

    // Set any compression (100 = max quality)
    if err := mw.SetCompressionQuality(95); err != nil {
        return err
    }

    // Select only first page of pdf
    mw.SetIteratorIndex(0)

    // Convert into JPG
    if err := mw.SetFormat("jpg"); err != nil {
        return err
    }

    // Save File
    return mw.WriteImage(imageName)
}
```

If you see an error like below, take a look at [this guide](https://alexvanderbist.com/posts/2018/fixing-imagick-error-unauthorized).

```bash
ERROR_POLICY: not authorized `TestPdf.pdf' @ error/constitute.c/ReadImage/412
```