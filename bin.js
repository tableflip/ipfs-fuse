#!/usr/bin/env node

const Os = require('os')
const Path = require('path')
const IpfsFuse = require('./')

const mountPath = process.platform !== 'win32'
  ? Path.join(Os.homedir(), 'IPFS')
  : 'I:\\'

IpfsFuse.mount(mountPath, {
  ipfs: {},
  fuse: { displayFolder: true, force: true }
}, (err) => {
  if (err) return console.error(err.message)
  console.log(`Mounted IPFS filesystem on ${mountPath}`)
})

let destroyed = false

process.on('SIGINT', () => {
  if (destroyed) return

  destroyed = true

  IpfsFuse.unmount(mountPath, (err) => {
    if (err) return console.error(err.message)
    console.log(`Unmounted IPFS filesystem at ${mountPath}`)
  })
})
