# Photos to add (auto-converted to WebP)

The site now loads `.webp` images for speed. You just drop the **originals**
(JPG, PNG, or HEIC — any of these) and I convert + optimize them for you.

## Step 1 — drop your originals
Put the 6 photos into the **`_incoming/`** folder inside `slp-website`, named
by base name (the extension can be anything):

- `office`  → the night exterior of the SLP building
- `nihal`   → Adv. Nihal Kottalath   (Criminal Law & Litigation)
- `farsan`  → Adv. Farsan Latheef CP (Property & Real Estate)
- `drishya` → Adv. Drishya MP        (Family & Consumer Law)
- `najiya`  → Adv. Najiya Nusrin K   (Documentation & Registration)
- `ashna`   → Adv. Ashna Ajay A.S.   (NRI & Legal Opinions)

Example: `_incoming/office.jpg`, `_incoming/nihal.png`, etc.

## Step 2 — tell me "converted them" (or run it yourself)
I'll run the conversion, which produces:
- `assets/img/office.webp` (max 1400px wide, used on homepage hero + Contact)
- `assets/img/team/<name>.webp` (max 800px wide, quality 82)

To run it yourself instead: `bash convert-photos.sh`

That's it — refresh the site and the photos appear, already optimized.
