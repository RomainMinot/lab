#!/bin/bash

# Backup .env file if it exists
if [ -f ~/Documents/dev/lab/.env ]; then
    cp ~/Documents/dev/lab/.env /tmp/lab_env_backup
    echo "✅ .env file backed up"
fi

# Clean and copy new files
rm -rf ~/Documents/dev/lab
cp -r ~/actions-runner/_work/lab/* ~/Documents/dev/lab
cd ~/Documents/dev/lab

# Restore .env file if it was backed up
if [ -f /tmp/lab_env_backup ]; then
    cp /tmp/lab_env_backup .env
    rm /tmp/lab_env_backup
    echo "✅ .env file restored"
else
    # Create .env file if it doesn't exist
    echo "VITE_MOVIE_API_TOKEN=your_real_api_token_here" > .env
    echo "⚠️  Please edit .env file with your real API token before deploying!"
fi

# Build the Vue.js app
bun run build

# Copy built files to web directory
sudo rm -rf /var/www/lab/*
sudo cp -r dist/* /var/www/lab/
sudo chown -R www-data:www-data /var/www/lab
sudo chmod -R 755 /var/www/lab

# Reload nginx to serve the new build
sudo nginx -t && sudo systemctl reload nginx

echo "Deployment complete!"