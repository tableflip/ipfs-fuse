const createGetattr = require('./getattr')
const createMkdir = require('./mkdir')
const createOpen = require('./open')
const createRead = require('./read')
const createReaddir = require('./readdir')
const createRename = require('./rename')
const createRmdir = require('./rmdir')
const createUnlink = require('./unlink')

module.exports = (ipfs) => Object.assign(
  createGetattr(ipfs),
  createMkdir(ipfs),
  createOpen(ipfs),
  createRead(ipfs),
  createReaddir(ipfs),
  createRename(ipfs),
  createRmdir(ipfs),
  createUnlink(ipfs)
)
