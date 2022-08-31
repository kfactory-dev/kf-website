{
  description = "Nix Flake for bitcoin's verify-commits script";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
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
          src = ./.;
          nativeBuildInputs = with pkgs; [ python3 ];
          installPhase = ''
            cp -R . $out
          '';
          fixupPhase = ''
            patchShebangs $out
          '';
        };

        apps.default = {
          type = "app";
          program = "${defaultPackage}/verify-commits.py";
        };
      });
}
