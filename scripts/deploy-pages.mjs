#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const root = process.cwd()
const dist = join(root, 'dist')
const staging = join(tmpdir(), `bruce-pages-${Date.now()}`)

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', ...options })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

run('npm', ['run', 'build'], { cwd: root })

mkdirSync(staging, { recursive: true })
cpSync(dist, staging, { recursive: true })
writeFileSync(join(staging, '.nojekyll'), '')

// gh-pages holds built output with no package.json, so a Vercel build of this branch would fail.
writeFileSync(
  join(staging, 'vercel.json'),
  `${JSON.stringify({ git: { deploymentEnabled: false } }, null, 2)}\n`,
)

run('git', ['init'], { cwd: staging })
run('git', ['checkout', '-b', 'gh-pages'], { cwd: staging })
run('git', ['add', '-A'], { cwd: staging })
run('git', ['-c', 'user.name=Bruce Moseti', '-c', 'user.email=brucemosetie@gmail.com', 'commit', '-m', 'Deploy portfolio site'], { cwd: staging })

const remote = spawnSync('git', ['remote', 'get-url', 'origin'], {
  cwd: root,
  encoding: 'utf8',
}).stdout.trim()

run('git', ['remote', 'add', 'origin', remote], { cwd: staging })
run('git', ['push', '-f', 'origin', 'gh-pages'], { cwd: staging })

rmSync(staging, { recursive: true, force: true })
console.log('Published: https://brucemoseti.github.io/brucemoseti-personal-website/')
