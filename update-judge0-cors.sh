#!/bin/bash

# Script to update Judge0 CORS settings on AWS instance

echo "Updating Judge0 CORS settings..."

# Commands to SSH into your AWS instance and update the Judge0 configuration
# Note: You'll need to run this script after configuring your SSH keys

# 1. Connect to your AWS instance
# ssh -i /path/to/your/key.pem ec2-user@54.161.231.143

# 2. Once connected, update the docker-compose file to include CORS settings
# sudo bash -c 'cat > /tmp/judge0-cors-update.sh << EOF
# cd /path/to/judge0
# sed -i "s/ALLOW_ORIGIN=.*/ALLOW_ORIGIN=*/" .env
# sed -i "s/ALLOW_HEADERS=.*/ALLOW_HEADERS=Content-Type,Authorization,X-Requested-With,X-Auth-Token/" .env
# docker-compose restart judge0-server
# EOF'

# 3. Make the update script executable and run it
# sudo chmod +x /tmp/judge0-cors-update.sh
# sudo /tmp/judge0-cors-update.sh

echo "CORS configuration update script created!"
echo "Instructions:"
echo "1. SSH into your AWS instance: ssh -i /path/to/your/key.pem ec2-user@54.161.231.143"
echo "2. Navigate to your Judge0 installation directory"
echo "3. Update the .env file with these settings:"
echo "   ALLOW_ORIGIN=*"
echo "   ALLOW_HEADERS=Content-Type,Authorization,X-Requested-With,X-Auth-Token"
echo "4. Restart the Judge0 server container: docker-compose restart judge0-server"
