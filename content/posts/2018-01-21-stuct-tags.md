---
title: Struct Tags for Encoding/Decoding Data
author: Edd Turtle
type: post
date: 2018-01-21T10:40:00+00:00
url: /struct-tags
categories:
  - Uncategorized
tags:
  - struct
  - tags
  - json
  - encode
  - decode
  - ignore
  - empty
  - bson
  - type
---

In Go, we use structs to define and group data, as we would use classes in other OOP languages. However, in Go the naming of attributes within the struct is important because if it starts with a lower-case it's seen as private and with an upper-case first letter it's seen as public.

We can encode these structs into data formats like json but we might want to rename the fields, struct tags allow us to do this. They are defined using back ticks after the type declaration.

```go
type Address struct {
    Line1    string `json:"line_1"`
    City     string `json:"city"`
    Postcode string `json:"postcode"`
}
```

**Mutliple Tags:**
For when you need to use multiple tags they can be separated by spaces.

```go
type Person struct {
    FirstName string `json:"first_name" bson:"first_name"`
    LastName  string `json:"last_name" bson:"last_name"`
}
```

**Ignore Empty:** 
When encoding to JSON, we might not want to print out data with hasn't been defined. To do this we use the `omitempty` tag within the name of the item.

```go
type Animal struct {
    Name  string `json:"name"`
    Noise string `json:"noise,omitempty"`
    Size  string `json:",omitempty"`
}
```