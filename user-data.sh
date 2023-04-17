#!/bin/bash
# Update package lists and install dependencies
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y curl gnupg

# Add the k6 repository
curl -s https://packagecloud.io/install/repositories/loadimpact/k6/script.deb.sh | bash

# Install k6
apt-get update
apt-get install -y k6
