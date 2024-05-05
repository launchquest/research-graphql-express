#!/bin/bash
# checkmsgs.sh

if [ ! -f token.txt ]; then
    echo "No session found. Please login first."
    exit 1
fi

token=$(cat token.txt)

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $token" \
     -d "{\"query\":\"query { getMessages { id sender recipient content } }\"}" \
     http://localhost:8000/graphql
