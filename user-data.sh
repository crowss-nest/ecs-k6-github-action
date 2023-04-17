#!/bin/bash
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

# Update package lists and install dependencies
echo "Updating package lists and installing dependencies..."
export DEBIAN_FRONTEND=noninteractive

sudo apt update
sudo apt install snapd

sudo snap install k6

echo "Setup complete."
