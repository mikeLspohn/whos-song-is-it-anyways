import { Link } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import stylesUrl from '~/styles/index.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }]
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Whatchu Want?</h1>

      <nav>
        <ul>
          <li>
            <Link to='/lists'>My Lists</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
