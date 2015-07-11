#!/bin/sh

docker stop gateway;
docker rm gateway
docker build -t maleck13/gateway .
docker run -d  --name="gateway" maleck13/gateway

