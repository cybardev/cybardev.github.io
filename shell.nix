{
  pkgs ? import <nixpkgs> { },
  lib ? pkgs.lib,
}:
pkgs.mkShell {
  packages = with pkgs; [
    zola
    (writeShellScriptBin "zload" ''
      ${lib.getExe zola} serve --interface 0.0.0.0 --port 10101 --base-url /
    '')
    wrangler
  ];
}
