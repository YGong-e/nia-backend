#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

sudo yarn

sudo npx pm2 reload all .