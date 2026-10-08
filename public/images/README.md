# Step images

Drop image files in this folder, then reference them from `src/data/steps.ts`:

```ts
{
  id: 'tamp',
  title: 'Tamp it flat',
  image: '/images/tamp.png',      // <- path is relative to /public
  imageAlt: 'Tamping the coffee bed level.',
}
```

Name each file after its step's `id` (`power-on.jpg`, `tamp.jpg`, …) rather
than its number, so reordering steps never leaves a misnamed image.

Frames are `4:3` at every size, and the image is `object-cover`d and scaled
slightly so the parallax drift never exposes an edge. **Keep the subject away
from the outer ~8% of the frame.**

Suggested export: 4:3, 1200–1600px wide, JPG or WebP.
