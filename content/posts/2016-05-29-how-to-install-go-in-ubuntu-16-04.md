---
title: How to Install Go in Ubuntu 16.04/18.04
author: Edd Turtle
type: post
date: 2016-05-29T17:37:45+00:00
url: /how-to-install-go-in-ubuntu-16-04/
tags:
  - 16.04
  - 18.04
  - bash
  - install
  - local
  - path
  - profile
  - ubuntu
  - vim
  - wget
---
Ubuntu does come with a version of go (installable through `apt install go`) but it won't be as up-to-date as downloading it directly. And I know many gophers like using the latest version.

To begin with we'll start by downloading the latest version and once downloaded we extract it into a folder we can work with. (You can find the [latest version here](https://golang.org/dl/)).

```bash
wget https://dl.google.com/go/go1.12.4.linux-amd64.tar.gz
```

```bash
sudo tar -C /usr/local -xvf go1.12.4.linux-amd64.tar.gz
```

We then need to add some environment variables so Go knows where our work/code directory is located. GOPATH should point to the folder where you'll be working in. This folder once setup should have your `src`, `bin` and `pkg` folders.

```bash
vim ~/.profile
```

Add this to the bottom:

```bash
export GOPATH=$HOME/go
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
```

Press `:wq` to exit and run this to load your changes:

```bash
source ~/.profile
```

As the final test, if we run this:

```bash
go version
```

We should see: `go version go1.12.4 linux/amd64`

Finally, some clean-up

```bash
rm go1.12.4.linux-amd64.tar.gz
```
