import type { Achievement, SchoolEntry, Toolkit } from './types'

export const school: SchoolEntry = {
  name: 'Manuel S. Enverga University Foundation',
  program: 'BS Information Technology',
  status: 'Expected 2027',
  note: 'College Scholar for 5 semesters. Currently a 4th year student and IT Representative at MASTECH.',
}

/** Awards and standing, from the resume and the repository. */
export const achievements: Achievement[] = [
  {
    title: 'Panel C Winner',
    detail:
      'One of 3 panel winners at the DTI Quezon Youth Entrepreneurship Program pitch competition, pitching SyncWorks, a website and systems agency for Lucena City small businesses.',
    year: '2026',
  },
  {
    title: 'Capstone defended',
    detail:
      'SyncBazaar, a multi-tenant bazaar management app. A live demo earned positive feedback from 5 DTI mentors.',
    year: 'Oct 2026',
  },
  {
    title: 'College Scholar',
    detail: 'Held the scholarship for 5 semesters at Manuel S. Enverga University Foundation.',
    year: '5 semesters',
  },
  {
    title: 'IT Representative, MASTECH',
    detail: 'Represents the 4th year IT students at MASTECH.',
    year: '4th year',
  },
  {
    title: 'Page load cut from 7.5 s to 1.05 s',
    detail: 'On the Southtowns Jobs page, through image optimization and lazy loading.',
    year: '2025',
  },
]

export const toolkit: Toolkit[] = [
  {
    group: 'Web',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Django'],
  },
  {
    group: 'Performance',
    items: ['Mobile-first design', 'AVIF and WebP', 'Lazy loading', 'Custom domains', 'Site deployment'],
  },
  { group: 'Design', items: ['Figma', 'Canva', 'Layout and typography for web and print'] },
  {
    group: 'Tools',
    items: ['Git', 'GitHub', 'GitHub Pages', 'PostgreSQL', 'Flutter', 'Excel', 'Word', 'Claude', 'n8n'],
  },
]
