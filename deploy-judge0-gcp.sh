#!/bin/bash

# Judge0 GCP Deployment Script
# This script deploys Judge0 on a Google Cloud Platform VM instance

# Ensure script is run with sudo
if [ "$EUID" -ne 0 ]; then
  echo "Please run this script with sudo privileges."
  exit 1
fi

echo "=== CodeFusion Judge0 GCP Deployment Script ==="
echo "This script will deploy Judge0 on your GCP instance."

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    apt-get update
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    apt-get update
    apt-get install -y docker-ce
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Create Judge0 directory
mkdir -p /opt/codefusion/judge0
cd /opt/codefusion/judge0

# Copy files from current directory to /opt/codefusion/judge0
echo "Copying configuration files..."
cp docker-compose.judge0.yml /opt/codefusion/judge0/
cp judge0.env /opt/codefusion/judge0/.env

# Create necessary directories
mkdir -p /opt/codefusion/judge0/tmp

# Create init-db.sql file if it doesn't exist
if [ ! -f "/opt/codefusion/judge0/init-db.sql" ]; then
    echo "Creating empty init-db.sql file..."
    touch /opt/codefusion/judge0/init-db.sql
fi

# Install Nginx for reverse proxy
echo "Installing and configuring Nginx..."
apt-get install -y nginx certbot python3-certbot-nginx

# Create Nginx config
cat > /etc/nginx/sites-available/judge0 << EOF
server {
    listen 80;
    server_name judge0.codefusion.dev;

    location / {
        proxy_pass http://localhost:2358;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/judge0 /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx

# Deploy Judge0 with Docker Compose
echo "Deploying Judge0 with Docker Compose..."
cd /opt/codefusion/judge0
docker-compose -f docker-compose.judge0.yml up -d

# Setup SSL certificate
echo "Setting up SSL certificate with Let's Encrypt..."
certbot --nginx -d judge0.codefusion.dev --non-interactive --agree-tos --email admin@codefusion.dev

echo "=== Judge0 Deployment Complete ==="
echo "Judge0 API is now available at: https://judge0.codefusion.dev"
echo ""
echo "To monitor Judge0 containers, use: docker-compose -f /opt/codefusion/judge0/docker-compose.judge0.yml ps"
echo "To view logs, use: docker-compose -f /opt/codefusion/judge0/docker-compose.judge0.yml logs -f"
