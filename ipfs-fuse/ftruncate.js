const Fuse = require('fuse-bindings')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:ftruncate')

module.exports = (ipfs) => {
  return {
    ftruncate (path, fd, size, reply) {
      debug({ path })

      if (size === 0) {
        ipfs.files.write(path, Buffer.from(''), { truncate: true }, (err) => {
          if (err) {
            err = explain(err, 'Failed to truncate file')
            debug(err)
            return reply(Fuse.EREMOTEIO)
          }
          reply(0)
        })
      } else {
        // TODO: read size bytes then write with truncate true
        reply(Fuse.ENOTSUP)
      }
    }
  }
}
