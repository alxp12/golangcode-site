---
title: Build a Basic Web Scraper in Go
author: Edd Turtle
type: post
date: 2019-10-26T08:00:00+00:00
url: /basic-web-scraper
categories:
  - Uncategorized
tags:
  - web
  - scrape
  - http
  - html
  - query
  - classes
  - get
  - document
  - selection
meta_image: 2019/web-scraper.png
---

This is a single page web scraper, it uses the `goquery` library to parse the html and allow it to be queried easily (like jQuery). There is a `Find` method we can use to query for classes and ids in same way as a css selector. In our example we use this to get the latest blog titles from golangcode.

If you needed to search an entire site, you could implement a query to follow and recall `a` link urls.

```go
package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

func main() {
	blogTitles, err := GetLatestBlogTitles("https://golangcode.com")
	if err != nil {
		log.Println(err)
	}
	fmt.Println("Blog Titles:")
	fmt.Printf(blogTitles)
}

// GetLatestBlogTitles gets the latest blog title headings from the url
// given and returns them as a list.
func GetLatestBlogTitles(url string) (string, error) {

	// Get the HTML
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}

	// Convert HTML into goquery document
	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		return "", err
	}

	// Save each .post-title as a list
	titles := ""
	doc.Find(".post-title").Each(func(i int, s *goquery.Selection) {
		titles += "- " + s.Text() + "\n"
	})
	return titles, nil
}
```

![web scraper to get post titles](/img/2019/web-scraper.png)