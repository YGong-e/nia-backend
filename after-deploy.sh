#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

sudo yarn install

sudo npx pm2 reload all .