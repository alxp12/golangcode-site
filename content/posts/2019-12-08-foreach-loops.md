---
title: "Foreach Loops: The Go Way"
author: Edd Turtle
type: post
date: 2019-12-07T18:00:00+00:00
url: /foreach-loops
categories:
  - Uncategorized
tags:
  - foreach
  - loop
  - slice
  - map
  - array
  - iterate
  - print
  - key
  - value
meta_image: 2019/foreach.png
---

The foreach keyword itself does not exist within Go, instead the `for` loop can be adapted to work in the same manner. The difference however, is by using the `range` keyword and a for loop together. Like foreach loops in many other languages you have the choice of using the slices' key or value within the loop.

**Example 1)**

In our example, we iterate over a string slice and print out each word. As we only need the value we replace the key with an underscore.

```go
package main

import "fmt"

func main() {

	myList := []string{"dog", "cat", "hedgehog"}

	// for {key}, {value} := range {list}
	for _, animal := range myList {
		fmt.Println("My animal is:", animal)
	}
}
```

![foreach loop in golang](/img/2019/foreach.png)

**Example 2)**

Likewise, if we want to iterate and loop over each entry in a map, as you would an array, you can in the same way.

```go
package main

import "fmt"

func main() {

	myList := map[string]string{
		"dog":      "woof",
		"cat":      "meow",
		"hedgehog": "sniff",
	}

	for animal, noise := range myList {
		fmt.Println("The", animal, "went", noise)
	}
}
```

![foreach loop in golang](/img/2019/foreach2.png)