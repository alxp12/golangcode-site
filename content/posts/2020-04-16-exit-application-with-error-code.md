---
title: "Exit an Application, With or Without an Error Code"
author: Edd Turtle
type: post
date: 2020-04-17T17:00:00+00:00
url: /exit-application-with-error-code
categories:
  - Uncategorized
tags:
  - exit
  - os
  - error
  - code
  - posix
  - fatal
  - terminal
  - main
  - function
meta_image: 2020/error-code2.png
---

Exiting an application in Go happens anyway when the `main()` function is complete, but the purpose of this post is to show you how to force that to happen. Perhaps at an earlier stage than the end of your code, perhaps with an error code too. This is a well established method in [POSIX](https://en.wikipedia.org/wiki/POSIX) systems, whereby a program can return a 0-255 integer to indicate if the program ran successfully, and if not, why not.

We'll be using the [`os`](https://golang.org/pkg/os/) package in stdlib to exit for us. First we'll look at exiting the application successfully (just below), then we'll look at [exiting with an error code](#exit-with-error-status-1).

### Exit Successfully

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("Hello World")

	// Exit successfully
	os.Exit(0)

	// Never runs
	fmt.Println("Something else...")
}
```

![exit successfully from an application](/img/2020/error-code1.png)

### Exit with Error (Status 1+)

Specifying an exit code above zero usually means an error has occurred. There is a list of [common/reserved exit codes](http://www.tldp.org/LDP/abs/html/exitcodes.html) for bash to keep an eye on, but in our example below we will just be using our generic error code of 1.

Some common codes:

| Code | Meaning |
| --- | --- |
| 1 | General error |
| 2 | Misuse of shell builtins |
| 127 | Command not found |
| 128 | Fatal error signal |
| 130 | Ctrl+C termination |

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("Exits with status code 1")

	// Status Code 1 = Catchall for general errors
	os.Exit(1)
}
```

![exit with an error from an application](/img/2020/error-code2.png)