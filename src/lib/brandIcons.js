import {
  siArduino,
  siCelery,
  siCloudflare,
  siCplusplus,
  siDocker,
  siFastapi,
  siGit,
  siGithub,
  siLinux,
  siNextdotjs,
  siNokia,
  siNumpy,
  siNvidia,
  siOnnx,
  siPandas,
  siPlotly,
  siPostgresql,
  siPytorch,
  siPython,
  siRaspberrypi,
  siReact,
  siSolidity,
  siTypescript,
} from 'simple-icons'

// Named imports keep the bundle to these icons; a namespace import pulls in all 3,400+.
const icons = {
  arduino: siArduino,
  celery: siCelery,
  cloudflare: siCloudflare,
  cplusplus: siCplusplus,
  docker: siDocker,
  fastapi: siFastapi,
  git: siGit,
  github: siGithub,
  linux: siLinux,
  nextdotjs: siNextdotjs,
  nokia: siNokia,
  numpy: siNumpy,
  nvidia: siNvidia,
  onnx: siOnnx,
  pandas: siPandas,
  plotly: siPlotly,
  postgresql: siPostgresql,
  pytorch: siPytorch,
  python: siPython,
  raspberrypi: siRaspberrypi,
  react: siReact,
  solidity: siSolidity,
  typescript: siTypescript,
}

// Wordmarks sit as a short strip inside the square 24x24 viewBox, so they render as an
// illegible sliver at icon size. Cropping to the glyph lets them be drawn wide instead.
// Values measured from the rendered path bounding box for the pinned simple-icons version.
const wordmarks = {
  nokia: { viewBox: '0 9.18 24 5.65', ratio: 24 / 5.65, scale: 1.6 },
}

export function getWordmark(slug) {
  return wordmarks[slug] ?? null
}

// Several brand colours are close to black, which disappears on a dark background.
// Anything below the threshold gets mixed toward white until it reads.
const MIN_LUMINANCE = 0.38

export function readableOnDark(hex) {
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

  if (luminance >= MIN_LUMINANCE) return `#${hex}`

  const amount = (1 - luminance / MIN_LUMINANCE) * 0.85
  const mix = (channel) => Math.round(channel + (235 - channel) * amount)
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

export function getBrandIcon(slug) {
  return icons[slug] ?? null
}
