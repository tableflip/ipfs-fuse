const Fuse = require('fuse-bindings')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:read')

module.exports = (ipfs) => {
  return {
    read (path, fd, buf, len, pos, reply) {
      debug({ path, fd, len, pos })

      // FIXME: count and length because https://github.com/ipfs/js-ipfs-mfs/issues/21
      ipfs.files.read(path, { offset: pos, count: len, length: len }, (err, part) => {
        if (err) {
          err = explain(err, 'Failed to read path')
          debug(err)
          return reply(Fuse.EREMOTEIO)
        }

        // FIXME: this should always return a buffer js-ipfs-api does not for empty
        if (Array.isArray(part) && !part.length) {
          part = Buffer.alloc(0)
        }

        part.copy(buf)
        reply(part.length)
      })
    }
  }
}
