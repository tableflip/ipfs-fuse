const Fuse = require('fuse-native')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:readdir')

module.exports = (ipfs) => {
  return {
    readdir (path, reply) {
      debug({ path })

      ipfs.files.ls(path, (err, files) => {
        if (err) {
          err = explain(err, 'Failed to ls path')
          debug(err)
          return reply(Fuse.EREMOTEIO)
        }
        reply(0, files.map(f => f.name || f.hash))
      })
    }
  }
}
