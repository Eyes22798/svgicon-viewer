#!/usr/bin/env node

const yargs = require('yargs')
const execa = require('execa')
const open = require('open')

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

;(async function() {
  const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', env: process.env, ...opts })
  await run('pnpm', ['install'])
  await open('http://localhost:3000')
  await run(`node`, ['./.output/server/index.mjs', `--path=${args.path}`])
})()
