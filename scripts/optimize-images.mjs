/**
 * Turns the originals in assets/ into web-ready WebP in public/.
 *
 * assets/ is the archive and is never modified. public/ is generated and can
 * be deleted and rebuilt at any time with `npm run images`.
 *
 * Aspect ratios are ALWAYS preserved. `fit: 'inside'` scales to fit the cap
 * without cropping, so a portrait piece stays portrait and a brochure keeps
 * its proportions. Nothing is squared off.
 */
import sharp from 'sharp'
import { readdir, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const A = (...p) => path.join(ROOT, 'assets', ...p)
const P = (...p) => path.join(ROOT, 'public', ...p)

/** Long-edge caps. Design work is looked at closely, so it gets the most room. */
const JOBS = [
  {
    label: 'design',
    from: A('creative_projects'),
    to: P('design'),
    match: /\.(png|jpe?g)$/i,
    variants: [{ suffix: '', width: 2000, quality: 82 }],
  },
  {
    label: 'certificates',
    from: A('certificates'),
    to: P('certificates'),
    match: /\.(png|jpe?g)$/i,
    // Two sizes: a light thumbnail for the grid, a full one for the lightbox.
    // All 22 are an identical 1772x928, so these caps are exact, not guesses.
    variants: [
      { suffix: '', width: 900, quality: 80 },
      { suffix: '@full', width: 1600, quality: 84 },
    ],
  },
  {
    label: 'profile',
    from: A(),
    to: P(),
    match: /^lj_profile\.(jpe?g|png)$/i,
    // Source is now a high-quality PNG rather than a pre-compressed JPEG, so
    // it takes a higher quality without the file growing. 1200px is comfortably
    // 2x for the frame it renders in.
    // The source has a halftone filter baked in. A regular dot grid is the
    // worst case for both compression AND downscaling: at 1000px scaled into a
    // ~320px frame the dots interfere with the pixel grid and turn to moire
    // mud. 640px is close enough to the rendered size that the halftone reads
    // as intentional grain, and it is 233 KB instead of 358 KB.
    variants: [{ suffix: '', width: 640, quality: 80, effort: 6 }],
  },
]

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function run() {
  let beforeTotal = 0
  let afterTotal = 0

  for (const job of JOBS) {
    await mkdir(job.to, { recursive: true })
    const entries = (await readdir(job.from)).filter((f) => job.match.test(f)).sort()

    console.log(`\n${job.label}  (${entries.length} files)`)

    for (const file of entries) {
      const src = path.join(job.from, file)
      const before = (await stat(src)).size
      beforeTotal += before

      const base = file.replace(/\.[^.]+$/, '')
      let line = `  ${base.slice(0, 44).padEnd(44)} ${kb(before).padStart(8)} ->`

      for (const v of job.variants) {
        const out = path.join(job.to, `${base}${v.suffix}.webp`)
        const meta = await sharp(src).metadata()
        await sharp(src)
          // `inside` never crops and never enlarges past the original.
          .resize({ width: v.width, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: v.quality, effort: v.effort ?? 4, smartSubsample: true })
          .toFile(out)
        const after = (await stat(out)).size
        afterTotal += after
        line += ` ${kb(after).padStart(8)}${v.suffix || ''}`
        if (v === job.variants[0]) line += ` (${meta.width}x${meta.height})`
      }
      console.log(line)
    }
  }

  const saved = (1 - afterTotal / beforeTotal) * 100
  console.log(
    `\ntotal: ${(beforeTotal / 1024 / 1024).toFixed(1)} MB -> ` +
      `${(afterTotal / 1024 / 1024).toFixed(1)} MB  (${saved.toFixed(0)}% smaller)`,
  )
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
