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
    label: 'websites',
    from: A('websites'),
    to: P('websites'),
    match: /\.(png|jpe?g)$/i,
    // Viewport screenshots captured at 1440x900 (16:10). Shown at ~560px in a
    // two-column grid, so 1200px stays crisp at 2x without carrying the full size.
    variants: [{ suffix: '', width: 1200, quality: 82 }],
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
    // Background-removed portrait supplied by the owner (transparent PNG,
    // 1122x1402). `trimTop` drops the empty rows above her hair so the photo
    // can sit higher against the word behind it. WebP keeps the alpha channel.
    match: /^lj_profile_real\.png$/i,
    trimTop: true,
    variants: [{ suffix: '', width: 1000, quality: 84, effort: 6 }],
  },
]

/**
 * Cleans and crops a cut-out. Faint stray pixels (alpha under 30 of 255) are
 * left over from the background removal and show as grey specks on a light
 * page, so they are made fully transparent. Then fully transparent rows are
 * cropped from the top edge only; sides and bottom stay as shot.
 */
async function trimTransparentTop(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let i = 3; i < data.length; i += 4) if (data[i] < 30) data[i] = 0
  let top = 0
  rows: for (; top < info.height; top++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(top * info.width + x) * 4 + 3] > 0) break rows
    }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: 0, top, width: info.width, height: info.height - top })
    .png()
    .toBuffer()
}

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
        let input = sharp(src)
        if (job.trimTop) input = sharp(await trimTransparentTop(src))
        await input
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
