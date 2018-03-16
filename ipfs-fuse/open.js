// const Fuse = require('fuse-bindings')
const debug = require('debug')('ipfs-fuse:open')

module.exports = (ipfs) => {
  return {
    open (path, flags, reply) {
      debug({ path, flags })
      reply(0, 42) // 42 is an fd
    }
  }
}
