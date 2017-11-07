#!/usr/bin/env bash

echo "- Build Assets"
sass themes/site-theme/static/css/main.scss:themes/site-theme/static/css/style.css --style compressed --sourcemap=none

echo "- Run Hugo"
hugo --quiet

echo "- Upload Files"
s3deploy -source=public/ -region=eu-west-1 -bucket=golangcode.com

echo "- Upload Complete :) Have a super day"