#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

deno run --allow-all "$SCRIPT_DIR/src/main.ts" "$1"