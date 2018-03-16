const Fuse = require('fuse-bindings')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:create')

module.exports = (ipfs) => {
  return {
    write (path, mode, reply) {
      debug({ path })

      ipfs.files.write(path, Buffer.from(''), { create: true }, (err) => {
        if (err) {
          err = explain(err, 'Failed to create file')
          debug(err)
          return reply(Fuse.EREMOTEIO)
        }
        reply(0)
      })
    }
  }
}
