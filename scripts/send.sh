#!/bin/bash
# sendmsg.sh

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 recipient message"
    exit 1
fi

recipient=$1
message=$2

if [ ! -f token.txt ]; then
    echo "No session found. Please login first."
    exit 1
fi

token=$(cat token.txt)

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $token" \
     -d "{\"query\":\"mutation { sendMessage(recipient: \\\"$recipient\\\", content: \\\"$message\\\") { id } }\"}" \
     http://localhost:8000/graphql
