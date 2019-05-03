---
title: "JSON Encode - Pretty Print"
author: Edd Turtle
type: post
date: 2019-05-03T18:00:00+00:00
url: /json-encode-pretty-print
categories:
  - Uncategorized
tags:
  - json
  - encode
  - pretty
  - readable
  - format
  - indent
  - prefix
  - marshal
meta_image: 2019/json-pretty-print.png
---

Is JSON for computers or humans to read? Well, hopefully with this snippet it can be for both. Instead of just dumping all the json in one line, we instead format it and indent it for readability purposes.

Using the `MarshalIndent` function in the `json` package we're able to not only specify the data to encode, but also a prefix and an indentation string. In our example we're not to worried about the prefix, but the indentation (3rd parameter) allows us to structure our code. We're using 4 spaces for each indent level, but you can pick what ever suits you.

```go
package main

import (
    "encoding/json"
    "fmt"
    "log"
)

type Game struct {
    Title       string   `json:"title"`
    Description string   `json:"description"`
    Platform    []string `json:"platform"`
}

func main() {

    myGame := Game{
        Title:       "Fifa 19",
        Description: "Football simulation game, based on UEFA players",
        Platform:    []string{"PS4"},
    }

    // For comparison, the usual way would be: j, err := json.Marshal(myGame)

    // MarshalIndent accepts:
    // 1) the data
    // 2) a prefix to place on all lines but 1st
    // 3) an indent to place before lines based on indent level

    // Print Json with indents, the pretty way:
    prettyJSON, err := json.MarshalIndent(myGame, "", "    ")
    if err != nil {
        log.Fatal("Failed to generate json", err)
    }
    fmt.Printf("%s\n", string(prettyJSON))
}
```

![check is date set or not](/img/2019/json-pretty-print.png)