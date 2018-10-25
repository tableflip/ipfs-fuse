const createCreate = require('./create')
const createFtruncate = require('./ftruncate')
const createGetattr = require('./getattr')
const createMkdir = require('./mkdir')
const createMknod = require('./mknod')
const createOpen = require('./open')
const createRead = require('./read')
const createReaddir = require('./readdir')
const createRename = require('./rename')
const createRmdir = require('./rmdir')
const createStatfs = require('./statfs')
const createUnlink = require('./unlink')
const createUtimens = require('./utimens')
const createWrite = require('./write')

module.exports = (ipfs, id) => Object.assign(
  createCreate(ipfs, id),
  createFtruncate(ipfs, id),
  createGetattr(ipfs, id),
  createMkdir(ipfs, id),
  createMknod(ipfs, id),
  createOpen(ipfs, id),
  createRead(ipfs, id),
  createReaddir(ipfs, id),
  createRename(ipfs, id),
  createRmdir(ipfs, id),
  createStatfs(ipfs, id),
  createUnlink(ipfs, id),
  createUtimens(ipfs, id),
  createWrite(ipfs, id)
)
