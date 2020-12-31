module.exports = {
  serverPort: 32,
  localRootDir: 'version',
  build: 'build',
  command: [
    'git clone git@github.com:zhengAnBin/OKR-Admin.git',
    'npm install',
    'npm run start'
  ],
}