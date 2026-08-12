import BrandIcon from './BrandIcon'
import { getBrandIcon } from '../lib/brandIcons'
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs'

const rows = [
  ['python', 'cplusplus', 'typescript', 'react', 'nextdotjs', 'fastapi', 'postgresql', 'docker', 'celery', 'cloudflare'],
  ['pytorch', 'onnx', 'nvidia', 'numpy', 'pandas', 'plotly', 'solidity', 'git', 'linux', 'raspberrypi', 'arduino'],
]

function Row({ slugs, reversed, still }) {
  const items = slugs.map((slug) => ({ slug, title: getBrandIcon(slug)?.title ?? slug }))
  // The track is duplicated so the translate can loop without a visible seam.
  const track = still ? items : [...items, ...items]

  return (
    <div className={`tech-row${still ? ' is-still' : ''}`}>
      <div className={`tech-track${reversed ? ' reverse' : ''}`}>
        {track.map((item, index) => (
          <span className="tech-chip" key={`${item.slug}-${index}`}>
            <BrandIcon slug={item.slug} />
            {item.title}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TechStrip() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="tech-strip">
      {rows.map((slugs, index) => (
        <Row key={index} slugs={slugs} reversed={index % 2 === 1} still={reduced} />
      ))}
    </div>
  )
}
