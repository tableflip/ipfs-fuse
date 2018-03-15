#!/usr/bin/env node

const Os = require('os')
const Path = require('path')
const IpfsFuse = require('./')

const mountPath = process.platform !== 'win32'
  ? Path.join(Os.homedir(), 'IPFS')
  : 'I:\\'

IpfsFuse.mount(mountPath, {
  ipfs: {},
  fuse: { displayFolder: true }
}, (err) => {
  if (err) return console.error(err.message)
  console.log('IPFS filesystem mounted on ' + mountPath)
})

process.on('SIGINT', () => {
  IpfsFuse.unmount(mountPath, (err) => {
    if (err) return console.error(err.message)
    console.log(`IPFS filesystem at ${mountPath} unmounted`)
  })
})
