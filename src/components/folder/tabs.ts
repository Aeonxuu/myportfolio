export const TABS = [
  { id: 'works', label: 'Works' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export type TabId = (typeof TABS)[number]['id']

export const isTabId = (v: string): v is TabId => TABS.some((t) => t.id === v)
