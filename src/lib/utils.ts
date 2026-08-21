import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * shadcn's convention: clsx for conditionals, tailwind-merge to resolve
 * conflicting utilities so a `className` prop can always override defaults.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
