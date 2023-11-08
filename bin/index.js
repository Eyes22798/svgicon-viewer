#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
// const serve = require('./serve')
const execa = require('execa')

const args = yargs
  .usage(
      '$0 <svgFilePath> [metaFile]',
      'Start vue-svgicon viewer',
      (yarg) => {
          yarg.positional('svgFilePath', {
              describe: 'SVG source file folder.',
          })
      }
  )
  .help('help')
  .alias('h', 'help').argv

const svgFilePath = path.isAbsolute(process.env.__SVG_ICON_PATH__)
  ? process.env.__SVG_ICON_PATH__
  : path.join(process.cwd(), process.env.__SVG_ICON_PATH__)

;(async function() {
  let files = glob.sync(path.join(svgFilePath, '**/*.svg'))
  let icons = []
  for (let i = 0; i < files.length; i++) {
    let filename = files[i]
    icons.push({
      name: path.parse(filename).name,
      path: files[i]
    })
  }

  const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', env: process.env, ...opts })
  // await run('yarn', ['clean'])
  
  // process.chdir(path.join(__dirname, '../web'))
  // await run('yarn')
  await run('yarn', ['serve'])

  const injectCode = `
    window.icons = ${JSON.stringify(icons || [])}
  `
  const injectReg = /\/\*\{\{inject\}\}\*\//
  let html = fs.readFileSync(
    path.join(__dirname, '../public/index.html'),
    'utf8'
  )
  html = html.replace(injectReg, injectCode)
  // console.clear()
  // serve(html)
})()
