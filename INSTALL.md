# Install

## FUSE

**Linux**

```sh
sudo apt-get install fuse
```

**macOS**

Download and install from https://osxfuse.github.io/

## Node.js

Install Node.js from https://nodejs.org/.

## IPFS

OPTIONAL! You do not need to install IPFS at all because `ipfs-fuse` comes bundled with a JS IPFS that will run by default.

`ipfs-fuse` also works with both `go-ipfs` and `js-ipfs` daemons:

### JS

Install and run the `js-ipfs` daemon:

```sh
npm install ipfs
jsipfs daemon
```

Note: to connect to a JS daemon, you must pass the API multiaddr to `ipfs-fuse` when starting. e.g. `--api-addr=/ip4/127.0.0.1/tcp/5002`

### Go

Install and run the `go-ipfs` daemon by downloading from https://ipfs.io/.

```sh
ipfs daemon
```

## IPFS FUSE

```sh
npm install --global ipfs-fuse
```

You need Python 2 to install, so you might need to tell gyp the path to Python2. For me it looked like this:

```sh
npm_config_python=/usr/local/opt/python2/bin/python2 npm i -g ipfs-fuse
```

## Dev

Clone the project and install project dependencies:

```sh
npm install
```

You need Python 2 to install, so you might need to tell gyp the path to Python2. For me it looked like this:

```sh
npm_config_python=/usr/local/opt/python2/bin/python2 npm i
```
