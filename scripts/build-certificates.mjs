/**
 * Regenerates src/data/certificates.ts from the images in assets/certificates
 * and the slug/URL pairs in certificate_links.txt.
 *
 * The rule this enforces: a Verify button that opens the WRONG certificate is
 * worse than no button. So a link is only emitted when it is unambiguous, and
 * anything shared, duplicated or missing gets verifyUrl: null plus a
 * linkStatus explaining why.
 *
 * Run with `npm run certs` after editing certificate_links.txt.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const CERT_DIR = path.join(ROOT, 'assets', 'certificates')
const LINKS = path.join(CERT_DIR, 'certificate_links.txt')
const OUT = path.join(ROOT, 'src', 'data', 'certificates.ts')

const TITLES = {
  certificate_advanced_frontend: 'Advanced Frontend Development',
  certificate_angularjs: 'AngularJS',
  certificate_arduino_c_programming: 'Arduino and C Programming',
  certificate_automation_uipath: 'Automation with UiPath',
  certificate_backend_development_api: 'Backend Development and APIs',
  certificate_canva: 'Graphic Design with Canva',
  certificate_cisco_networking: 'Cisco Networking',
  certificate_cybersecurity: 'Cybersecurity',
  certificate_django_framework: 'Django Framework',
  certificate_flutter_dart: 'Flutter and Dart',
  certificate_frontend_development: 'Frontend Development',
  certificate_frontend_with_react: 'Frontend Development with React',
  certificate_interfacing_arduino: 'Interfacing with Arduino',
  certificate_iot: 'Internet of Things',
  certificate_iot_embedded_systems: 'IoT and Embedded Systems',
  certificate_iot_raspberry: 'IoT with Raspberry Pi',
  certificate_iot_raspberry_python_programming: 'IoT: Raspberry Pi and Python',
  certificate_iot_specialization: 'IoT Specialization',
  certificate_java: 'Java Programming',
  certificate_linux_sql: 'Linux and SQL',
  certificate_mern_specialization: 'MERN Stack Specialization',
  certificate_operating_system_virtualization: 'Operating Systems and Virtualisation',
  certificate_relational_database_administration: 'Relational Database Administration',
}

/** Read off the certificate images themselves. Coursera is the platform; these
 *  are the actual awarding partners, and "UC Irvine" carries more weight with a
 *  recruiter than "Coursera" does. */
const ISSUERS = {
  certificate_advanced_frontend: 'Packt',
  certificate_angularjs: 'Johns Hopkins University',
  certificate_arduino_c_programming: 'UC Irvine',
  certificate_automation_uipath: 'UiPath',
  certificate_backend_development_api: 'Packt',
  certificate_canva: 'Coursera Project Network',
  certificate_cisco_networking: 'LearnQuest',
  certificate_cybersecurity: 'Google',
  certificate_django_framework: 'Meta',
  certificate_flutter_dart: 'IBM',
  certificate_frontend_development: 'Meta',
  certificate_frontend_with_react: 'Packt',
  certificate_interfacing_arduino: 'UC Irvine',
  certificate_iot: 'UC Irvine',
  certificate_iot_embedded_systems: 'UC Irvine',
  certificate_iot_raspberry: 'UC Irvine',
  certificate_iot_raspberry_python_programming: 'UC Irvine',
  certificate_iot_specialization: 'UC Irvine',
  certificate_java: 'LearnQuest',
  certificate_linux_sql: 'Google',
  certificate_mern_specialization: 'Packt',
  certificate_operating_system_virtualization: 'Illinois Tech',
  certificate_relational_database_administration: 'IBM',
}

/** Specialization certificates, which sit above the individual courses. */
const SPECIALIZATIONS = new Set([
  'certificate_iot_specialization',
  'certificate_mern_specialization',
])

