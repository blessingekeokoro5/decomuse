# 3D / AR models for "See it in your room"

Drop a product's 3D model files here and the native AR viewer ("View in AR?"
on iPhone, "View in your room" on Android) turns on automatically — no code
changes needed.

## Filenames (must match the product id)

For a product whose id is `hd05`:

| File | Platform | Purpose |
|------|----------|---------|
| `hd05.glb`  | Android (Chrome) + on-page 3D spin | Required for Android AR & the rotating 3D preview |
| `hd05.usdz` | iPhone / iPad (Safari) | Required for iOS "View in AR?" (AR Quick Look) |

Add **both** so AR works on every phone. iPhone can work with just the
`.usdz`; Android needs the `.glb`.

Product ids in use: `hd05`, `hd06`, `hd07` (the coffee tables). Any product
works — just name the files after its id.

## How the site uses them

`ar.html` (opened by the "See it in your room" QR code) checks for
`assets/models/<id>.glb` and `<id>.usdz`. If found, the **See in your room**
button launches the phone's native AR viewer. If not, it shows a graceful
"coming soon" message and links back to the product details.

You can also point a product at a model explicitly in `js/data.js`:

```js
model3d: "assets/models/hd05.glb",
modelUsdz: "assets/models/hd05.usdz",
```

## Where to get models

- **Ask your supplier / manufacturer** — many provide `.glb` / `.usdz` files.
- **Scan your own product** with a phone app (Polycam, Luma AI, Scaniverse,
  or Meshy) and export **GLB** (for Android) and **USDZ** (for iPhone).
- Keep each file reasonably small (ideally under ~10 MB) so it loads fast on
  mobile data.
