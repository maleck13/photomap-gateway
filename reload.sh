#!/bin/sh

docker stop gateway;
docker rm gateway
docker build -t gateway .
docker run -d -p 8003:8080  --name="gateway" gateway

