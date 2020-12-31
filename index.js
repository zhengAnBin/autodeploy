const express = require('express')
const { exec } = require('child_process')
const fs = require('fs')

const app = express()
const { localRootDir, serverPort, command, build } = require('./config')
const { _createCmd } = require('./utils')

app.use(express.static(localRootDir))

// 开启 cors 跨站资源共享
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next();
})

app.get('/', async (req, res, next) => {
  res.sendFile(`${__dirname}/${localRootDir}/${build}/index.html`)
})

// 接收 GitHub 触发的 webhook 钩子
// 拉取 GitHub 仓库源码
// 分版本管理起来
// 执行 npm install 命令
// run
app.post('/', async (req, res, next) => {
  // await res.send('success')
  const cmd = _createCmd(localRootDir, command)
  exec(cmd, (err) => {
    if(!err) {
      res.send('success!')
      fs.writeFileSync('./log.txt', `${new Date()} success!`)
    } else {
      console.log(err)
      res.send('error!')
    }
  })
})

app.listen(serverPort, () => {
  console.log(`Example app listening at http://localhost:${serverPort}`)
})