const DESIGN = new Set(['certificate_canva'])
const SYSTEMS = new Set([
  'certificate_arduino_c_programming',
  'certificate_interfacing_arduino',
  'certificate_iot',
  'certificate_iot_embedded_systems',
  'certificate_iot_raspberry',
  'certificate_iot_raspberry_python_programming',
  'certificate_iot_specialization',
  'certificate_cisco_networking',
  'certificate_cybersecurity',
  'certificate_operating_system_virtualization',
  'certificate_linux_sql',
  'certificate_relational_database_administration',
  'certificate_automation_uipath',
])

function parseLinks(text) {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))

  const pairs = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('http')) continue
    const next = lines[i + 1]
    if (next?.startsWith('http')) {
      pairs.push([lines[i], next])
      i++
    }
  }
  return pairs
}

const pairs = parseLinks(await readFile(LINKS, 'utf8'))

const urlCount = new Map()
const bySlug = new Map()
for (const [slug, url] of pairs) {
  urlCount.set(url, (urlCount.get(url) ?? 0) + 1)
  bySlug.set(slug, [...(bySlug.get(slug) ?? []), url])
}

const slugs = (await readdir(CERT_DIR))
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .map((f) => f.replace(/\.[^.]+$/, ''))
  .sort()

const review = []
const rows = slugs.map((slug) => {
  const urls = bySlug.get(slug) ?? []
  let url = null
  let status

  if (urls.length === 0) {
    status = 'missing'
    review.push([slug, status, 'No link supplied.'])
  } else if (urls.length > 1) {
    status = 'conflict'
    review.push([slug, status, `Listed ${urls.length}x with different URLs.`])
  } else if (urlCount.get(urls[0]) > 1) {
    status = 'shared'
    const others = pairs.filter(([s, u]) => u === urls[0] && s !== slug).map(([s]) => s)
    review.push([slug, status, `Shares its URL with: ${others.join(', ')}`])
  } else {
    url = urls[0]
  }

  return {
    slug,
    title: TITLES[slug] ?? slug,
    category: DESIGN.has(slug) ? 'design' : SYSTEMS.has(slug) ? 'systems' : 'web',
    url,
    status,
  }
})

const orphans = [...urlCount.keys()].filter(
  (u) => !rows.some((r) => r.url === u) && !pairs.some(([s]) => slugs.includes(s) && bySlug.get(s)?.includes(u)),
)

const j = JSON.stringify
const body = rows
  .map((r) =>
    [
      '  {',
      `    slug: ${j(r.slug)},`,
      `    title: ${j(r.title)},`,
      `    issuer: ${j(ISSUERS[r.slug] ?? 'Coursera')},`,
      `    platform: ${j('Coursera')},`,
      SPECIALIZATIONS.has(r.slug) ? '    isSpecialization: true,' : null,
      `    category: ${j(r.category)},`,
      `    thumb: ${j(`/certificates/${r.slug}.webp`)},`,
      `    full: ${j(`/certificates/${r.slug}@full.webp`)},`,
      `    verifyUrl: ${r.url ? j(r.url) : 'null'},`,
      r.status ? `    linkStatus: ${j(r.status)},` : null,
      '  },',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n')

await writeFile(
  OUT,
  `import type { Certificate } from './types'

/**
 * GENERATED by scripts/build-certificates.mjs. Do not edit by hand.
 * Edit assets/certificates/certificate_links.txt and run \`npm run certs\`.
 *
 * All source images are an identical 1772x928, which is why the grid uses one
 * fixed 1.91:1 ratio with no letterboxing.
 *
 * verifyUrl is null wherever the source link was ambiguous. See
 * CERTIFICATE-LINKS.md for what is outstanding.
 */
export const certificates: Certificate[] = [
${body}
]
`,
)

const ok = rows.filter((r) => !r.status).length
console.log(`src/data/certificates.ts  ${rows.length} certificates`)
console.log(`  verified: ${ok}`)
console.log(`  needs review: ${review.length}`)
for (const [slug, status, why] of review) console.log(`    [${status}] ${slug} - ${why}`)
if (orphans.length) console.log(`  orphaned URLs (no matching image): ${orphans.length}`)
