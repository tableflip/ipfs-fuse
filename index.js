const Fuse = require('fuse-bindings')
const debug = require('debug')('js-ipfs-fuse:index')
const IpfsApi = require('ipfs-api')
const mkdirp = require('mkdirp')
const Async = require('async')
const explain = require('explain-error')
const createIpfsFuse = require('./ipfs-fuse')

exports.mount = (mountPath, opts, cb) => {
  if (!cb) {
    cb = opts
    opts = {}
  }

  opts = opts || {}
  cb = cb || (() => {})

  Async.auto({
    path (cb) {
      mkdirp(mountPath, (err) => {
        if (err) {
          err = explain(err, 'Failed to create mount point')
          debug(err)
          return cb(err)
        }

        cb()
      })
    },
    ipfs (cb) {
      const ipfs = new IpfsApi(opts.ipfs)

      ipfs.id((err, id) => {
        if (err) {
          err = explain(err, 'Failed to connect to IPFS node')
          debug(err)
          return cb(err)
        }

        debug(id)
        cb(null, ipfs)
      })
    },
    mount: ['path', 'ipfs', (res, cb) => {
      Fuse.mount(mountPath, createIpfsFuse(res.ipfs), opts.fuse, (err) => {
        if (err) {
          err = explain(err, 'Failed to mount IPFS FUSE volume')
          debug(err)
          return cb(err)
        }

        cb(null, {})
      })
    }]
  }, (err) => {
    if (err) {
      debug(err)
      return cb(err)
    }
    cb(null, {})
  })
}

exports.unmount = (mountPath, cb) => {
  cb = cb || (() => {})

  Fuse.unmount(mountPath, (err) => {
    if (err) {
      err = explain(err, 'Failed to unmount IPFS FUSE volume')
      debug(err)
      return cb(err)
    }
    cb()
  })
}
