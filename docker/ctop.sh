#!/usr/bin/env bash

# Top-like interface for container metrics: https://github.com/bcicen/ctop

sudo wget https://github.com/bcicen/ctop/releases/download/v0.7.2/ctop-0.7.2-linux-amd64 -O /usr/local/bin/ctop
sudo chmod +x /usr/local/bin/ctop