#!/usr/bin/env bash

if ! [ -x "$(command -v optipng)" ]; then
  echo 'Error: optipng is not installed.' >&2
  exit 1
fi

find static/ -name '*.png' -print0 | xargs -0 optipng -nc -nb -o7