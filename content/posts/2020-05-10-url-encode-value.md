---
title: URL Encode a String
author: Edd Turtle
type: post
date: 2020-05-10T15:00:00+00:00
url: /url-encode-value
categories:
  - Uncategorized
tags:
  - url
  - encode
  - query
  - param
  - plus
  - spaces
  - amp
  - net
  - package
meta_image: 2020/url-encode.png
---

If you are coming from a PHP background you're probably very used to functions like [`urlencode()`](https://www.php.net/manual/en/function.urlencode.php) and `rawurlencode()`. The good news is you can do the same in Go and rather simply too. In the net/url package there's a `QueryEscape` function which accepts a string and will return the string with all the special characters encoded so they can be added to a url safely. An example of is converting the '+' character into `%2B`.

```go
package main

import (
	"fmt"
	"net/url"
)

func main() {

	text := "1 + 2, example for golangcode.com"
	fmt.Println("Before:", text)

	output := url.QueryEscape(text)
	fmt.Println("After:", output)
}
```

![url encode query string basic](/img/2020/url-encode.png)

Alternatively, use url.Values for building a longer query

```go
package main

import (
	"fmt"
	"net/url"
)

func main() {

	// Use net/url's value list to build query, then encode it
	params := url.Values{}
	params.Add("q", "1 + 2")
	params.Add("s", "example for golangcode.com")
	output := params.Encode()

	fmt.Println("After:", output)
}
```

![url encode query string with values](/img/2020/url-encode2.png)