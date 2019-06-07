---
title: "Go Get: Install All Packages"
author: Edd Turtle
type: post
date: 2019-06-07T11:00:00+00:00
url: /go-get-all-packages
categories:
  - Uncategorized
tags:
  - command
  - install
  - goget
  - packages
  - cmd
  - project
  - update
  - verbose
---

Go has a simple built in way to download packages. If you've programmed in Go, you've likely used the `go get` command before ([view docs](https://golang.org/cmd/go/#hdr-Download_and_install_packages_and_dependencies)). It often works something like this:

`go get -u github.com/gorilla/mux`

Which is great - but! What if you want to download all the packages linked to your project? This commonly happens if you pull a new project down using version control and don't want to go get each package individually.

The answer is to use `go get` within the **current project** and tell it to find all required packages recursively by using this command: 

```
go get -u ./...
```

(We're including the `-u` parameter to also update any existing packages.)

If you're want to see what's happening with this command, as it's a quiet command, the add the `-v` parameter to add a layer of verbosity.

<!-- ![check is date set or not](/img/2019/sublime-build.png) -->