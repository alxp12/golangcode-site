---
title: "Creating, Wrapping and Handling Errors"
author: Edd Turtle
type: post
date: 2018-02-03T10:40:00+00:00
url: /custom-error-messages
categories:
  - Uncategorized
tags:
  - error
  - package
  - new
  - wrap
  - handling
  - errors
  - interface
  - return
meta_image: 2018/custom-errors1.png
---

In Go, although errors are a [controversial](https://github.com/golang/go/issues/32825) [subject](https://github.com/golang/go/issues/32437), they are in fact very simple. As programmers of Go we also spend a lot of our time writing `if err != nil`. But we often also need to create these errors and pass them back to other functions to handle.

The `errors` package allows us to create errors, as per the error interface, which can be dealt with like any other error. In our example below, we handle the error within `main()` and produce the error in `DoSomething()`.

Basic Example:

```go
package main

import (
	"errors"
	"log"
)

func main() {
	// Run our function & catch any errors, we're going to report this error and exit.
	if err := DoSomeThing(); err != nil {
		log.Fatal(err)
	}
}

// DoSomething returns a type of error, these can be passed back directly from
// other functions inside this one, or created within it.
func DoSomeThing() error {
	return errors.New("Example Error, DoSomething has gone wrong!")
}
```

![creating custom errors in go](/img/2018/custom-errors1.png)

### Wrapping Errors

By using the [pkg/errors](https://github.com/pkg/errors) package instead of the stdlib copy, we're able to `Wrap()` and `Unwrap()` errors as they bubble up. This gives the great advantage of adding context along the way. If you see a generic and specific error in a large code base they can be difficult to track down without this added context.

```go
package main

import (
	"log"

	// Note: we're using an 'enhanced' errors package
	"github.com/pkg/errors"
)

func main() {
	err := WholeJob()
	if err != nil {
		log.Fatal(err)
	}
}

func WholeJob() error {
	err := SpecificThing()
	if err != nil {
		// Wrap() accepts the original error, then a custom message
		return errors.Wrap(err, "The whole job failed")
	}
	return nil
}

func SpecificThing() error {
	return errors.New("The specific thing failed")
}
```

![wrapping custom errors in go](/img/2018/custom-errors2.png)

### Handling Errors

Using the `Is()` function when checking errors is a more thorough way to check errors, as opposed to a line like `err == exampleError` which would also work if the error didn't use wrapping.

```go
package main

import (
	"errors"
	"log"
)

var exampleError = errors.New("Example Error, DoSomething has gone wrong!")

func main() {

	err := DoSomeThing()

	if errors.Is(err, exampleError) {
		log.Println("The error was our example error")
	} else if err != nil {
		log.Println("The error was something else")
	} else {
		log.Println("There was no error")
	}
}

func DoSomeThing() error {
	return exampleError
}
```

![checking errors in go](/img/2018/custom-errors3.png)