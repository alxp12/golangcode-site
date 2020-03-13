---
title: AWS Lambda PDF Generator
author: Edd Turtle
type: post
date: 2018-05-29T09:00:00+00:00
url: /lambda-pdf-generator-from-s3
categories:
  - Uncategorized
tags:
  - pdf
  - aws
  - lambda
  - serverless
  - wkhtmltopdf
  - html
  - convert
  - s3
  - binary
---

This is an example of how to convert HTML code into a PDF using AWS' Lambda service and S3 Triggers. So that once a HTML file is upload to S3 it will automatically be converted into a PDF which should appear in the same bucket shortly after - all using a serverless function.

To do this, other than the standard library, we're using a Go wkhtmltopdf library and the Go AWS sdk. The wkhtmltopdf Go library is a wrapper to the binary file - which will need to be included in our final zip file that we upload to lambda.

```go
package main

import (
    "bytes"
    "context"
    "fmt"
    "io"
    "log"
    "os"
    "strings"

    "github.com/SebastiaanKlippert/go-wkhtmltopdf"
    "github.com/aws/aws-lambda-go/events"
    "github.com/aws/aws-lambda-go/lambda"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/s3"
)

var sess *session.Session

func init() {
    // Tell wkhtmltopdf where to find our bin file (in the zip)
    os.Setenv("WKHTMLTOPDF_PATH", os.Getenv("LAMBDA_TASK_ROOT"))

    // Setup AWS S3 Session (build once use every function)
    sess = session.Must(session.NewSession(&aws.Config{
        Region: aws.String("eu-west-1"),
    }))
}

func main() {
    // Start() is when Lambda will connect and start running functions.
    // Everything before this is setup, and anything after won't be run.
    lambda.Start(LambdaHandler)
}

func LambdaHandler(ctx context.Context, s3Event events.S3Event) {
    for _, record := range s3Event.Records {
        fmt.Printf(
            "[%s - %s] Bucket = %s, Key = %s \n",
            record.EventSource,
            record.EventTime,
            record.S3.Bucket.Name,
            record.S3.Object.Key,
        )
        if err := ProcessFile(record); err != nil {
            log.Println(err)
            continue
        }
    }
}

// ProcessFile handles a single S3 event, this will do the conversion from HTML
// to PDF for a single file only and write it back to it's origin.
func ProcessFile(record events.S3EventRecord) error {
    s3Item := record.S3

    // Get the HTML file from S3
    obj, err := s3.New(sess).GetObject(&s3.GetObjectInput{
        Bucket: &s3Item.Bucket.Name,
        Key:    &s3Item.Object.Key,
    })
    if err != nil {
        return err
    }
    defer obj.Body.Close()

    pdfBytes, err := GeneratePDF(obj.Body)
    if err != nil {
        return err
    }

    // Replace .html filename with .pdf
    newKey := strings.Replace(s3Item.Object.Key, ".html", ".pdf", -1)
    fmt.Println("Rename to: " + newKey)

    // Put the PDF back onto S3
    fmt.Println("Save File to: " + s3Item.Bucket.Name)
    _, err = s3.New(sess).PutObject(&s3.PutObjectInput{
        Bucket: &s3Item.Bucket.Name,
        Key:    &newKey,
        Body:   bytes.NewReader(pdfBytes),
    })
    return err
}

// GeneratePDF converts the file body from S3 into a PDF as a byte array to
// write back to S3.
func GeneratePDF(s3Obj io.Reader) ([]byte, error) {

    pdfg, err := wkhtmltopdf.NewPDFGenerator()
    if err != nil {
        return nil, err
    }

    // Pass S3 Object body (as reader) directly into wkhtmltopdf
    pdfg.AddPage(wkhtmltopdf.NewPageReader(s3Obj))

    // Create PDF document in internal buffer
    if err := pdfg.Create(); err != nil {
        return nil, err
    }

    // Return PDF as bytes array
    return pdfg.Bytes(), nil
}
```

For this to work, you'll need to:

* Name the code above `go-pdf-lambda.go` and run `go build go-pdf-lambda.go` to make the binary file.
* Include a copy of wkhtmltopdf along with your lambda file inside the zip ([download directly from here](https://s3-eu-west-1.amazonaws.com/files.golangcode.com/wkhtmltopdf) or from [their download page](https://wkhtmltopdf.org/downloads.html)).
* Make sure `wkhtmltopdf` is set to executable with `chmod +x wkhtmltopdf`.

And on AWS:

* The lambda function name doesn't matter, but it will need to be set to the Go 1.x runtime.
* Set your Lambda root Handler to the go binary filename (`go-pdf-lambda` in our example)
* Add an S3 trigger on all create events.
* Give your lambda function/role read & write permissions to S3 (through IAM).

How the zip file should look:

![](/img/2018/lambda-zip-archive.png)
