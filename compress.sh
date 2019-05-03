#!/usr/bin/env bash

find static/ -name '*.png' -print0 | xargs -0 optipng -nc -nb -o7