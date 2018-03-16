const Fuse = require('fuse-bindings')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:utimens')

module.exports = (ipfs) => {
  return {
    utimens (path, atime, mtime, reply) {
      debug({ path })

      ipfs.files.stat(path, (err) => {
        if (err && err.message === 'file does not exist') {
          ipfs.files.write(path, Buffer.from(''), { create: true }, (err) => {
            if (err) {
              err = explain(err, 'Failed to create file')
              debug(err)
              return reply(Fuse.EREMOTEIO)
            }
            reply(0)
          })
        }
        reply(0)
      })
    }
  }
}
