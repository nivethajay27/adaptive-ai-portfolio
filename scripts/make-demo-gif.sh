#!/usr/bin/env bash
set -euo pipefail

INPUT_MOV="${1:-assets/demo.mov}"
OUTPUT_GIF="${2:-assets/demo.gif}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required. Install with: brew install ffmpeg"
  exit 1
fi

if [ ! -f "$INPUT_MOV" ]; then
  echo "Input video not found: $INPUT_MOV"
  echo "Record one first (QuickTime or macOS screen recording) and save as assets/demo.mov"
  exit 1
fi

TMP_PALETTE="$(mktemp /tmp/demo-palette-XXXXXX.png)"
ffmpeg -y -i "$INPUT_MOV" -vf "fps=12,scale=1280:-1:flags=lanczos,palettegen" "$TMP_PALETTE"
ffmpeg -y -i "$INPUT_MOV" -i "$TMP_PALETTE" -lavfi "fps=12,scale=1280:-1:flags=lanczos[x];[x][1:v]paletteuse" "$OUTPUT_GIF"
rm -f "$TMP_PALETTE"

echo "Created $OUTPUT_GIF"
