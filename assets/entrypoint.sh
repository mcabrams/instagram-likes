#!/bin/bash

path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd )

bash $path/sync-package-node-modules.sh
