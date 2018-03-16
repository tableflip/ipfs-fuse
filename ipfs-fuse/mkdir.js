const Fuse = require('fuse-bindings')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:readdir')

module.exports = (ipfs) => {
  return {
    mkdir (path, mode, reply) {
      debug({ path, mode })

      ipfs.files.mkdir(path, (err) => {
        if (err) {
          err = explain(err, 'Failed to create directory')
          debug(err)
          return reply(Fuse.EREMOTEIO)
        }
        reply(0)
      })
    }
  }
}
