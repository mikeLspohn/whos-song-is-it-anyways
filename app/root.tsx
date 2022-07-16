import type { LinksFunction, MetaFunction } from "@remix-run/node";
import stylesUrl from '~/styles/index.css'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className='main-flex-container'>
          <div className='main-nav'>
            <nav>
              <ul>
                <li>
                  Home
                </li>
                <li>
                  Wishlists
                </li>
                <li>
                  Account Settings
                </li>
              </ul>
            </nav>
          </div>

          <div className='main-content-grid-column'>
            <Outlet />
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
