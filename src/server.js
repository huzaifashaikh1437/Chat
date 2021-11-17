import App from "./App";
import React from "react";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { renderToString } from "react-dom/server";
import proxyRoutes from './server/proxy'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
          .map((asset) => `<link rel="stylesheet" href="${asset}">`)
          .join("")
      : ""
    : "";
};

const jsScriptTagsFromAssets = (assets, entrypoint, extra = "") => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map((asset) => `<script src="${asset}"${extra}></script>`)
          .join("")
      : ""
    : "";
};

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(proxyRoutes)
  .get("/*", (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="/logo192.png" />

    <link rel="manifest" href="/manifest.json" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    ${cssLinksFromAssets(assets, "client")}
    <title>Bizz Chat</title>
  </head>
    <body>
    <script src="/peerjs.min.js"></script>
        <div id="root">${markup}</div>
        ${jsScriptTagsFromAssets(assets, "client", " defer crossorigin")}
    </body>
</html>`
      );
    }
  });

export default server;
