# Little Lanterns — Claude Project Guide

Hub site for kids' learning games made by a mom. This repo (GitHub: `nehamo-dev/wordgarden`) hosts ALL new games; don't create new repos for new games.

## Layout

```
index.html            # Little Lanterns homepage: hanging-lantern hero + one tile per game + "More on the way" tile
word-garden/          # Word Garden: sight-word game (single-file HTML)
  index.html
  mocks.html          # original design mocks
shared/nav.js         # persistent lantern menu (bottom-right) injected on every game page
<new-game>/index.html # each new game gets its own folder
```

Peekaworld lives in its own repo/deploy and is linked from a tile: https://peekaworld.vercel.app/#world

## Conventions

- Plain static HTML/CSS/JS, no build step. Single-file games are preferred.
- Preview: `python3 -m http.server 8090` from the repo root (`.claude/launch.json` → `word-garden`).
- Every game page includes `<script src="../shared/nav.js" defer></script>` before `</body>`: a fixed lantern button (bottom-right) opening a menu with All games + every game. Keep the bottom-right corner free in game layouts.
- Register each new game in the `GAMES` array in `shared/nav.js` (and add its tile on the hub).
- Games can also link back to the hub with `href="../"` (Word Garden: the bee logo).
- Each game prefixes its `localStorage` keys (Word Garden: `wg-`), since every game shares one origin.
- New game: add a folder, include `shared/nav.js`, add it to `GAMES` in `shared/nav.js`, add a tile in root `index.html` before the "More on the way" tile, update README's game table.
- Workflow the user likes for new games: short one-page description → mocks → build, with approval at each step.

## Design system (shared across games)

- Background `#FFF6EA` cream with soft radial blobs (peach, lilac, mint). Ink `#3B3355`, soft text `#7A7194`.
- Accents: coral `#FF8B7B`, sun `#FFC95E`, mint `#79D2B2`, sky `#8CC4FF`, lilac `#B7A3F3`, pink `#FFB3C7`.
- Fonts: Outfit for UI; Lexend for words kids read; Fraunces italic for accents on the hub only. Hub mascot/logo is a smiling paper lantern (`#lan` SVG in root index.html).
- Chunky press-able buttons (solid bottom shadow that compresses on press), big rounded corners, hand-drawn inline SVG art. No photos, no emoji.
- Gentle feedback: wrong answers wiggle and say "try again". No fail screens.
- Read-aloud uses the device's `speechSynthesis`; sound effects use WebAudio tones (no audio files).

## Word Garden notes

- Scores per word are 0–5 → plant stages: seed (0), sprout (1–2), bud (3–4), flower (5).
- A word only gains a point if it wasn't missed earlier in the same round; a miss costs at most one point per round.
- "a" is spoken as "uh" (`sayable()`), because TTS reads a lone "a" as the letter name.
- Grown-ups screen is behind a simple addition question.
