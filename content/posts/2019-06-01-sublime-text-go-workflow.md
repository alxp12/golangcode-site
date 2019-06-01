---
title: "Sublime Text Workflow: Auto Build & Format"
author: Edd Turtle
type: post
date: 2019-06-01T07:00:00+00:00
url: /sublime-text-go-workflow
categories:
  - Uncategorized
tags:
  - sublime
  - workflow
  - automate
  - build
  - fmt
  - format
  - plugin
meta_image: 2019/sublime-build.png
---

[Sublime Text](https://www.sublimetext.com/) 3 can be a great editor for writing Go code - and with a few simple tweaks it can get better. One example of a simple workflow improvement to automate the running of `go fmt` each time you save. This keeps your code neat and tidy, while also alerting you to any syntax errors.

Some things you'll need to get started:

* Go installed (with a GOPATH) 
* Sublime Text Installed

### 1) Install Package Control

Firstly, we'll install Sublime's Package Control by going to their site: [packagecontrol.io/installation](https://packagecontrol.io/installation). There's some code to copy and paste which should install it all for you. If you haven't used this plugin before it makes installing plugins within Sublime Text very easy.

### 2) Install Build

Within Sublime, if we now: 

* Type: `Ctrl + Shift + P`
* Start typing and select 'Package Control: Install Package'
* Install the [sublime-build](https://github.com/golang/sublime-build) package by typing: 'Golang Build'

![check is date set or not](/img/2019/sublime-build.png)

We can manually build now by pressing `Ctrl + B`, which will show a popup at the bottom to confirm it's run. But also, each time to hit `Ctrl + S` to save, it will also format your code for you.