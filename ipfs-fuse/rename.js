const Fuse = require('fuse-bindings')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:rename')

module.exports = (ipfs) => {
  return {
    rename (src, dest, reply) {
      debug({ src, dest })

      ipfs.files.mv([src, dest], (err) => {
        if (err) {
          err = explain(err, 'Failed to mv path')
          debug(err)
          return reply(Fuse.EREMOTEIO)
        }
        reply(0)
      })
    }
  }
}
