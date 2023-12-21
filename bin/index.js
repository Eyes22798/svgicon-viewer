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

  const resolve = (context) => {
    return path.join(__dirname, context)
  }

;(async function() {
  const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', env: process.env, ...opts })
  await open('http://localhost:3000')

  await run(`node`, [resolve('../.output/server/index.mjs'), `--path=${args.path}`])
})()
