#!/usr/bin/env node
const open = require('open')
const yargs = require('yargs')
const execa = require('execa')
const path = require('path')

const args = yargs
  .usage(
    '$0 [svgFilePath]',
    'Start vue-svgicon viewer'
  )
  .options('svgFilePath', {
    alias: 'path',
    describe: 'SVG source file folder.',
    type: 'string',
  })
  .help('help')
  .alias('h', 'help').argv

  const svgFilePath = args.path
    ? path.isAbsolute(args.path) ? args.path : path.resolve(args.path)
    : path.resolve(process.cwd(), './assets'); // 本地文件夹的路径

  const resolve = (context) => {
    return path.join(__dirname, context)
  }

;(async function() {
  const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', env: process.env, ...opts })

  process.chdir(path.join(__dirname, '../.output/server'))
  await run('pnpm', ['install'])
  process.chdir(path.join(__dirname, '../'))
  console.clear()
  try {
    await open('http://localhost:3000')
  } catch(e) {
    console.log(e)
  }
 
  await run(`node`, [resolve('../.output/server/index.mjs'), `--path=${svgFilePath}`])
})()
