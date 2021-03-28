#!/bin/bash
ARG1=${1:-main}
ARG2=${2:-covid19\-dev}
echo "deploying covid19admin branch=$ARG1"
cd /home/covid19-deployer/deploy || true
./run.py "$ARG2" state.apply pillar='{"react_apps":{"covid19public":{"git":{"branch":'"$ARG1"'}}}}'
exit
