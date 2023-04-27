const path = require('path')
const execa = require('execa')

const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', env: process.env, ...opts })
process.chdir(path.join(__dirname, '../web'))
run('yarn').then(() => {
  run('yarn', ['build'])
})
