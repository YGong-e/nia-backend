#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

sudo yarn install

forever restartall