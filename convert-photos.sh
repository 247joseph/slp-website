#!/usr/bin/env bash
# Converts the source photos you drop in to optimized .webp in the right places.
# Drop originals (jpg/jpeg/png/heic — any of these) into _incoming/ using these
# base names: office, nihal, farsan, drishya, najiya, ashna
# Then run this script. (Or just tell Claude and it will run the conversion.)
set -e
cd "$(dirname "$0")"
SRC="_incoming"
mkdir -p assets/img/team "$SRC"

convert_one () {
  local base="$1" dest="$2" maxw="$3"
  local f
  f=$(ls "$SRC/$base".* 2>/dev/null | head -1 || true)
  if [ -z "$f" ]; then echo "  - $base: (no source found, skipped)"; return; fi
  convert "$f" -auto-orient -resize "${maxw}x>" -quality 82 "$dest"
  echo "  - $base -> $dest"
}

echo "Converting office photo:"
convert_one office assets/img/office.webp 1400
echo "Converting team photos:"
for n in nihal farsan drishya najiya ashna; do
  convert_one "$n" "assets/img/team/$n.webp" 800
done
echo "Done."
