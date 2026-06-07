import { readFile } from "node:fs/promises";

async function loadDevVars() {
  try {
    const text = await readFile(new URL("../.dev.vars", import.meta.url), "utf8");
    return Object.fromEntries(text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const separator = line.indexOf("=");
        return [line.slice(0, separator), line.slice(separator + 1)];
      }));
  } catch {
    return {};
  }
}

const devVars = await loadDevVars();
const apiBase = process.env.WEB3_API_BASE || "http://127.0.0.1:8787";
const adminToken = process.env.ADMIN_SYNC_TOKEN || devVars.ADMIN_SYNC_TOKEN;
if (!adminToken) throw new Error("Set ADMIN_SYNC_TOKEN in backend/.dev.vars or the shell environment.");

const response = await fetch(`${apiBase}/api/admin/sync`, {
  method: "POST",
  headers: {
    "x-admin-token": adminToken,
  },
});

const payload = await response.json();
if (!response.ok) {
  throw new Error(`Sync failed (${response.status}): ${payload.error || "Unknown error"}`);
}

console.log(JSON.stringify(payload, null, 2));
