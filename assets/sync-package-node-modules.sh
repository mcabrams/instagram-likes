#!/bin/bash
path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd )
cp -r $path/node_modules/ /package/
