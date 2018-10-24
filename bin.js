#!/usr/bin/env node

const Os = require('os')
const Path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const IpfsFuse = require('./')

const mountPath = process.platform !== 'win32'
  ? Path.join(Os.homedir(), 'IPFS')
  : 'I:\\'

let fileSystem

IpfsFuse.mount(mountPath, {
  ipfs: argv['api-addr'] || {},
  fuse: { displayFolder: true, force: true },
  daemon: argv.daemon
}, (err, fs) => {
  if (err) return console.error(err.message)
  console.log(`Mounted IPFS filesystem on ${mountPath}`)
  fileSystem = fs
})

let destroyed = false

process.on('SIGINT', () => {
  if (destroyed) return

  destroyed = true

  if (!fileSystem) return

  fileSystem.unmount(err => {
    if (err) return console.error(err.message)
    console.log(`Unmounted IPFS filesystem at ${mountPath}`)
  })
})
