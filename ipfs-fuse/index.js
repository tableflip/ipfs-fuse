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

module.exports = (ipfs) => Object.assign(
  createCreate(ipfs),
  createFtruncate(ipfs),
  createGetattr(ipfs),
  createMkdir(ipfs),
  createMknod(ipfs),
  createOpen(ipfs),
  createRead(ipfs),
  createReaddir(ipfs),
  createRename(ipfs),
  createRmdir(ipfs),
  createStatfs(ipfs),
  createUnlink(ipfs),
  createUtimens(ipfs),
  createWrite(ipfs)
)
