#!/bin/sh

sls invoke local \
 -f main \
 -p test/events/.mocks/_template.json
