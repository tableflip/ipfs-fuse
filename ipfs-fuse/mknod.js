const Fuse = require('fuse-bindings')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:mknod')

module.exports = (ipfs) => {
  return {
    mknod (path, mode, dev, reply) {
      debug({ path })

      ipfs.files.write(path, Buffer.from(''), { create: true }, (err) => {
        if (err) {
          err = explain(err, 'Failed to create device node')
          debug(err)
          return reply(Fuse.EREMOTEIO)
        }
        reply(0)
      })
    }
  }
}
