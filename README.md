# ipfs-fuse

[![dependencies Status](https://david-dm.org/tableflip/ipfs-fuse/status.svg)](https://david-dm.org/tableflip/ipfs-fuse) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Mount IPFS MFS as a FUSE volume using Node.js

**EXPERIMENTAL! Most things you can do, some things will explode.**

Demo: https://youtu.be/jXkTEBdM6aA

## Install

[Full installation instructions](./INSTALL.md) are also available.

Install FUSE, Node.js and IPFS (the Go version), and start your IPFS daemon. Then:

```sh
npm install -g ipfs-fuse
```

You need Python 2 to install, so you might need to tell gyp the path to Python2. For me it looked like this:

```sh
npm_config_python=/usr/local/opt/python2/bin/python2 npm i -g ipfs-fuse
```

## Usage

Mount JS IPFS MFS on `~/IPFS` or `I://` (windows).

```sh
ipfs-fuse
```

### Connect to running daemon

```sh
ipfs-fuse --daemon
```

You can also specify the multiaddr your daemon is running on for if you're connecting to a JS IPFS daemon for example:

```sh
ipfs-fuse --daemon --api-addr=/ip4/127.0.0.1/tcp/5002
```

## Contribute

Feel free to dive in! [Open an issue](https://github.com/alanshaw/ipfs-fuse/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Alan Shaw
