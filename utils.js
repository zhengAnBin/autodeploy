const fs = require('fs')

module.exports = {
  _init: (dir) => {
    fs.access(__dirname + dir, fs.constants.F_OK, async (err) => {
      // console.log(__dirname + dir)
      if(err) {
        await fs.mkdirSync(__dirname + dir, { recursive: true })
      }
    })
  },
  
  _createCmd: (localRootDir, commandList) => {
    if(Array.isArray(commandList)) {
      const slef = Array.from(commandList)
      slef[0] = `${slef[0]} ${localRootDir} && cd ${localRootDir}`
      return slef.join(` && `)
    } else {
      return ''
    }
  }
}