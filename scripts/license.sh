#!/bin/bash

cd ..

for file in `find . -not -path "./node_modules/*" -not -path "./dist/*" -name '*.ts'`
do
  echo $file
  if ! grep -q Copyright $file
  then
    cat scripts/license-header $file >$file.new && mv $file.new $file
  fi
done

for file in `find . -not -path "./node_modules/*" -not -path "./dist/*" -name '*.scss'`
do
  echo $file
  if ! grep -q Copyright $file
  then
    cat scripts/license-header $file >$file.new && mv $file.new $file
  fi
done