---
title: Find Common Colours in an Image
author: Edd Turtle
type: post
date: 2019-07-04T13:00:00+00:00
url: /find-common-colours-in-image
categories:
  - Uncategorized
tags:
  - image
  - color
  - colours
  - common
  - dominant
  - kmeans
  - crop
  - library
meta_image: 2019/prominent-colours.png
---

This is part 1 of how to find the dominant colours within an image. You might spot this functionality around the internet, as it's used to give images background colours before the image has loaded.

We use a package to do this - which manages much of the heavy lifting. The package, called [prominentcolor](https://github.com/EdlinOrg/prominentcolor), uses the `Kmeans++` algorithm to work this out. By default, it will return us the three most popular colours after both cropping and resizing the image.

First, we load the image from file into an `Image` type. This can them be passed in to be processed. Once we have our three colours, we simply print each one to screen.

```go
package main

import (
    "fmt"
    "image"
    "log"
    "os"

    "github.com/EdlinOrg/prominentcolor"
)

func main() {

    // Step 1: Load the image
    img, err := loadImage("example.jpg")
    if err != nil {
        log.Fatal("Failed to load image", err)
    }

    // Step 2: Process it
    colours, err := prominentcolor.Kmeans(img)
    if err != nil {
        log.Fatal("Failed to process image", err)
    }

    fmt.Println("Dominant colours:")
    for _, colour := range colours {
        fmt.Println("#" + colour.AsString())
    }
}

func loadImage(fileInput string) (image.Image, error) {
    f, err := os.Open(fileInput)
    if err != nil {
        return nil, err
    }
    defer f.Close()
    img, _, err := image.Decode(f)
    return img, err
}
```

![common colours in an image](/img/2019/prominent-colours.png)