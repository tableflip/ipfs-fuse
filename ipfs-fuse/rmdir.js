const Fuse = require('fuse-bindings')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:rmdir')

module.exports = (ipfs) => {
  return {
    rmdir (path, reply) {
      debug({ path })

      ipfs.files.rm(path, { recursive: true }, (err) => {
        if (err) {
          err = explain(err, 'Failed to delete directory')
          debug(err)
          return reply(Fuse.EREMOTEIO)
        }
        reply(0)
      })
    }
  }
}
