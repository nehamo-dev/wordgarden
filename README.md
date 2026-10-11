# Word Garden

Learn sight words! A calm, pretty game for early readers. Each sight word is a seed in your garden, and it grows into a sprout, a bud and finally a flower as your kid gets it right across different games.

## Games

| Game | What it practises |
|---|---|
| Hear & Find | Hear a word, tap the matching card |
| Bubble Pop | Pop every bubble with the target word |
| Word Builder | Build the word from letter tiles |
| Missing Letter | Pick the letter that's missing |
| Match Up | Memory flip cards, each word read aloud |
| Read to Me | Read the word out loud; "Spell it" lights up each letter |
| Surprise Mix | A random mix of all of the above |

Words your kid misses come up more often. A wrong answer is a gentle wiggle and "try again", never a fail screen.

## Setting the words

Tap the sliders button (top right) and answer the grown-ups question. Type words and press Enter, or paste a whole list. Default words: *the, and, a, go, has*.

Progress and stars are saved in the browser on that device.

## Running it

It's a single file with no build step. Open `index.html` in any browser, or serve the folder:

```bash
python3 -m http.server 8090
```

Then visit http://localhost:8090. Works best on a tablet. The voice uses the device's built-in text-to-speech.

`mocks.html` holds the original design mocks.
