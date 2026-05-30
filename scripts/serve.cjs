const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  const relativePath = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
  const filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404).end("Not found");
      return;
    }

    res.writeHead(200, {
      "content-type": types[path.extname(filePath)] || "application/octet-stream",
      "cache-control": "no-store",
    });
    res.end(data);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Web3 MKT Monitor running at http://127.0.0.1:${port}`);
});
