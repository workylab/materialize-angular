#!/bin/bash

# Exit if one of the commands fail
set -e 

if [[ "$GITHUB_TOKEN" = "" ]]
then
  echo 'Aborting script. No GITHUB_TOKEN env variable found.';
  exit 1;
fi

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

# Bump version
npm version $OPT
TAG=$(git tag --points-at HEAD)
git tag -d $TAG
cd src && npm version $OPT
cd .. && git commit -a --amend --no-edit
git tag $TAG
git push origin master $TAG # push to create CHANGELOG

# Update CHANGELOG
docker run -it --rm -v "$(pwd)":/usr/local/src/your-app ferrarimarco/github-changelog-generator --user workylab --project materialize-angular --token ${GITHUB_TOKEN} --exclude-labels 'duplicate,question,invalid,wontfix,nochangelog,release'
git add CHANGELOG.md
git commit -m "Update CHANGELOG for $TAG [skip ci]"

# Retag version
git tag -d $TAG
git push origin :refs/tags/$TAG
git tag $TAG
git push origin master $TAG

# Merge back
echo "Merge backing from master to dev..."
git checkout dev
git pull origin dev
git rebase master
git push origin dev