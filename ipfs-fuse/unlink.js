const Fuse = require('fuse-bindings')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:unlink')

module.exports = (ipfs) => {
  return {
    unlink (path, reply) {
      debug({ path })

      ipfs.files.rm(path, (err) => {
        if (err) {
          err = explain(err, 'Failed to delete file')
          debug(err)
          return reply(Fuse.EREMOTEIO)
        }
        reply(0)
      })
    }
  }
}
