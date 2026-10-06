// Runs `npm install` only when it's needed: no node_modules yet, or
// package.json / package-lock.json changed since the last install.
// Used by `npm run dev:debug` (and so by the VS Code launch profile).
import { execSync } from 'node:child_process'
import { existsSync, statSync, writeFileSync } from 'node:fs'

const stamp = 'node_modules/.install-stamp'
const mtime = (file) => (existsSync(file) ? statSync(file).mtimeMs : 0)

const stale =
  !existsSync(stamp) ||
  ['package.json', 'package-lock.json'].some((file) => mtime(file) > mtime(stamp))

if (stale) {
  console.log('Dependencies missing or out of date — running npm install…')
  execSync('npm install', { stdio: 'inherit' })
  writeFileSync(stamp, new Date().toISOString())
} else {
  console.log('Dependencies up to date.')
}
