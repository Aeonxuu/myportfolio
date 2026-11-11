import type { WebProject } from './types'

/**
 * Thumbnails are viewport screenshots of the live homepage, kept as originals
 * in assets/websites/ and optimised by `npm run images`.
 *
 * SUMMARIES ARE DRAFTED FROM EACH SITE'S OWN HOMEPAGE COPY. Add your role and
 * any real outcome (bookings, calls, launch date) once you have them.
 */
export const webProjects: WebProject[] = [
  {
    slug: 'southtowns',
    title: 'Southtowns Land Service',
    domain: 'southtownslandservice.com',
    url: 'https://southtownslandservice.com',
    summary:
      'Coded Next.js site for an excavation and land clearing contractor in the US, built remotely across a 12-hour time difference. The Jobs gallery went from 7.5 s to 1.05 s load.',
    location: 'Western New York',
    thumb: '/websites/southtowns.webp',
    width: 1200,
    height: 750,
  },
  {
    slug: 'girasoles',
    title: 'Girasoles Farm',
    domain: 'girasolessunflower.com',
    url: 'https://girasolessunflower.com',
    summary:
      'Bilingual (English and Tagalog), mobile-first site for a sunflower farm and event venue, with a searchable store, gallery, tours and a booking form for 5 venues.',
    location: 'Candelaria, Quezon',
    thumb: '/websites/girasoles.webp',
    width: 1200,
    height: 750,
  },
  {
    slug: 'kapehan',
    title: 'The Third Space',
    domain: 'aeonxuu.github.io/Kapehan',
    url: 'https://aeonxuu.github.io/Kapehan/',
    summary:
      'An editorial web magazine on cafe-hopping and third-place culture in Lucena, with a feature story, a Hall of Cafes, a behind-the-lens photo essay and credits.',
    location: 'Lucena, Quezon',
    thumb: '/websites/kapehan.webp',
    width: 1200,
    height: 661,
  },
  {
    slug: 'agi',
    title: 'Agi',
    kind: 'app',
    domain: 'aeonxuu.github.io/baytrans',
    url: 'https://aeonxuu.github.io/baytrans/',
    summary:
      'Portrait-mode mobile app that teaches people to read and write Baybayin, with guided modules, tracing practice scored on accuracy, and quizzes led by the mascot Prof. Agi.',
    location: 'Mobile app',
    thumb: '/websites/agi.webp',
    screens: ['/websites/agi.webp', '/websites/agi-learn.webp', '/websites/agi-practice.webp'],
    width: 390,
    height: 844,
  },
]
