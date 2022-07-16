import { Outlet, Link } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import stylesUrl from '~/styles/index.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }]
}

export default function Index() {
  return (
    <main>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>Whatchuwant Wishlists</h1>

        <nav>
          <ul>
            <li>
              <Link to='/lists'>View My Lists</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />
    </main>
  );
}
