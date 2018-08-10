#!/usr/bin/env bash

echo "- Building Assets (SASS)"
sass themes/site-theme/static/css/main.scss:themes/site-theme/static/css/style.css --style compressed --sourcemap=none

echo "- Running Hugo"
hugo --quiet

echo "- Upload Files to S3..."
s3deploy -source=public/ -region=eu-west-1 -bucket=golangcode.com -quiet

if [ $? -eq 0 ]; then
	echo "- Upload Complete :) Have a super day"
else
	echo "- Upload Failed :("
fi