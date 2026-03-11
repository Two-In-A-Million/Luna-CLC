#!/bin/bash

for file in /script/SQL/*.sql
do
  echo "Running $file"
  psql -U lunaCalculator -d luna -f "$file"
done 