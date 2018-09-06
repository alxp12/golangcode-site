---
title: Updating Go on Ubuntu/Linux
author: Edd Turtle
type: post
date: 2017-05-27T08:26:11+00:00
url: /updating-go-on-ubuntu/
categories:
  - Uncategorized
tags:
  - download
  - go
  - install
  - linux
  - os
  - ubuntu
  - updating
  - upgrade
  - wget

---
When a new version of Go is released I always want to jump on it. Likewise, I'd like the update to be as easy and quick as possible, but often find it harder than expected (I'm used to `apt upgrade`). Many articles exist online to install Go, less on upgrading it - so here's one! This has Ubuntu in mind as an OS but should work on most Linux distros.

It is just like installing but first we have to remove the go version installed. If you try overwriting (and not removing) you might find errors get thrown up. But unlike installing we don't need to worry about path variables - as they already exist.

The commands below were used to update between go 1.8.1 -> 1.11 so you'll have to change the version numbers if what you want is different. You can find the latest releases [here](https://golang.org/dl/).

    go version
    # go version go1.8.1 linux/amd64

    sudo rm -r /usr/local/go/

    wget https://dl.google.com/go/go1.11.linux-amd64.tar.gz
    # ... Saving to: ‘go1.11.linux-amd64.tar.gz’

    sudo tar -C /usr/local -xzf go1.11.linux-amd64.tar.gz

    go version
    # go version go1.11 linux/amd64

    rm go1.11.linux-amd64.tar.gz

There we have it, that should be all there is to it.