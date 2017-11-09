#!/bin/sh

# Preprend the upstream configuration
(echo "upstream web { ip_hash; server web:$WEB_PORT; }" && cat /etc/nginx/conf.d/proxy.conf) > proxy.conf.new
mv proxy.conf.new /etc/nginx/conf.d/proxy.conf

# Log the resulting configuration file
cat /etc/nginx/conf.d/proxy.conf

nginx -g "daemon off;"
