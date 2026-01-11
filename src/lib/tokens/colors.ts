export type ThemeColor = 'slate' | 'zinc' | 'blue' | 'emerald'

export const THEME_COLORS: Array<{ name: ThemeColor; label: string }> = [
  { name: 'slate', label: 'Slate' },
  { name: 'zinc', label: 'Zinc' },
  { name: 'blue', label: 'Blue' },
  { name: 'emerald', label: 'Emerald' },
]

export function isThemeColor(value: string): value is ThemeColor {
  return THEME_COLORS.some((color) => color.name === value)
}
