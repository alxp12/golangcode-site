---
title: Argon2 Password Hashing
author: Edd Turtle
type: post
date: 2020-01-25T10:00:00+00:00
url: /argon2-password-hashing
categories:
  - Uncategorized
tags:
  - argon2
  - password
  - hash
  - base64
  - comparison
  - wrapper
  - crypto
  - hashing
meta_image: 2020/argon2.png
---

Argon2 is a password hashing algorithm which was voted the winner in the [Password Hashing Competition](https://password-hashing.net/) in 2015. It has implementations in many programming languages these days, with [Go being no exception](https://godoc.org/golang.org/x/crypto/argon2), and is [often recommended](https://security.stackexchange.com/a/197550) over tools like bcrypt. It is, however, a little difficult to use the library directly in Go and this post is designed to provide a wrapper for the library and provide two functions at the end of it. 

The first of our functions is to hash a new password with `GeneratePassword()`, and the second to compare a password provided to see if it matches with `ComparePassword()`. The hash comparison uses a constant time checker to help prevent timing attacks against it.

```go
package main

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"fmt"
	"strings"

	"golang.org/x/crypto/argon2"
)

type PasswordConfig struct {
	time    uint32
	memory  uint32
	threads uint8
	keyLen  uint32
}

func main() {

	config := &PasswordConfig{
		time:    1,
		memory:  64 * 1024,
		threads: 4,
		keyLen:  32,
	}

	// Example 1: Generating a Password Hash
	hash, err := GeneratePassword(config, "golangcode.com_pass")
	if err != nil {
		// handle error
		panic(err)
	}
	fmt.Println(hash)

	// Example 2: Check If Password if Valid (it is)
	match, err := ComparePassword("golangcode.com_pass", hash)
	if !match || err != nil {
		fmt.Println("Password Invalid")
	} else {
		fmt.Println("Password Valid")
	}

	// Example 3: Test Incorrect Password
	match, err = ComparePassword("I❤Liverpool", hash)
	if !match || err != nil {
		fmt.Println("Password Invalid")
	} else {
		fmt.Println("Password Valid")
	}
}

// GeneratePassword is used to generate a new password hash for storing and
// comparing at a later date.
func GeneratePassword(c *PasswordConfig, password string) (string, error) {

	// Generate a Salt
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		return "", err
	}

	hash := argon2.IDKey([]byte(password), salt, c.time, c.memory, c.threads, c.keyLen)

	// Base64 encode the salt and hashed password.
	b64Salt := base64.RawStdEncoding.EncodeToString(salt)
	b64Hash := base64.RawStdEncoding.EncodeToString(hash)

	format := "$argon2id$v=%d$m=%d,t=%d,p=%d$%s$%s"
	full := fmt.Sprintf(format, argon2.Version, c.memory, c.time, c.threads, b64Salt, b64Hash)
	return full, nil
}

// ComparePassword is used to compare a user-inputted password to a hash to see
// if the password matches or not.
func ComparePassword(password, hash string) (bool, error) {

	parts := strings.Split(hash, "$")

	c := &PasswordConfig{}
	_, err := fmt.Sscanf(parts[3], "m=%d,t=%d,p=%d", &c.memory, &c.time, &c.threads)
	if err != nil {
		return false, err
	}

	salt, err := base64.RawStdEncoding.DecodeString(parts[4])
	if err != nil {
		return false, err
	}

	decodedHash, err := base64.RawStdEncoding.DecodeString(parts[5])
	if err != nil {
		return false, err
	}
	c.keyLen = uint32(len(decodedHash))

	comparisonHash := argon2.IDKey([]byte(password), salt, c.time, c.memory, c.threads, c.keyLen)

	return (subtle.ConstantTimeCompare(decodedHash, comparisonHash) == 1), nil
}
```

![argon2 password hashing in go](/img/2020/argon2.png)