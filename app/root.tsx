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
        <script src="https://kit.fontawesome.com/4f53f8b0d1.js" crossOrigin="anonymous"></script>
      </head>
      <body>
        <div className=''>
          {/*
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
          */}

    {/*}
          <div className='main-content-grid-column'>
            <Outlet />
          </div>
      */}
          <div className=''>
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
