# ipfs-fuse

> Mount IPFS MFS as a FUSE volume using Node.js

**EXPERIMENTAL! Currently you can only view, open, rename and move files and folders.**

## Install

See [INSTALL.md] for full installation instructions.

Install FUSE, Node.js and IPFS, and start your IPFS daemon. Then:

```sh
npm install -g ipfs-fuse
```

You need Python 2 to install, so you might need to tell gyp the path to Python2. For me it looked like this:

```sh
npm_config_python=/usr/local/opt/python2/bin/python2 npm i -g ipfs-fuse
```

## Usage

Mount IPFS MFS on `~/IPFS` or `I://` (windows).

```sh
ipfs-fuse
```
