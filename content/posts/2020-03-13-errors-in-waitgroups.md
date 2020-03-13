---
title: "How to: Handle Errors within Wait Groups"
author: Edd Turtle
type: post
date: 2020-03-13T16:00:00+00:00
url: /errors-in-waitgroups
categories:
  - Uncategorized
tags:
  - sync
  - waitgroup
  - errors
  - handle
  - goroutine
  - concurrency
  - select
  - wait
meta_image: 2020/errors-in-waitgroups.png
---

One of the many benefits of using Go is it's simplicity when it comes to concurrency. With WaitGroups being an excellent example of this. It can be tricky though to handle both concurrency and errors effectively. This post aims to outline how you can run multiple goroutines and handle any errors effectively, without stopping program execution.

The essence of this comes down to these three key parts:
* Creating two channels, for passing errors and when the WaitGroup is complete.
* A final goroutine to listen for the WaitGroup to complete, closing a channel when that happens.
* A `select` listening for errors or the WaitGroup to complete, whichever occurs first.

```go
package main

import (
	"errors"
	"log"
	"sync"
)

func main() {

	// Make channels to pass fatal errors in WaitGroup
	fatalErrors := make(chan error)
	wgDone := make(chan bool)

	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		log.Println("Waitgroup 1")
		// Do Something...
		wg.Done()
	}()
	go func() {
		log.Println("Waitgroup 2")
		// Example function which returns an error
		err := ReturnsError()
		if err != nil {
			fatalErrors <- err
		}
		wg.Done()
	}()

	// Important final goroutine to wait until WaitGroup is done
	go func() {
		wg.Wait()
		close(wgDone)
	}()

	// Wait until either WaitGroup is done or an error is received through the channel
	select {
	case <-wgDone:
		// carry on
		break
	case err := <-fatalErrors:
		close(fatalErrors)
		log.Fatal("Error: ", err)
	}

	log.Println("Program executed successfully")
}

func ReturnsError() error {
	return errors.New("Example error on golangcode.com")
}
```

![handling errors in wait groups](/img/2020/errors-in-waitgroups.png)