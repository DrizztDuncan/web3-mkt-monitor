// Use the local Worker during development and Cloudflare for hosted builds.
const isLocalhost = ["127.0.0.1", "localhost"].includes(window.location.hostname);
window.WEB3_API_BASE =
  window.localStorage.getItem("WEB3_API_BASE") ||
  (isLocalhost
    ? "http://127.0.0.1:8787"
    : "https://web3-mkt-monitor-api.duncantheinvictus.workers.dev");
