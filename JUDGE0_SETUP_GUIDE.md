# 🏗️ Judge0 Self-Hosting Guide for Production

This guide will help you set up Judge0 API for your CodeFusion platform using Docker with production-ready configuration.

## 📋 Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 1.29+)
- 4GB+ RAM recommended
- Linux/macOS (Windows with WSL2)

## 🚀 Quick Setup

### 1. Clone the Configuration Files

The following files are included in your project:
- `docker-compose.judge0.yml` - Main Docker Compose configuration
- `judge0.env.example` - Environment variables template

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp judge0.env.example .env

# Edit the environment file with your secure passwords
nano .env
```

**Important**: Change these default values:
- `POSTGRES_PASSWORD` - Strong database password
- `REDIS_PASSWORD` - Strong Redis password  
- `SECRET_KEY_BASE` - Generate a 64+ character random string

### 3. Generate Secret Key

```bash
# Generate a secure secret key
openssl rand -hex 64
```

### 4. Create Required Directories

```bash
# Create temporary directory for Judge0
mkdir -p tmp
chmod 777 tmp
```

### 5. Start Judge0 Services

```bash
# Start all services
docker-compose -f docker-compose.judge0.yml up -d

# Check service status
docker-compose -f docker-compose.judge0.yml ps

# View logs
docker-compose -f docker-compose.judge0.yml logs -f
```

## 🔧 Configuration Details

### Service Architecture

1. **judge0-server**: Main API server (port 2358)
2. **judge0-workers**: Background job processors (2 instances)
3. **judge0-db**: PostgreSQL database
4. **judge0-redis**: Redis cache and queue

### Security Features

- Isolated execution environment
- Resource limits (CPU, memory, time)
- Disabled dangerous features
- Network isolation
- Health checks

### Performance Tuning

- **Worker Scaling**: Adjust `scale: 2` in docker-compose for more workers
- **Memory Limits**: Modify `MAX_MEMORY_LIMIT` for your server capacity
- **Queue Size**: Adjust `MAX_QUEUE_SIZE` based on expected load
- **Time Limits**: Configure `MAX_CPU_TIME_LIMIT` and `MAX_WALL_TIME_LIMIT`

## 🔗 Integration with CodeFusion

### Update Backend Configuration

Update your backend `.env` file:

```env
# Judge0 Configuration
JUDGE0_API_URL=http://localhost:2358
JUDGE0_API_KEY=  # Leave empty for self-hosted instance
```

### Update Judge0 Library

Modify `backend/src/libs/judge0.lib.js`:

```javascript
export const submitBatch = async (submissions) => {
  try {
    const { data } = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
      { submissions },
      {
        headers: {
          'Content-Type': 'application/json',
          // Remove RapidAPI headers for self-hosted
        }
      }
    );
    return data;
  } catch (error) {
    console.error("Error submitting batch to Judge0:", error.message);
    throw new Error(`Failed to submit code to Judge0: ${error.message}`);
  }
};
```

## 🔍 Health Monitoring

### Check Service Health

```bash
# Check API health
curl http://localhost:2358/system_info

# Check database connection
docker exec judge0-db pg_isready -U judge0

# Check Redis connection
docker exec judge0-redis redis-cli ping
```

### View Service Logs

```bash
# All services
docker-compose -f docker-compose.judge0.yml logs

# Specific service
docker-compose -f docker-compose.judge0.yml logs judge0-server
docker-compose -f docker-compose.judge0.yml logs judge0-workers
```

## 🛡️ Production Security

### Network Security

1. **Firewall**: Only expose port 2358 internally
2. **Reverse Proxy**: Use Nginx/Apache for SSL termination
3. **Authentication**: Implement API key authentication if needed

### Resource Limits

```yaml
# Add to docker-compose services
deploy:
  resources:
    limits:
      memory: 2G
      cpus: '1.0'
    reservations:
      memory: 1G
      cpus: '0.5'
```

### SSL/HTTPS Setup

Use Nginx as reverse proxy:

```nginx
server {
    listen 443 ssl;
    server_name judge0.yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:2358;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📊 Performance Optimization

### Scaling Workers

```bash
# Scale workers based on load
docker-compose -f docker-compose.judge0.yml up -d --scale judge0-workers=4
```

### Database Optimization

```sql
-- Connect to PostgreSQL and optimize
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET work_mem = '16MB';
SELECT pg_reload_conf();
```

### Redis Optimization

```bash
# Add to Redis configuration
echo "maxmemory 512mb" >> redis.conf
echo "maxmemory-policy allkeys-lru" >> redis.conf
```

## 🔄 Backup and Recovery

### Database Backup

```bash
# Create backup
docker exec judge0-db pg_dump -U judge0 judge0 > judge0_backup.sql

# Restore backup
docker exec -i judge0-db psql -U judge0 judge0 < judge0_backup.sql
```

### Volume Backup

```bash
# Backup volumes
docker run --rm -v judge0_judge0-db-data:/data -v $(pwd):/backup ubuntu tar czf /backup/judge0-db-backup.tar.gz -C /data .
```

## 🚨 Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   sudo chown -R 999:999 tmp/
   chmod 755 tmp/
   ```

2. **Out of Memory**
   ```bash
   # Increase Docker memory limit
   # Reduce MAX_MEMORY_LIMIT in environment
   ```

3. **Port Conflicts**
   ```bash
   # Change port in docker-compose.yml
   ports:
     - "2359:2358"  # Use different external port
   ```

### Debug Mode

```bash
# Enable debug logging
echo "LOG_LEVEL=debug" >> .env
docker-compose -f docker-compose.judge0.yml restart
```

## 📈 Monitoring

### Prometheus Metrics

Add monitoring to your stack:

```yaml
# Add to docker-compose.judge0.yml
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

## 🔧 Advanced Configuration

### Custom Language Support

```bash
# Add new language to Judge0
docker exec -it judge0-server bash
# Follow Judge0 documentation for adding languages
```

### API Rate Limiting

```yaml
# Add Redis-based rate limiting
environment:
  - ENABLE_RATE_LIMIT=true
  - RATE_LIMIT_PER_MINUTE=60
```

## 💡 Best Practices

1. **Resource Monitoring**: Monitor CPU, memory, and disk usage
2. **Log Rotation**: Configure log rotation to prevent disk space issues
3. **Regular Updates**: Keep Docker images updated
4. **Security Scans**: Regularly scan for vulnerabilities
5. **Backup Strategy**: Implement automated backup procedures

## 🆘 Support

- **Judge0 Documentation**: https://github.com/judge0/judge0
- **Docker Issues**: Check Docker logs and system resources
- **Performance Issues**: Monitor system metrics and adjust limits

---

**✅ Your Judge0 instance should now be running at `http://localhost:2358`**

Test with:
```bash
curl -X POST http://localhost:2358/submissions \
  -H "Content-Type: application/json" \
  -d '{"source_code": "print(\"Hello World\")", "language_id": 71}'
``` 