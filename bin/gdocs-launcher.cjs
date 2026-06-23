#!/usr/bin/env node
// Crow launcher for @suncreation/mcp-google-docs.
//
// The package bundles node-fetch@2.7.0, which is broken against googleapis on modern Node
// (every request to *.googleapis.com dies with ERR_STREAM_PREMATURE_CLOSE — token refresh,
// Sheets reads, Docs writes, all of it). Node's own built-in fetch works fine, so this
// launcher intercepts `require('node-fetch')` and returns a built-in-fetch shim instead.
//
// Lives outside node_modules, so it survives package reinstalls/updates.
// Note: JSON APIs (Docs/Sheets/Drive metadata) are fully covered. If a future feature needs
// streamed binary bodies, the web ReadableStream from built-in fetch may differ from
// node-fetch's Node stream — revisit then.

const Module = require('module');
const origLoad = Module._load;

const shim = function (url, opts) {
  if (opts) {
    // drop node-fetch-only options that built-in fetch doesn't accept
    const { compress, agent, follow, size, highWaterMark, insecureHTTPParser, ...rest } = opts;
    opts = rest;
  }
  return fetch(url, opts);
};
shim.default = shim;
shim.Headers = Headers;
shim.Request = Request;
shim.Response = Response;
shim.FetchError = class FetchError extends Error {};
shim.AbortError = class AbortError extends Error {};
shim.isRedirect = (code) => [301, 302, 303, 307, 308].includes(code);

Module._load = function (request) {
  if (request === 'node-fetch') return shim;
  return origLoad.apply(this, arguments);
};

const path = require('path');
const { execSync } = require('child_process');
const { pathToFileURL } = require('url');
const globalRoot = execSync('npm root -g').toString().trim();
const server = path.join(globalRoot, '@suncreation/mcp-google-docs/dist/server.js');
import(pathToFileURL(server).href);
