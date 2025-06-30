{
  pkgs ? import <nixpkgs> { },
  lib ? pkgs.lib,
}:
pkgs.mkShell {
  packages = with pkgs; [
    ran
  ];
  shellHook = ''
    ${lib.getExe pkgs.ran} -nc -b "0.0.0.0" -p "10101" -r ./site
  '';
}
