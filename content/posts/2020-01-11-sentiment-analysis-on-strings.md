---
title: Perform Sentiment Analysis on Sentences
author: Edd Turtle
type: post
date: 2020-01-11T15:00:00+00:00
url: /sentiment-analysis-on-strings
categories:
  - Uncategorized
tags:
  - ai
  - sentiment
  - analysis
  - positive
  - negative
  - string
  - model
  - data
meta_image: 2020/sentiment.png
---

Sentiment analysis is an interesting technique of judging whether a sentence, word or paragraph is considered a positive or negative thing. It's often used against datasets like tweets as it allows you to summarize a mass of small sentences into an easy to understand stat.

In our example, we're using a package called [sentiment](https://github.com/cdipaolo/sentiment) - which was trained against IMDB comment data - to judge whether our example sentences are positive or negative. Because it was trained on short comments about films it might not be appropriate for your use case.

#### Example Code:

```go
package main

import (
	"log"
	"github.com/cdipaolo/sentiment"
)

func main() {

	model, err := sentiment.Restore()
	if err != nil {
		panic(err)
	}

	var analysis *sentiment.Analysis
	var text string

	// Negative Example
	text = "Your mother is an awful lady"
	analysis = model.SentimentAnalysis(text, sentiment.English)
	if analysis.Score == 1 {
		log.Printf("%s - Score of %d = Positive Sentiment\n", text, analysis.Score)
	} else {
		log.Printf("%s - Score of %d = Negative Sentiment\n", text, analysis.Score)
	}

	// Positive Example
	text = "Your mother is a lovely lady"
	analysis = model.SentimentAnalysis(text, sentiment.English)
	if analysis.Score == 1 {
		log.Printf("%s - Score of %d = Positive Sentiment\n", text, analysis.Score)
	} else {
		log.Printf("%s - Score of %d = Negative Sentiment\n", text, analysis.Score)
	}
}
```

{{< rawhtml >}}
    <video autoplay loop muted playsinline>
        <source src="/img/2020/sentiment.webm" type="video/webm">
        <source src="/img/2020/sentiment.mp4" type="video/mp4">
    </video>
{{< /rawhtml >}}

The response of the `SentimentAnalysis` method returns more data then is shown in the example (struct shown below). We're just using the 'Score' of the whole string, but it has analysed each word within the sentence - which can be accessed in the 'Words' slice.

```
type Analysis struct {
    Language  Language        `json:"lang"`
    Words     []Score         `json:"words"`
    Sentences []SentenceScore `json:"sentences,omitempty"`
    Score     uint8           `json:"score"`
}
```