---
title: How to Run Go Tests with Coverage Percentage
author: Edd Turtle
type: post
date: 2017-06-01T08:48:37+00:00
url: /how-to-run-go-tests-with-coverage-percentage/
categories:
  - Uncategorized
tags:
  - coverage
  - percentage
  - profile
  - test
  - testing
  - usage

---
Go has a brilliant [built in testing package](https://golang.org/pkg/testing/), which although it is quite raw, it is very powerful. It also has the ability to show the test coverage as a percentage of the code base. Which is very useful to get perspective of a project and to know perhaps which areas need improvement.

You can see the test coverage by using the `-coverprofile` parameter on the test command.

```bash
go test -coverprofile cp.out

# PASS
# coverage: 60.2% of statements
# ok      yourpackage  1.372s
```

This is great, but even better is being able to visualise the test coverage. You can see which code is run during testing and which code is not by loading the cover profile in a browser. To do this, use this command:

```bash
go tool cover -html=cp.out
```

Which will produce something like this (although I've cropped it down):

![Code Example](/img/test-coverage-code-example.png)