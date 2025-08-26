# CodeFusion Judge0 Setup Guide

This guide provides instructions for setting up and configuring Judge0 on Google Cloud Platform (GCP) for the CodeFusion project.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [GCP VM Setup](#gcp-vm-setup)
3. [Judge0 Deployment](#judge0-deployment)
4. [Backend Configuration](#backend-configuration)
5. [Testing the Integration](#testing-the-integration)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

- Google Cloud Platform account with billing enabled
- Domain name for Judge0 service (e.g., `judge0.codefusion.dev`)
- Basic knowledge of Linux, Docker, and networking

## GCP VM Setup

1. **Create a VM instance in GCP:**
   - Navigate to Compute Engine > VM instances > Create Instance
   - Recommended settings:
     - Machine type: e2-medium (2 vCPU, 4 GB memory) or higher
     - Boot disk: Ubuntu 20.04 LTS, 50 GB SSD
     - Allow HTTP/HTTPS traffic
     - Enable Google Cloud API access

2. **Set up DNS:**
   - Create an A record pointing to your VM's external IP address:
     - Host: judge0
     - Domain: codefusion.dev
     - Value: [Your VM's external IP]
     - TTL: 3600

3. **SSH into your VM:**
   ```sh
   gcloud compute ssh judge0-vm --zone [your-vm-zone]
   ```

## Judge0 Deployment

1. **Copy Configuration Files to VM:**
   ```sh
   gcloud compute scp docker-compose.judge0.yml judge0.env deploy-judge0-gcp.sh judge0-vm:~/ --zone [your-vm-zone]
   ```

2. **Make the Deployment Script Executable:**
   ```sh
   chmod +x deploy-judge0-gcp.sh
   ```

3. **Run the Deployment Script:**
   ```sh
   sudo ./deploy-judge0-gcp.sh
   ```

4. **Verify Deployment:**
   ```sh
   docker-compose -f /opt/codefusion/judge0/docker-compose.judge0.yml ps
   ```
   
   All services should be in the "Up" state.

## Backend Configuration

1. **Update Backend Environment Variables:**
   Replace the existing Judge0 configuration in your `.env` file with:
   ```
   # Self-hosted Judge0 on GCP configuration
   JUDGE0_API_URL=https://judge0.codefusion.dev
   ```

2. **Restart Backend Server:**
   ```sh
   pm2 restart backend
   # or
   npm run start:prod
   ```

## Testing the Integration

1. **Test API Connection:**
   ```sh
   curl https://judge0.codefusion.dev/system_info
   ```
   
   Should return system information JSON response.

2. **Test Code Execution:**
   Use the CodeFusion UI to:
   - Select a problem
   - Write a solution
   - Submit code
   - Check if execution results are returned correctly

## Troubleshooting

### Common Issues:

1. **Connection Refused:**
   - Check if the Judge0 services are running: 
     ```sh
     docker ps | grep judge0
     ```
   - Verify Nginx configuration:
     ```sh
     sudo nginx -t
     sudo systemctl status nginx
     ```

2. **SSL Certificate Issues:**
   - Run certbot again:
     ```sh
     sudo certbot --nginx -d judge0.codefusion.dev
     ```

3. **Judge0 Service Errors:**
   - Check container logs:
     ```sh
     docker-compose -f /opt/codefusion/judge0/docker-compose.judge0.yml logs -f judge0-server
     ```

4. **Database Errors:**
   - Check database container logs:
     ```sh
     docker-compose -f /opt/codefusion/judge0/docker-compose.judge0.yml logs -f judge0-db
     ```

### Restarting Services:

```sh
# Restart all Judge0 services
docker-compose -f /opt/codefusion/judge0/docker-compose.judge0.yml restart

# Restart Nginx
sudo systemctl restart nginx
```

## Maintenance

1. **Updating Judge0:**
   ```sh
   cd /opt/codefusion/judge0
   docker-compose -f docker-compose.judge0.yml down
   # Edit docker-compose.judge0.yml to update version if needed
   docker-compose -f docker-compose.judge0.yml pull
   docker-compose -f docker-compose.judge0.yml up -d
   ```

2. **Backup Database:**
   ```sh
   docker exec judge0-db pg_dump -U judge0 judge0 > judge0_backup_$(date +%Y%m%d).sql
   ```

3. **Monitor Resources:**
   ```sh
   docker stats
   ```

## Security Considerations

1. Configure firewall rules in GCP to restrict access to specific IPs
2. Update Judge0 environment variables to restrict API access
3. Implement rate limiting in Nginx configuration
4. Regularly update all components (OS, Docker, Judge0)

---

For support or more information, please refer to the [Judge0 documentation](https://github.com/judge0/judge0/blob/master/README.md) or contact the CodeFusion development team.
