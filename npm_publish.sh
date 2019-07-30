#!/bin/bash

# Exit if one of the commands fail
set -e 

# Get first parameter
OPT="$1";

if [[ "$OPT" != "" ]]
then
  case "$OPT" in
    "patch")
      OPT="patch"
      ;;
    "minor")
      OPT="minor"
      ;;
    "major")
      OPT="major"
      ;;
    *)
      echo >&2 "Invalid option: $@"; exit 1
      ;;
  esac
else
  OPT="patch"
fi

# Check if the current version is master
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "master" ]]
then
  echo 'Aborting script. You are not in master branch';
  exit 1;
fi

# Patch version
npm version $OPT
TAG=$(git tag --points-at HEAD)
git tag -d $TAG
cd src && npm version $OPT
cd .. && git commit -a --amend --no-edit
git tag $TAG
git push origin master $TAG