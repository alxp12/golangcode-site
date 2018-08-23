---
title: Get the Current Username, Name and Home Dir (Cross Platform)
author: Edd Turtle
type: post
date: 2017-04-26T20:08:59+00:00
url: /get-the-current-username-name-and-home-dir-cross-platform/
categories:
  - Uncategorized
tags:
  - cross platform
  - current
  - dir
  - directory
  - home
  - name
  - os
  - user
  - username

---
In this example we get the current user, the user who is executing the program, and their details. These details include information like user id (Uid), username (the short version of their name), name (the user's full name) and the user's home directory location. To do this we use the [os/user][1] package. This package also handles the differences between OS like *nix vs. windows very well, keeping your code simple across all platforms.

```go
package main

import (
    "fmt"
    "os"
    "os/user"
)

func main() {

    user, err := user.Current()
    if err != nil {
        panic(err)
    }

    // Current User
    fmt.Println("Hi " + user.Name + " (id: " + user.Uid + ")")
    fmt.Println("Username: " + user.Username)
    fmt.Println("Home Dir: " + user.HomeDir)

    // Get "Real" User under sudo.
    // More Info: https://stackoverflow.com/q/29733575/402585
    fmt.Println("Real User: " + os.Getenv("SUDO_USER"))
}
```

![](/img/2017/get-user-name-and-id.png)

 [1]: https://golang.org/pkg/os/user/