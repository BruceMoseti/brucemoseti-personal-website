import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const targets = [
  { url: 'https://brucemoseti.github.io/locked-in/', out: 'public/projects/lockedin.png' },
]

await mkdir('public/projects', { recursive: true })

const browser = await chromium.launch()

for (const target of targets) {
  // Each app is on the same github.io origin, so a shared context would leak localStorage between them.
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto(target.url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2500)
  await page.screenshot({ path: target.out })
  await context.close()
  console.log('captured', target.out)
}

await browser.close()
