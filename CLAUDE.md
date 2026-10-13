# Little Lanterns — Claude Project Guide

Hub site for kids' learning games made by a mom. This repo (GitHub: `nehamo-dev/wordgarden`) hosts ALL new games; don't create new repos for new games.

## Layout

```
index.html            # Little Lanterns homepage: hanging-lantern hero + one tile per game + "More on the way" tile
word-garden/          # Word Garden: sight-word game (single-file HTML)
table-talk/           # Table Talk: dinner trivia (index.html + generated questions.js + audio/)
  index.html
  mocks.html          # original design mocks
shared/nav.js         # persistent "Little Lanterns" menu pill (top-right) injected on every game page
<new-game>/index.html # each new game gets its own folder
```

Peekaworld lives in its own repo/deploy and is linked from a tile: https://peekaworld.vercel.app/#world

## Conventions

- Plain static HTML/CSS/JS, no build step. Single-file games are preferred.
- Preview: `python3 -m http.server 8090` from the repo root (`.claude/launch.json` → `word-garden`).
- Every game page includes `<script src="../shared/nav.js" defer></script>` before `</body>`: a fixed "Little Lanterns" menu pill (top-right) opening a menu with All games + every game. It adds 72px `padding-top` to `body` so it sits in its own strip; don't fight that with fixed top-right elements.
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
- Audio: words, letter names and cheer phrases are pre-recorded clips in `word-garden/audio/*.m4a` (macOS `say`, Samantha), listed in `audio/manifest.js` and played via WebAudio (`playSeq`). This is because Fire tablets (Silk) and some browsers have no usable `speechSynthesis`. Words without a clip fall back to `speechSynthesis`.
- To add clips for new words: add them to `WORDS` in `tools/make_audio.py` and run `python3 tools/make_audio.py` (skips existing clips; `say` sometimes hangs, hence the timeout/retry).
- Audio is woken on the first tap anywhere (`wake` listener). Always start sound from a tap or shortly after one.
- "a" is spoken as "uh" (recorded that way, and `sayable()` for the fallback), because a lone "a" is read as the letter name.
- Default words: the, and, a, go, has, am, of, you. A one-time migration (`wg-added-am-of-you`) added am/of/you to lists already saved on devices.
- Grown-ups screen is behind a simple addition question.

## Table Talk notes

- Question bank lives in `tools/trivia.txt` (one line per question: `category | level | question | correct;wrong;wrong | fun fact`). Never edit `table-talk/questions.js` by hand.
- After editing questions: `python3 tools/make_trivia.py --audio` regenerates `questions.js` (answer order shuffled once with a fixed seed per question id) and records any missing clips into `table-talk/audio/` (question `q-<id>`, fact `f-<id>`, answers `o-<slug>`, phrases `p-<slug>`). It takes a while: about 1,400 clips at 6 in parallel.
- Question ids are `<category>-<nn>` by order within the category, so insert new questions at the END of a category to keep existing ids (and their audio) stable.
- Sight words category (`words`, easy only): uses the same words as Word Garden (the, and, a, am, has, go). Its answers are NEVER read aloud (`READ_ANSWERS`), since hearing them gives the answer away, and they show in larger text. A question written `shown text>>spoken text` in trivia.txt displays one thing and says another (e.g. "Tap the word you hear>>Tap the word: the.").
- Levels: `easy` (ages 4–5) and `tricky` (6–8). Each player gets their own level; no players means one "Our team" playing all levels.
- localStorage: `tt-players`, `tt-cats`, `tt-added-words` (one-time migration that switched on Sight words), `tt-prefs` (count, readAloud), `tt-seen` (question ids played on this device; a pool restarts when used up).
- Read-aloud plays: question, "Is it", answer A, answer B, "or", answer C (each answer highlights as it's read); after answering: cheer or "Not quite! The answer is X", then "Fun fact!" + fact. Missing clips fall back to `speechSynthesis` (player names always do).
