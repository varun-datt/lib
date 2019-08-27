#!/usr/bin/env bash

firewall-cmd --zone=public --permanent --add-service=http
firewall-cmd --zone=public --permanent --add-service=https
firewall-cmd --zone=public --add-port=<port>/tcp --permanent
firewall-cmd --reload