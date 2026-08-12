import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const targets = [
  { url: 'https://brucemoseti.github.io/locked-in/', out: 'public/projects/lockedin.png' },
  {
    url: 'https://brucemoseti.github.io/firstpass-app/',
    out: 'public/projects/firstpass.png',
    prepare: async (page) => {
      await clickText(page, 'Use the demo instead')
      await clickText(page, 'Radar')
    },
  },
  {
    url: 'https://brucemoseti.github.io/resume-lock-app/',
    out: 'public/projects/resumelock.png',
    prepare: async (page) => {
      await clickText(page, 'Load the example')
      await clickText(page, 'Resume')
    },
  },
]

async function clickText(page, text) {
  const button = page.locator('button', { hasText: new RegExp(`^\\s*${text}\\s*$`, 'i') }).first()
  await button.click({ timeout: 15000 })
  await page.waitForTimeout(1500)
}

await mkdir('public/projects', { recursive: true })

const browser = await chromium.launch()

for (const target of targets) {
  // Each app is on the same github.io origin, so a shared context would leak localStorage between them.
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto(target.url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2000)
  if (target.prepare) {
    try {
      await target.prepare(page)
      await page.waitForTimeout(2500)
    } catch (error) {
      console.warn('prepare failed for', target.url, error.message)
    }
  }
  await page.screenshot({ path: target.out })
  await context.close()
  console.log('captured', target.out)
}

await browser.close()
