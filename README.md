# Playnest

Little learning games for curious kids, made by a mom.

This repo is the home for all of them. The front page (`index.html`) is the Playnest homepage with a tile for each game, and each game lives in its own folder.

## Games

| Game | Folder / link | What it teaches |
|---|---|---|
| Word Garden | [`word-garden/`](word-garden/) | Sight words, through six mini-games. Each word grows into a flower as it's learned. |
| Peekaworld | [peekaworld.vercel.app](https://peekaworld.vercel.app/#world) (separate repo) | The world, the USA and space, with a Find It game |

## Running it

Plain HTML with no build step. Serve the folder:

```bash
python3 -m http.server 8090
```

Then visit http://localhost:8090.

## Adding a game

1. Create a folder, e.g. `counting-stars/`, with its own `index.html`.
2. Add a tile for it in the root `index.html`, before the "More on the way" tile.
3. Give the game a link back to `../` so kids can get home.
4. Prefix its `localStorage` keys (Word Garden uses `wg-`), because every game shares one website.
