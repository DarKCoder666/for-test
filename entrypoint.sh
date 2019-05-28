#!/bin/sh
if [ "$1" = 'nginx' ]; then
    if [ "${API_URL}" != "${PLACEHOLDER_URL}" ]; then
        sed -i "s|${PLACEHOLDER_URL}|${API_URL}|g" /var/www/_nuxt/*.js
    fi
fi
exec "$@"
