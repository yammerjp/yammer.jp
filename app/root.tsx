import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";
import "./styles/global.css";

import rootStyle from "./styles/root.module.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className={rootStyle.root}>
          {children}
        </div>
        <footer>
          {/* TODO: -2022を削除 */}
          <div>©2020-2022 <a href="https://github.com/yammerjp">yammer</a></div>
        </footer>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
