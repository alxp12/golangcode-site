---
title: Sending a Slack Message (without a library)
author: Edd Turtle
type: post
date: 2019-01-10T20:20:00+00:00
url: /send-slack-messages-without-a-library
categories:
  - Uncategorized
tags:
  - slack
  - notifications
  - messages
  - http
  - post
  - json
  - send
  - apps
  - webhook
---

Programs often need to notify us of events and using services like Slack, Hipchat (or even email) make this convenient for us. This code snippet is a way of sending a message to Slack via an Incoming Webhook - you can set these up in the [Slack Apps](https://api.slack.com/apps) area. All you need is to set the incoming webhook url and change the text to be anything you want.

It does include a timeout (of 10 seconds) if something happens to Slack response times for any reason. It also checks that the response doesn't return an error.

```go
package main

import (
    "bytes"
    "encoding/json"
    "errors"
    "log"
    "net/http"
    "time"
)

type SlackRequestBody struct {
    Text string `json:"text"`
}

func main() {
    webhookUrl := "https://hooks.slack.com/services/X1234"
    err := SendSlackNotification(webhookUrl, "Test Message from golangcode.com")
    if err != nil {
        log.Fatal(err)
    }
}

// SendSlackNotification will post to an 'Incoming Webook' url setup in Slack Apps. It accepts
// some text and the slack channel is saved within Slack.
func SendSlackNotification(webhookUrl string, msg string) error {

    slackBody, _ := json.Marshal(SlackRequestBody{Text: msg})
    req, err := http.NewRequest(http.MethodPost, webhookUrl, bytes.NewBuffer(slackBody))
    if err != nil {
        return err
    }

    req.Header.Add("Content-Type", "application/json")

    client := &http.Client{Timeout: 10 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }

    buf := new(bytes.Buffer)
    buf.ReadFrom(resp.Body)
    if buf.String() != "ok" {
        return errors.New("Non-ok response returned from Slack")
    }
    return nil
}
```
