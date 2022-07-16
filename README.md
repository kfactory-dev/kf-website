<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  kf-website
</h1>

## Development

Requires [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) package manager.

Install dependencies

```shell
yarn
```

Start a dev server and open the browser

``` shell
yarn start -o
```

Build the website and serve it locally

``` shell
yarn build && yarn serve -o
```

### Verified commits

First you must fetch GitHub signing key and mainteiners' public keys from the public keyservers.

```shell
# Fetch GitHub commit signing key
gpg --keyserver hkp://keys.gnupg.net --recv-keys 4AEE18F83AFDEB23

# Fetch maintainers' GPG keys
gpg --keyserver hkps://keys.openpgp.org --recv-keys $(<scripts/verify-commits/trusted-keys)
```

Then you can verify the commit tree with the following command:
  
```shell
./scripts/verify-commits/verify-commits.sh [<commit-hash>]
```


## Nix Flake

Requires [NixOS](https://nixos.org/) or [Nix](https://nix.dev/) package manager with [flakes enabled](https://nixos.wiki/wiki/Flakes#Installing_flakes).

Enter the development environment installing `node`, `yarn`, and `ipfs`

``` shell
nix develop
```

Create a reproducible build

``` shell
nix build
```

## IPFS

Requires [ipfs-cli](https://docs.ipfs.io/how-to/command-line-quick-start/). 

Initialize a new IPFS configuration (if not already exists)

``` shell
ipfs init
```

Start IPFS daemon in the background 

``` shell
ipfs daemon &
```

### Generate hash

When using `yarn build`

``` shell
ipfs add -rQ public
```

When using `nix build`

``` shell
ipfs add -rQ $(readlink result) 
```

### Pin the website using Pinata

[Create an API key](https://app.pinata.cloud/keys) with following permissions

- Pinning Services API
  - Pins
    - [x] addPinObject
    - [x] getPinObject

Configure a remote pinning service

``` shell
ipfs pin remote service add pinata https://api.pinata.cloud/psa <PINATA_JWT>
```

Pin the website

``` shell
ipfs pin remote add --service=pinata <IPFS_HASH>
```
