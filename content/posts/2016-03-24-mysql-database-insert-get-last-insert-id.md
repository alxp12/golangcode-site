---
title: 'MySQL Database Insert & Get Last Insert ID'
author: Edd Turtle
type: post
date: 2016-03-24T18:31:09+00:00
url: /mysql-database-insert-get-last-insert-id/
categories:
  - Uncategorized
tags:
  - database
  - driver
  - exec
  - mysql
  - injection
  - insert
  - lastinsertid
  - param
  - query
  - sql
meta_image: 2016/mysql-insert.png
---

This post aims to show you how to use the [`go-sql-driver`](https://github.com/go-sql-driver/mysql) (which uses the `database/sql` interface) to insert a row into a MySQL database table.

To do this we use the `Open()` method to create our database object (and connection pool). We can then create an sql statement using `Prepare()` and pass in our parameters into `Exec()`, matching them up with question marks (to avoid sql injection). Finally, calling the `LastInsertId()` we can get the id of the row we've just inserted - and in our example, we output this value to screen.

To get this example to work you'll need to fill in the DB_DSN constant. The go-sql-driver has [a guide on github](https://github.com/go-sql-driver/mysql#dsn-data-source-name) to help with this.

```go
package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

const (
	// TODO fill this in directly or through environment variable
	// Build a DSN e.g. username:password@tcp(my-sql-db-url.com)/dbName?charset=utf8
	DB_DSN = ""
)

func main() {

	// Create DB pool (doesn't actually connect or test connection)
	db, err := sql.Open("mysql", DB_DSN)
	if err != nil {
		log.Fatal("Cannot open DB connection", err)
	}
	defer db.Close()

	// Insert the value and print it's id to screen
	id, err := insert(db, "myValue")
	if err != nil {
		log.Fatal("Failed to insert into database", err)
	}
	log.Printf("Inserted row with ID of: %d\n", id)
}

// insert adds a new row to our table in the database returning
// its new id when finished.
func insert(db *sql.DB, value string) (int64, error) {

	stmt, err := db.Prepare("INSERT my_table SET my_column=?")
	if err != nil {
		return -1, err
	}
	defer stmt.Close()

	res, err := stmt.Exec(value)
	if err != nil {
		return -1, err
	}

	return res.LastInsertId()
}
```

It's important to note that the `sql.Open()` does not actually create a connection (or test it fully), so by only testing for an error here can be misleading. If you want/need to test that the DSN is valid before using it, you can add some code like this before using the db object.

```go
err = db.Ping()
if err != nil {
	// handle error
}
```

![insert row with mysql](/img/2016/mysql-insert.png)