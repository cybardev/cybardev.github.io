{
  description = "A Nix-flake-based Zola development environment";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs?ref=nixpkgs-unstable";
  outputs =
    { nixpkgs, ... }:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forEachSupportedSystem =
        f: nixpkgs.lib.genAttrs supportedSystems (system: f { pkgs = import nixpkgs { inherit system; }; });
    in
    {
      devShells = forEachSupportedSystem (
        { pkgs }:
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              wrangler
              zola
              (writeShellScriptBin "zload" ''
                ${pkgs.lib.getExe zola} serve --interface 0.0.0.0 --port 10101 --base-url /
              '')
            ];
          };
        }
      );
    };
}
