---
title: "Convert Interface to Type: Type Assertion"
author: Edd Turtle
type: post
date: 2019-01-28T11:00:00+00:00
url: /convert-interface-to-number
categories:
  - Uncategorized
tags:
  - type
  - assertion
  - error
  - check
  - interface
  - convert
  - operation
meta_image: 2019/type-assertion.png
---

If you've ever come across messages like these, you'll no doubt have used type assertion already. This is a post explain how and why to use it.

```bash
cannot convert result (type interface {}) to type float64: need type assertion
```

```bash
invalid operation: myInt += 5 (mismatched types interface {} and int)
```

Functions and packages will at times return `interface{}` as a type because the type would be unpredictable or unknown to them. Returning interface allows them to pass data around without know it's type. 

Not knowing the variable's true type however means that later down the line, many calls on this data won't work - like the `+=` operation in our example below. So we type assert it by placing the type in brackets after the variable name.

```go
package main

import "fmt"

func main() {
    result := ReturnData()

    // int(result) wouldn't work at this stage:

    // Type assert, by placing brackets and type after variable name.
    // Note that we need to assign to a new variable.
    myInt := result.(int)

    // Now we can work with this, should print '10'
    myInt += 5
    fmt.Println(myInt)
}

func ReturnData() interface{} {
    return 5
}
```

You've probably noticed this doesn't allow for much in the way of error handling. But it's also possible to use a variant of type assertion which returns if it ran ok (like the snippet of code below).

```go
myInt, ok := result.(int)
if !ok {
    log.Printf("got data of type %T but wanted int", result)
    os.Exit(1)
}
```

![type assertion in go](/img/2019/type-assertion.png)

There's also a [number](https://stackoverflow.com/questions/18041334/convert-interface-to-int/18041561) of StackOverflow [questions](https://stackoverflow.com/questions/27137521/how-to-convert-interface-to-string) that explain this well.