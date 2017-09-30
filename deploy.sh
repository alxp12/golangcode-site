#!/usr/bin/env bash

# Build Assets
sass themes/site-theme/static/css/main.scss:themes/site-theme/static/css/style.css --style compressed --sourcemap=none

# Build Content
hugo

# Push Content
s3deploy -source=public/ -region=eu-west-1 -bucket=golangcode.com