# Vue Design System

A compact, shadcn-inspired Vue 3 design system built with TailwindCSS, typed Composition API components, and runtime theme switching.

## Install

```bash
npm install
npm run dev
```

## Theme tokens and switching

- Tokens live in `src/styles/globals.css` as CSS variables (`--background`, `--foreground`, `--primary`, `--ring`, etc.).
- `useTheme()` in `src/lib/tokens/theme.ts` manages dark/light mode and primary palette.
- Settings persist to `localStorage` and update the `<html>` element (`class="dark"` and `data-color`).

```ts
import { useTheme } from './lib/tokens/theme'

const { mode, color, setMode, toggleMode, setColor } = useTheme()
```
