import type { Role } from './types'

/**
 * From the resume (assets/information). Wording is the resume's: figures are
 * quoted, not rounded. Roles are newest first.
 */
export const roles: Role[] = [
  {
    org: 'Girasoles Farm',
    title: 'Freelance Web Developer',
    place: 'Candelaria, Quezon',
    period: 'Nov 2026 to present',
    points: [
      'Launched a 5-page bilingual, mobile-first website for a sunflower farm and event venue with about 28K Facebook followers, using React 19, TypeScript, Tailwind CSS and Framer Motion on GitHub Pages.',
      'Automated a Sharp pipeline that converts 120+ photos into responsive AVIF and WebP images at 3 breakpoints, lazy-loaded into searchable store, gallery and tour pages.',
      'Built an event-booking form across 5 venues that validates Philippine mobile numbers, emails and Facebook links, and routes each submission to the business email.',
    ],
  },
  {
    org: 'Southtowns Land Service LLC',
    title: 'Freelance Web Developer and Graphic Designer',
    place: 'Remote, USA',
    period: 'Oct 2025 to present',
    points: [
      "Rebuilt the company's 2-page Canva site as a coded Next.js and React website on a custom domain, working with the US-based owner across a 12-hour time difference.",
      'Cut Jobs page load time from 7.5 s to 1.05 s while organizing 256 photos across 52 projects and 8 service categories into a browsable gallery.',
      'Added a free-estimate form that sends every customer inquiry to the company inbox.',
      'Standardized job costing and quotes with 4 Excel reporting templates and 1 Word estimate template.',
    ],
  },
  {
    org: 'SV KICKz Shoe Store',
    title: 'Freelance Graphic Designer and Document Specialist',
    place: 'Lucena City',
    period: '2024 to 2025',
    points: [
      'Designed 50+ promotional posters, discount announcements and booth advertisements in Figma and Canva for weekly pop-up bazaars across Laguna.',
      'Reconciled hundreds of sales per bazaar into 6 Statements of Account by cross-checking raw order lists in Excel.',
    ],
  },
]

export const capstone = {
  title: 'SyncBazaar',
  role: 'Frontend Developer, capstone project, team of 3',
  period: 'Jan 2026 to present',
  stack: ['Flutter', 'Riverpod', 'Drift', 'Django REST Framework', 'PostgreSQL', 'GitHub'],
  points: [
    'Delivered 13+ responsive screens for a multi-tenant web and tablet app covering the pop-up bazaar workflow, from inventory allocation and point of sale to post-event reconciliation.',
    'Defended the capstone in October 2026. After a live demo, 5 DTI mentors gave positive feedback on navigation, role-based access and record accuracy.',
  ],
}
