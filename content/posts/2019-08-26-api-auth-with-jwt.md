---
title: "JSON Web Tokens: Authenticating your API"
author: Edd Turtle
type: post
date: 2019-08-26T17:50:00+00:00
url: /api-auth-with-jwt
categories:
  - Uncategorized
tags:
  - json
  - web token
  - jwt
  - auth
  - api
  - key
  - signed
  - token
  - handler
  - middleware
meta_image: 2019/jwt.png
---

There are of course many [different ways](https://blog.restcase.com/restful-api-authentication-basics/) to build authentication into APIs these days - JSON web tokens being just one of them. JSON Web Tokens (JWT) have an inherent advantage over other methods, like Basic Authentication, by working as a token system instead of sending the username and password with every request. To learn more about it, head over to the [introduction on jwt.io](https://jwt.io/introduction/) before we dive straight into it.

Below is an example of JWT in action. There are two main parts: the providing of a username and password to aquire a token; and the checking of that token on a request.

We use two libraries in this example, a [JWT implementation in Go](https://github.com/dgrijalva/jwt-go) and a way of using [this as middleware](https://github.com/auth0/go-jwt-middleware).

Finally, before using this code you will need to change the `APP_KEY` constant into a secret (which would ideally be stored outside of the code-base) and improve the username/password checking in the `TokenHandler` to check for more than just a `myusername`/`mypassword` combination.

```go
package main

import (
    "io"
    "log"
    "net/http"
    "time"

    "github.com/auth0/go-jwt-middleware"
    "github.com/dgrijalva/jwt-go"
)

const (
    APP_KEY = "golangcode.com"
)

func main() {

    // HTTP Endpoints
    // 1. To get a new token
    // 2. Our example endpoint which requires auth checking
    http.HandleFunc("/token", TokenHandler)
    http.Handle("/", AuthMiddleware(http.HandlerFunc(ExampleHandler)))

    // Start a basic HTTP server
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}

// TokenHandler is our handler to take a username and password and,
// if it's valid, return a token used for future requests.
func TokenHandler(w http.ResponseWriter, r *http.Request) {

    w.Header().Add("Content-Type", "application/json")
    r.ParseForm()

    // Check the credentials provided - if you store these in a database then
    // this is where your query would go to check.
    username := r.Form.Get("username")
    password := r.Form.Get("password")
    if username != "myusername" || password != "mypassword" {
        w.WriteHeader(http.StatusUnauthorized)
        io.WriteString(w, `{"error":"invalid_credentials"}`)
        return
    }

    // We are happy with the credentials, so build a token. We've given it
    // an expiry of 1 hour.
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "user": username,
        "exp":  time.Now().Add(time.Hour * time.Duration(1)).Unix(),
        "iat":  time.Now().Unix(),
    })
    tokenString, err := token.SignedString([]byte(APP_KEY))
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        io.WriteString(w, `{"error":"token_generation_failed"}`)
        return
    }
    io.WriteString(w, `{"token":"`+tokenString+`"}`)
    return
}

// AuthMiddleware is our middleware to check our token is valid. Returning
// a 401 status to the client if it is not valid.
func AuthMiddleware(next http.Handler) http.Handler {
    if len(APP_KEY) == 0 {
        log.Fatal("HTTP server unable to start, expected an APP_KEY for JWT auth")
    }
    jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
        ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
            return []byte(APP_KEY), nil
        },
        SigningMethod: jwt.SigningMethodHS256,
    })
    return jwtMiddleware.Handler(next)
}

func ExampleHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Add("Content-Type", "application/json")
    io.WriteString(w, `{"status":"ok"}`)
}
```

{{< rawhtml >}}
    <video autoplay loop muted playsinline>
        <source src="/img/2019/jwt.webm" type="video/webm">
        <source src="/img/2019/jwt.mp4" type="video/mp4">
    </video>
{{< /rawhtml >}}

We show above an example flow, first getting a token then using that token when calling an endpoint. These are the commands we used:

```bash
curl -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=myusername&password=mypassword" \
     http://localhost:8080/token
```

```bash
curl -H "Authorization: Bearer {{ TOKEN }}" \
     -H "Content-Type: application/json" \
     http://localhost:8080
```