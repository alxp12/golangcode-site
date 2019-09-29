---
title: Convert iota List to String in JSON
author: Edd Turtle
type: post
date: 2019-09-29T06:20:00+00:00
url: /convert-iota-to-string-in-json
categories:
  - Uncategorized
tags:
  - const
  - constant
  - json
  - iota
  - string
  - int
  - marshal
  - unmarshal
  - struct
meta_image: 2019/iota-example-after.png
---

Constants in Go, when combined with `iota`, can be a nice way to use options and settings as a list. We have an example below using genders to show this in action. The problem comes if you want to encode/decode structs to JSON, then the constant will be encoded into an int - sometimes it would be nice to convert this to a string to make it easier to represent what it is.

### The Problem:

```go
package main

import (
	"encoding/json"
	"fmt"
)

const (
	GenderNotSet = iota
	GenderMale
	GenderFemale
	GenderOther
)

type Human struct {
	Gender int `json:"gender"`
}

func main() {
	me := Human{
		Gender: GenderMale,
	}
	prettyJSON, _ := json.MarshalIndent(me, "", "    ")
	fmt.Println(string(prettyJSON))
}
```

![iota example on encoding to json](/img/2019/iota-example-before.png)

### The Solution:

The solution is to use the same constant list, but create your own struct for this type. This is so we can add the `MarshalJSON` and `UnmarshalJSON` methods to it. These in turn then use maps to convert the constant into/from a string.

To make the example easier to read, we've split this into two files.

gender.go

```go
package main

import (
	"bytes"
	"encoding/json"
)

type Gender int

const (
	GenderNotSet = iota
	GenderMale
	GenderFemale
	GenderOther
)

var toString = map[Gender]string{
	GenderNotSet: "Not Set",
	GenderMale:   "Male",
	GenderFemale: "Female",
	GenderOther:  "Other",
}

var toID = map[string]Gender{
	"Not Set": GenderNotSet,
	"Male":    GenderMale,
	"Female":  GenderFemale,
	"Other":   GenderOther,
}

func (g Gender) MarshalJSON() ([]byte, error) {
	buffer := bytes.NewBufferString(`"`)
	buffer.WriteString(toString[g])
	buffer.WriteString(`"`)
	return buffer.Bytes(), nil
}

func (g *Gender) UnmarshalJSON(b []byte) error {
	var j string
	if err := json.Unmarshal(b, &j); err != nil {
		return err
	}
	*g = toID[j]
	return nil
}
```

main.go

```go
package main

import (
	"encoding/json"
	"fmt"
)

type Human struct {
	Gender Gender `json:"gender"`
}

func main() {
	me := Human{
		Gender: GenderMale,
	}
	prettyJSON, _ := json.MarshalIndent(me, "", "    ")
	fmt.Println(string(prettyJSON))
}
```

![iota example on encoding to json after using struct](/img/2019/iota-example-after.png)