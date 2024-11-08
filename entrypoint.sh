#!/bin/sh
envsubst < /usr/local/apache2/htdocs/index.html > /usr/local/apache2/htdocs/index.html
httpd-foreground
