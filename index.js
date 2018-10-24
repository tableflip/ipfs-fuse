const Fuse = require('fuse-bindings')
const debug = require('debug')('ipfs-fuse:index')
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
      if (opts.daemon) return cb(null, require('ipfs-api')(opts.ipfs))

      const Ipfs = require('ipfs')
      const ipfs = new Ipfs(opts.ipfs)

      const onReady = () => {
        ipfs.removeListener('ready', onReady)
        ipfs.removeListener('error', onError)
        cb(null, ipfs)
      }

      const onError = err => {
        ipfs.removeListener('ready', onReady)
        ipfs.removeListener('error', onError)
        cb(err)
      }

      ipfs.on('ready', onReady).on('error', onError)
    },
    connected: ['ipfs', (res, cb) => {
      res.ipfs.id((err, id) => {
        if (err) {
          err = explain(err, 'Failed to connect to IPFS node')
          debug(err)
          return cb(err)
        }

        debug(id)
        cb()
      })
    }],
    mount: ['path', 'ipfs', 'connected', (res, cb) => {
      Fuse.mount(mountPath, createIpfsFuse(res.ipfs), opts.fuse, (err) => {
        if (err) {
          err = explain(err, 'Failed to mount IPFS FUSE volume')
          debug(err)
          return cb(err)
        }

        cb()
      })
    }]
  }, (err, res) => {
    if (err) {
      debug(err)
      return cb(err)
    }

    cb(null, {
      unmount (cb) {
        cb = cb || (() => {})

        Async.parallel([
          cb => {
            Fuse.unmount(mountPath, err => {
              if (err) {
                err = explain(err, 'Failed to unmount IPFS FUSE volume')
                debug(err)
                return cb(err)
              }
              cb()
            })
          },
          cb => {
            // Do not stop a daemon...
            if (opts.daemon) return cb()

            res.ipfs.stop(err => {
              if (err) {
                err = explain(err, 'Failed to stop IPFS node')
                debug(err)
                return cb(err)
              }
              cb()
            })
          }
        ], cb)
      }
    })
  })
}
