# glitchy

dead simple image glitch effects. [try it out](https://kiyosh11.github.io/glitchy-js/)


## usage

Just download `glitchy.js` and include it in your HTML:

```html
<script src="glitchy.js"></script>
```

then use it:

```js
const img = document.querySelector('img')

// rgb shift effect
img.src = glitch.rgb(img, 20) // amount of shift

// pixel sorting
img.src = glitch.sortPixels(img, 50) // threshold 0-255

// scanlines
img.src = glitch.scanlines(img, 4) // line gap in pixels
```

## how it works

each effect returns a data URL that you can use as an image source. the effects are:

### glitch.rgb(img, amount)
shifts red and blue channels for that classic glitch look
- `img`: image element
- `amount`: shift amount (default: 10)

### glitch.sortPixels(img, threshold) 
sorts pixels by brightness in each row
- `img`: image element  
- `threshold`: brightness cutoff 0-255 (default: 50)

### glitch.scanlines(img, gap)
adds dark scanlines
- `img`: image element
- `gap`: pixels between lines (default: 4)

🦋 i made gpt make it as cleaner as possible so i hope its clear lol 🚀
## license
MIT
