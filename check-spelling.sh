#!/usr/bin/env bash

# adapted from: https://gist.github.com/cloudrkt/e680a0270478a58f25c3c7fe32710423

SEARCH_DIR="content/posts"

# Set some fancy colors to indicate errors and wrongly spelled words.
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Start checking the current directory for md files
for file in $(find $SEARCH_DIR -type f -name "*.md");
        # Pass each .md file through aspell.
        do output=$(cat $file | sed '/```/,//d' | aspell --lang=en --encoding=utf-8 --personal=./.aspell.en.pws list);
        if [[ $? != 0 ]]; then
                echo -e "${RED}Error found in output${NC}, cannot continue. Please check manually for aspell -c $file?"
                exit 1
        elif [[ $output ]]; then
                echo -e "-> ${RED}Spelling errors found${NC} <-"
                echo -e "${YELLOW}$output${NC}" |sort -u
                echo "Please check with: aspell -c $file"
                bad="yes"
                good="yes"
        fi
done

# cat some_text.md | aspell --lang=en --encoding=utf-8 list