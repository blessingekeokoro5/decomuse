DECOMUSE — PRODUCT PHOTOS
==========================

Save each product's photo in THIS folder, named after the product's ID.

HOW IT WORKS
------------
The site automatically looks for a photo at:
    assets/products/<product-id>.jpg   (also tries .png, .jpeg, .webp)

If the file exists, it replaces the coloured placeholder everywhere that
product appears (shop, product page, search, "you may also like", cart).
If there's no file, the elegant placeholder shows instead — nothing breaks.

So you DON'T need to touch any code — just drop in a correctly-named image.

PRODUCT IDs (name your files like these)
----------------------------------------
  h10.jpg  → Nude by Nature Complexion Essentials Starter Kit (Light)
  f07.jpg  → Tommy Hilfiger Tommy Girl EDT 100mL
  h07.jpg  → CeraVe Skin Renewing Vitamin C Serum 30mL
  h08.jpg  → Clear Skincare Lightening Cream 90g
  h09.jpg  → Umberto Giannini Curl Jelly Scrunching Jelly 200mL

  (Home & décor / lifestyle products use ids like p01, l01, f01, etc.
   You can see every id in js/data.js.)

TIPS
----
- Square images (about 1000 x 1000 px) look best on the cards.
- Use a plain white or soft background for a clean, premium look.
- Keep files under ~400 KB each so pages stay fast.
- Only use photos you have the right to use (your own, or supplier-approved).

EXAMPLE
-------
To show your Nude by Nature image: save it as
    C:\Users\direc\MY NEW BUSINESS\assets\products\h10.jpg
Then refresh the site — it appears automatically.
