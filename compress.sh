#!/usr/bin/env bash

 find -name '*.png' -print0 | xargs -0 optipng -nc -nb -o7