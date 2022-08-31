{
  description = "Nix Flake for bitcoin's verify-commits script";

  inputs = {
    nixpkgs = {
      # nixpkgs unstable is required for sparse checkout support in `fetchgit`
      url = "github:NixOS/nixpkgs/nixos-22.05";
    };
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      with import nixpkgs { inherit system; }; rec {
        defaultPackage = stdenv.mkDerivation {
          name = "verify-commits";
          src = pkgs.fetchgit {
            url = "https://github.com/bitcoin/bitcoin.git";
            sha256 = "sha256-v8Hi/ez9QJ/sSvuu6C/KhkZqMA47qo1Hps8LVdQLOX4=";
            sparseCheckout = ''
              contrib/verify-commits
            '';
          };
          nativeBuildInputs = with pkgs; [ python3 ];
          patches = [
            ./0002-preserve-input-newline.patch
            ./0003-verbose-output.patch
            ./0004-relative-paths.patch
          ];
          installPhase = ''
            cp -R ./contrib/verify-commits $out
          '';
          fixupPhase = ''
            cp ${./trusted-git-root} $out/trusted-git-root
            cp ${./trusted-keys} $out/trusted-keys
            patchShebangs $out
          '';
        };

        defaultApp = {
          type = "app";
          program = "${defaultPackage}/verify-commits.py";
        };
      });
}
