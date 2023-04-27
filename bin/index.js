#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const serve = require('./serve')
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

const svgFilePath = path.isAbsolute(args.svgFilePath)
    ? args.svgFilePath
    : path.join(process.cwd(), args.svgFilePath)

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
  await run('yarn', ['clean'])
  
  process.chdir(path.join(__dirname, '../web'))
  await run('yarn')
  await run('yarn', ['build', `--path=${svgFilePath}`])

  const injectCode = `
    window.icons = ${JSON.stringify(icons || [])}
  `
  const injectReg = /\/\*\{\{inject\}\}\*\//
  let html = fs.readFileSync(
    path.join(__dirname, '../dist/index.html'),
    'utf8'
  )
  html = html.replace(injectReg, injectCode)
  console.clear()
  serve(html)
})()
