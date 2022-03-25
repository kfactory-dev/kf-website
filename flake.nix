{
  description = "Nix Flake for kf-website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
    nix-filter.url = "github:numtide/nix-filter";
  };

  outputs = { self, nixpkgs, flake-utils, nix-filter }:
    flake-utils.lib.eachDefaultSystem (system:
      with import nixpkgs { inherit system; };
      let
        project = pkgs.callPackage ./yarn-project.nix { } {
          src = nix-filter.lib {
            root = ./.;
            include = (map nix-filter.lib.inDirectory [
              ".yarn"
              "plugins"
              "src"
              "static"
            ]) ++ [
              ".yarnrc.yml"
              "gatsby-browser.js"
              "gatsby-config.js"
              "gatsby-node.js"
              "gatsby-ssr.js"
              "graphql-types.ts"
              "package.json"
              "postcss.config.js"
              "tsconfig.json"
              "yarn.lock"
            ];
          };
        };
      in rec {
        defaultPackage = project.overrideAttrs (oldAttrs: {
          buildInputs = oldAttrs.buildInputs ++ [ pkgs.tree pkgs.python3 ];
          buildPhase = "tree src; yarn build";
          installPhase = "mv public $out";
        });

        packages.website-ipfs = defaultPackage.overrideAttrs (oldAttrs: {
          buildPhase = "GATSBY_IPFS=true yarn build --prefix-paths";
        });

        devShell = pkgs.mkShell { buildInputs = [ yarn ipfs ]; };
      });
}
