# Docker Port Configuration Changes

## Issue
The original Docker configuration was using ports that were already in use on the system, specifically port 5000 was detected as being in use.

## Changes Made

### 1. Docker Compose File
Modified `docker-compose.yml` to use different ports:
- Changed backend port from 5012:5012 to 5050:5050
- Changed frontend port from 3000:80 to 8080:80

### 2. Backend Configuration
- Updated `.env` file to use PORT=5050
- Modified `server.js` to use PORT=5050 as the default port

### 3. Frontend Configuration
- Updated `.env` file to point to the new backend API URL: http://localhost:5050/api

## Current Status
All services are now running properly:
- MongoDB: accessible on port 27017
- Backend API: accessible on port 5050
- Frontend: accessible on port 8080

## How to Access
- Frontend application: http://localhost:8080
- Backend API: http://localhost:5050
- API endpoints: http://localhost:5050/api/blogs

## Docker Architecture
The Docker installation is now using the ARM64 version, which is optimized for Apple Silicon (M1/M2) Macs.
