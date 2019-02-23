---
title: "Check If a Date/Time Has Been Set with IsZero"
author: Edd Turtle
type: post
date: 2019-02-16T09:00:00+00:00
url: /checking-if-date-has-been-set
categories:
  - Uncategorized
tags:
  - date
  - time
  - zero
  - isset
  - nil
  - timestamp
  - state
meta_image: 2019/check-zero-date.png
---

In Go, we can store and use dates using the time package and although a date in Go cannot be saved as null (because there's no such thing) there is an unset state. This unset state can be shown as `0001-01-01 00:00:00 +0000 UTC` and there's a simple way we can check if a date variable has been populated, as demonstrated below. It's also important to note that these are not unix timestamps, which go back as far as 1970, but can handle a large spectrum of dates.

```go
package main

import (
    "fmt"
    "time"
)

func main() {

    var myDate time.Time

    // IsZero returns a bool of whether a date has been set, but as the printf shows it will
    // still print a zero-based date if it hasn't been set.
    if myDate.IsZero() {
        fmt.Printf("No date has been set, %s\n", myDate)
    }

    // Demonstrating that by setting a date, IsZero now returns false
    myDate = time.Date(2019, time.February, 1, 0, 0, 0, 0, time.UTC)
    if !myDate.IsZero() {
        fmt.Printf("A date has been set, %s\n", myDate)
    }
}
```

![check is date set or not](/img/2019/check-zero-date.png)