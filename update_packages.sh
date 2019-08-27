#!/bin/bash

set -e

# npm-check-updates package dependency
# To install: npm install -g npm-check-updates

ncu -u
npm update
npm install