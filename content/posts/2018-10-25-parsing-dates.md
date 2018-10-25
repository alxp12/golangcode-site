---
title: Parsing Dates from a String and Formatting
author: Edd Turtle
type: post
date: 2018-10-25T20:20:00+00:00
url: /parsing-dates
categories:
  - Uncategorized
tags:
  - parse
  - time
  - format
  - string
  - reformat
  - unix
  - Ymd
---

We almost touched on this in our post about [unix time](/get-unix-time/) - but in this post we look at how to take an arbritary date in string format and converted it into a meaningful date in the format we want. This uses two important functions, `Parse` and `Format`, within the [time package](https://golang.org/pkg/time/).

The parse function is interesting because unlike some programming languages, to parse a date you don't specify the date using letters (Y-m-d for example) but use a real time, this time in fact: `2006-01-02T15:04:05+07:00`.

```go
package main

import (
    "fmt"
    "time"
)

func main() {

    // The date we're trying to parse, work with and format
    myDateString := "2018-01-20 04:35"
    fmt.Println("My Starting Date:\t", myDateString)

    // Parse the date string into Go's time object
    // The 1st param specifies the format, where the digits must follow a set structure, like below:
    // 2006-01-02T15:04:05+07:00
    myDate, err := time.Parse("2006-01-02 15:04", myDateString)
    if err != nil {
        panic(err)
    }

    // Another Example:
    // myDateString := "01-01-2018"
    // myDate, err := time.Parse("02-01-2006", myDateString)

    // Format uses the same formatting style as parse, or we can use a pre-made constant
    fmt.Println("My Date Reformatted:\t", myDate.Format(time.RFC822))
}
```

![](/img/2018/parse-date.png)
