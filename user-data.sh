#!/bin/bash
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

# Update package lists and install dependencies
echo "Updating package lists and installing dependencies..."
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y curl gnupg

# Add the k6 repository
echo "Adding k6 repository..."
curl -s https://packagecloud.io/install/repositories/loadimpact/k6/script.deb.sh | bash

# Install k6
echo "Installing k6..."
apt-get update
apt-get install -y k6

echo "Setup complete."
