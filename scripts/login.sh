#!/bin/bash
# login.sh

read -p "Enter username: " username
read -s -p "Enter password: " password
echo

response=$(curl -s -X POST -H "Content-Type: application/json" \
     -d "{\"query\":\"mutation { loginUser(username: \\\"$username\\\", password: \\\"$password\\\") { token user { username } } }\"}" \
     http://localhost:8000/graphql)

# Check for errors in response
error=$(echo $response | jq -r '.errors[0].message')

if [[ $error != "null" ]]; then
    echo "Error: $error"
    exit 1
fi

# Extract token and save to file
token=$(echo $response | jq -r '.data.loginUser.token')
echo $token > token.txt

echo "Logged in as $username"
