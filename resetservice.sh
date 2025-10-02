pm2 stop lab
pm2 delete lab
pm2 save
rm -rf ~/Documents/dev/lab
cp -r ~/actions-runner/_work/lab/* ~/Documents/dev/lab
cd ~/Documents/dev/lab
pm2 start ./dist/index.html --name lab
pm2 save