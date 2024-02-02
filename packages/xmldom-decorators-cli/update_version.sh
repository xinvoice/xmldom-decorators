#!/usr/bin/env sh

grep '"version":' package.json | sed -e 's/\(.*\),/{\1}/' > lib/version.json