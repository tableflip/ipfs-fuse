const createGetattr = require('./getattr')
const createOpen = require('./open')
const createRead = require('./read')
const createReaddir = require('./readdir')
const createRename = require('./rename')

module.exports = (ipfs) => Object.assign(
  createGetattr(ipfs),
  createOpen(ipfs),
  createRead(ipfs),
  createReaddir(ipfs),
  createRename(ipfs)
)
