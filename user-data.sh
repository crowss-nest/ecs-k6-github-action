#!/bin/bash
yum update -y
yum install -y amazon-linux-extras
amazon-linux-extras install -y epel
yum install -y k6

# Clone the repository
git clone https://github.com/crowss-nest/ecs-k6-github-action.git
cd your-repo

# Run the load test
k6 run K6/load_test.js
