{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };


  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      with import nixpkgs { inherit system; }; let
        pname = "kf-website";
        version = "1.0.0";
        deps = pkgs.mkYarnModules {
          inherit pname version;
          name = "${pname}-modules";
          packageJSON = ./package.json;
          yarnLock = ./yarn.lock;
          postBuild = ''
            ln -s $out/node_modules/.bin $out/bin
          '';
        };
      in {
        packages = { inherit deps; };
        devShell = pkgs.mkShell {
          buildInputs = [deps];
          shellHook = ''
            export NODE_PATH=${deps}/node_modules
          '';
        };
        defaultPackage = pkgs.runCommand "build" {
          src = ./.;
          buildInputs = [yarn deps];
        } ''
          export HOME=`pwd`
          export NODE_PATH=${deps}/node_modules
          cp -R $src build && cd build && gatsby build
        '';
      });
}

# Local Variables:
# compile-command: "nix build -L --no-sandbox"
# eval: (add-hook 'after-save-hook 'recompile nil t)
# End:
