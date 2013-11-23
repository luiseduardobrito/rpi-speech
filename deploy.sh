#!/bin/bash

git checkout .
git pull --force origin master
chmod -R +x scripts/
sudo node app -v