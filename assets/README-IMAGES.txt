DECOMUSE — HOW TO ADD YOUR REAL PHOTOS
========================================

Drop your image files into this "assets" folder using the exact
filenames below. Wherever a photo file exists, it automatically
replaces the coloured placeholder on the site. If a file is missing,
the elegant gradient placeholder shows instead (nothing breaks).

RECOMMENDED FILENAMES (save your photos with these names):
-----------------------------------------------------------
  logo.png           → Your D&M house logo ICON (the pink house-with-plants).
                       Save as a TRANSPARENT PNG (icon only, no dark background)
                       ~200x200px. It replaces the drawn logo in the header on
                       every page. The "D&M · Home and Living" text stays as
                       crisp website text beside it so it's always legible.
  hero.mp4           → OPTIONAL homepage advert VIDEO. Drop an .mp4 (or .webm)
                       here and it plays automatically in the hero, replacing the
                       built-in animated advert scene. Keep it short & muted-friendly
                       (it autoplays muted & loops). ~10-20s, landscape or portrait.
  wholesale.jpg      → (legacy) not used on the current store

TO ADD MORE PHOTOS ACROSS THE SITE:
-----------------------------------------------------------
Any placeholder on the site looks like this in the HTML:

    <div class="ph" data-label="Styled living room"></div>

To use a real photo there, add an <img> inside it, like this:

    <div class="ph" data-label="Styled living room">
      <img class="ph-img" src="assets/your-photo.jpg" alt="Styled living room" onerror="this.remove()">
    </div>

The onerror="this.remove()" bit means: if the photo is missing,
it quietly falls back to the placeholder — so the page never breaks.

TIPS
-----------------------------------------------------------
- Use .jpg for photos, .png for graphics/logos.
- Keep files reasonably sized (under ~500 KB each) so pages load fast.
- Landscape ~1600x1000px works well for heroes; square ~1000x1000px for product/service cards.

Just tell Claude which photo goes where and it can wire any of them in for you.
