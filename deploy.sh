#!/bin/bash
ARG1=${1:-master}
ARG2=${2:-covid19\-dev}
ssh covid19-deployer@covid19admin.py.staging.yipl.com.np 'bash -s' < script.sh "$ARG1" "$ARG2"
