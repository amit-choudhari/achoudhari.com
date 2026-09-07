#!/usr/bin/env bash
set -euo pipefail

# Download author/open-access copies of publication PDFs and available slides
# into the static site so achoudhari.com can serve them directly.
#
# Optional:
#   bash scripts/fetch-publications.sh /path/to/specdefender-accepted-version.pdf
#
# This copies your local SpecDefender author/accepted version into the site
# rather than depending on the ACM Digital Library at runtime.

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PAPERS="$ROOT/public/papers"
SLIDES="$ROOT/public/slides"
INDEX="$ROOT/public/index.html"
SPECDEFENDER_SRC="${1:-}"

mkdir -p "$PAPERS" "$SLIDES"

fetch() {
  local url="$1"
  local out="$2"
  echo "Fetching $(basename "$out")"
  curl -fL --retry 3 --retry-delay 1 "$url" -o "$out"
}

fetch "https://syssec.cispa.de/papers/memclave-usenix2026.pdf" \
      "$PAPERS/memclave-usenix26.pdf"

fetch "https://cispa.saarland/group/rossow/papers/nicraft-esorics2025.pdf" \
      "$PAPERS/nicraft-esorics25.pdf"

fetch "https://tschlueter.com/research/publications/23-fetchbench/ccs23-fetchbench.pdf" \
      "$PAPERS/fetchbench-ccs23.pdf"

fetch "https://eprint.iacr.org/2022/029.pdf" \
      "$PAPERS/cryscanner-nics21.pdf"

fetch "https://raw.githubusercontent.com/amit-choudhari/NICraft/main/slides/NICraft_esorics.pdf" \
      "$SLIDES/nicraft-esorics25.pdf"

fetch "https://tschlueter.com/research/publications/23-fetchbench/ccs23-fetchbench-slides.pdf" \
      "$SLIDES/fetchbench-ccs23.pdf"

if [[ -n "$SPECDEFENDER_SRC" ]]; then
  if [[ ! -f "$SPECDEFENDER_SRC" ]]; then
    echo "SpecDefender PDF not found: $SPECDEFENDER_SRC" >&2
    exit 1
  fi
  echo "Copying specdefender-ashes22.pdf"
  cp "$SPECDEFENDER_SRC" "$PAPERS/specdefender-ashes22.pdf"
fi

python3 - "$INDEX" "$PAPERS/specdefender-ashes22.pdf" <<'PY'
from pathlib import Path
import sys

index = Path(sys.argv[1])
specdefender = Path(sys.argv[2])
text = index.read_text(encoding="utf-8")

replacements = {
    "https://syssec.cispa.de/papers/memclave-usenix2026.pdf": "/papers/memclave-usenix26.pdf",
    "https://cispa.saarland/group/rossow/papers/nicraft-esorics2025.pdf": "/papers/nicraft-esorics25.pdf",
    "https://tschlueter.com/research/publications/23-fetchbench/ccs23-fetchbench.pdf": "/papers/fetchbench-ccs23.pdf",
    "https://eprint.iacr.org/2022/029.pdf": "/papers/cryscanner-nics21.pdf",
    "https://raw.githubusercontent.com/amit-choudhari/NICraft/main/slides/NICraft_esorics.pdf": "/slides/nicraft-esorics25.pdf",
    "https://tschlueter.com/research/publications/23-fetchbench/ccs23-fetchbench-slides.pdf": "/slides/fetchbench-ccs23.pdf",
}

for old, new in replacements.items():
    text = text.replace(old, new)

if specdefender.exists():
    text = text.replace(
        "https://dl.acm.org/doi/pdf/10.1145/3560834.3563830",
        "/papers/specdefender-ashes22.pdf",
    )

index.write_text(text, encoding="utf-8")
PY

echo
echo "Publication assets prepared."
echo "Review with: git status"
echo "Then commit public/papers, public/slides, and public/index.html."
