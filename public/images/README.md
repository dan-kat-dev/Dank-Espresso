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

Frames are `4:3` on phones and `3:2` from `sm:` up, and the image is
`object-cover`d and scaled slightly so the parallax drift never exposes an
edge. **Keep the subject away from the outer ~8% of the frame.**

Suggested export: 1600px wide, WebP or PNG.
