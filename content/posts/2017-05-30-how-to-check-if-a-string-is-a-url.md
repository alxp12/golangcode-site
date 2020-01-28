---
title: How to Check if a String is a URL
author: Edd Turtle
type: post
date: 2017-05-30T08:33:51+00:00
url: /how-to-check-if-a-string-is-a-url/
categories:
  - Uncategorized
tags:
  - check
  - function
  - http
  - location
  - parse
  - string
  - uri
  - url
  - valid
meta_image: 2017/validate-url.png
---
Here's a little snippet to determine if a string is well structured and valid url. This can be useful for pre-empting if a http call will work - or preventing failures from even occurring. In this snippet we're using a function to tidy this logic and make it reusable and we are essentially parsing the url and checking for any errors.

`ParseRequestURI()` is our primary basic check, but it will allow strings like 'Test: Test' to pass (which we don't want). We therefore combine it with a url parser to check that both a scheme (like http) and a host exist. 

<!--more-->

```go
package main

import (
	"fmt"
	"net/url"
)

func main() {
	// = true
	fmt.Println(isValidUrl("http://www.golangcode.com"))

	// = false
	fmt.Println(isValidUrl("golangcode.com"))

	// = false
	fmt.Println(isValidUrl(""))
}

// isValidUrl tests a string to determine if it is a well-structured url or not.
func isValidUrl(toTest string) bool {
	_, err := url.ParseRequestURI(toTest)
	if err != nil {
		return false
	}

	u, err := url.Parse(toTest)
	if err != nil || u.Scheme == "" || u.Host == "" {
		return false
	}

	return true
}
```

![check if a url is valid](/img/2017/validate-url.png)