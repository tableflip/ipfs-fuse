const Fuse = require('fuse-bindings')
const explain = require('explain-error')
const debug = require('debug')('ipfs-fuse:write')

module.exports = (ipfs) => {
  return {
    write (path, fd, buf, len, pos, reply) {
      debug({ path })

      // FIXME: count and length because https://github.com/ipfs/js-ipfs-mfs/issues/21
      ipfs.files.write(path, buf, { offset: pos, count: len, length: len }, (err) => {
        if (err) {
          err = explain(err, 'Failed to write to file')
          debug(err)
          return reply(Fuse.EREMOTEIO)
        }
        reply(len)
      })
    }
  }
}
