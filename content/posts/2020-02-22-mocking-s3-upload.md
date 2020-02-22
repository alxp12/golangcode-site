---
title: Mock S3 Uploads in Go Tests
author: Edd Turtle
type: post
date: 2020-02-22T10:00:00+00:00
url: /mocking-s3-upload
categories:
  - Uncategorized
tags:
  - mock
  - testing
  - aws
  - s3
  - putobject
  - dependency
  - injection
  - file
  - storage
meta_image: 2020/s3-mock1.png
---

A common scenario a back-end web developer might encounter is writing code which [uploads a file to an external storage platform](/uploading-a-file-to-s3/), like S3 or Azure. This is simple enough, but writing tests for this code which are isolated from the dependencies isn't quite as straight forward. We can achieve this in Go through the use of interfaces and creating a "[mock](https://en.wikipedia.org/wiki/Mock_object)" uploader when our tests run.

Below we've build an example to show this, first showing the test and then the code it's testing.

The same principle can be applied to almost any dependency and it's also useful for mocking the downloading of files from S3. Although we've done this process manually, there are [packages](https://github.com/golang/mock) to help you create these mocks.

### uploader_test.go

```go
package main

import (
	"log"
	"testing"

	"github.com/aws/aws-sdk-go/service/s3"
)

type fileFetcher struct{}

func (f *fileFetcher) PutObject(input *s3.PutObjectInput) (*s3.PutObjectOutput, error) {
	log.Println("Mock Uploaded to S3:", *input.Key)
	return &s3.PutObjectOutput{}, nil
}

func TestMyFunc(t *testing.T) {

	f := fileFetcher{}
	err := MyFuncToTest(&f)

	if err != nil {
		t.Errorf("TestMyFunc returned an error: %s", err)
	}
}
```

### uploader.go

```go
package main

import (
	"bytes"
	"fmt"
	"net/http"
	"os"
	"path"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

const (
	S3BucketName = "{{!! YOUR_S3 BUCKET !!}}"
)

type ReportS3 interface {
	PutObject(*s3.PutObjectInput) (*s3.PutObjectOutput, error)
}

func main() {

	// Create AWS Session
	s, _ := session.NewSession(&aws.Config{Region: aws.String("eu-west-1")})
	svc := s3.New(s)

	if MyFuncToTest(svc) == nil {
		fmt.Println("File uploaded")
	}
}

// MyFuncToTest uploads a file to S3 - This is the function we're going to test!
func MyFuncToTest(s3Svc ReportS3) error {
	f, err := os.Open("golangcode-file.txt")
	if err != nil {
		return err
	}
	return UploadToS3(s3Svc, f)
}

// UploadToS3 will upload a single file to S3, it will require a pre-built aws s3 service.
func UploadToS3(s3Svc ReportS3, file *os.File) error {

	// Get file size and read the file content into a buffer
	fileInfo, err := file.Stat()
	if err != nil {
		return err
	}
	var size int64 = fileInfo.Size()
	buffer := make([]byte, size)
	file.Read(buffer)

	// S3 Name
	s3Key := path.Base(file.Name())
	_, err = s3Svc.PutObject(&s3.PutObjectInput{
		Bucket:        aws.String(S3BucketName),
		Key:           aws.String(s3Key),
		ACL:           aws.String("private"),
		Body:          bytes.NewReader(buffer),
		ContentLength: aws.Int64(size),
		ContentType:   aws.String(http.DetectContentType(buffer)),
	})
	return err
}
```

### The Results:

The tests running:

![tests using a mock uploader to AWS S3](/img/2020/s3-mock1.png)

The program running:

![program uploading to AWS S3](/img/2020/s3-mock2.png)