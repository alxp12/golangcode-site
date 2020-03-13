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
meta_image: 2018/parse-date-2.png
---

We almost touched on this in our post about [unix time](/get-unix-time/) - but in this post we look at how to take an arbitrary date in string format and convert it into a meaningful date in the format we want. This uses two important functions, `Parse` and `Format` within the [time package](https://golang.org/pkg/time/).

The parse function is interesting because, unlike some programming languages, to parse a date you don't specify the date using letters (Y-m-d for example). Instead you use a real time as the format - this time in fact: `2006-01-02T15:04:05+07:00`.

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
	// The 1st param specifies the format, 2nd is our date string
	myDate, err := time.Parse("2006-01-02 15:04", myDateString)
	if err != nil {
		panic(err)
	}

	// Format uses the same formatting style as parse, or we can use a pre-made constant
	fmt.Println("My Date Reformatted:\t", myDate.Format(time.RFC822))

	// In Y-m-d
	fmt.Println("Just The Date:\t\t", myDate.Format("2006-01-02"))
}
```

![parsing dates example](/img/2018/parse-date-2.png)

Some existing date constants include:

| Name (Constant) | Format |
| --- | --- |
| RFC822 | 02 Jan 06 15:04 MST |
| RFC850 | Monday, 02-Jan-06 15:04:05 MST |
| RFC1123 | Mon, 02 Jan 2006 15:04:05 MST |
| RFC3339 | 2006-01-02T15:04:05Z07:00 |
| RFC3339Nano | 2006-01-02T15:04:05.999999999Z07:00 |

To use the MySQL date format, you'd use: "2006-01-02 15:04:05"