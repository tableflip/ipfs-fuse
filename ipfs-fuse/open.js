// const Fuse = require('fuse-native')
const debug = require('debug')('ipfs-fuse:open')

module.exports = (ipfs, fds) => {
  return {
    open (path, flags, reply) {
      debug({ path, flags })
      reply(0, 42)
    }
  }
}
