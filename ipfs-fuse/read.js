const Fuse = require('fuse-bindings')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:read')

module.exports = (ipfs) => {
  return {
    read (path, fd, buf, len, pos, reply) {
      debug({ path, fd, len, pos })

      ipfs.files.read(path, { offset: pos, count: len }, (err, part) => {
        if (err) {
          err = explain(err, 'Failed to read path')
          debug(err)
          return reply(Fuse.EREMOTEIO)
        }

        part.copy(buf)
        reply(part.length)
      })
    }
  }
}
