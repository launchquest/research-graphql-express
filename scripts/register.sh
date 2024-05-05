#!/bin/bash
# register.sh

read -p "Enter username: " username
read -s -p "Enter password: " password
echo

curl -X POST -H "Content-Type: application/json" \
     -d "{\"query\":\"mutation { registerUser(username: \\\"$username\\\", password: \\\"$password\\\") { id username } }\"}" \
     http://localhost:8000/graphql
