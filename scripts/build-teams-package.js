"use strict";

const childProcess = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const appUrl = normalizeUrl(process.argv[2] || process.env.APP_URL || "");
if (!appUrl) {
  console.error("Uso: npm run teams:package -- https://sua-url-publica");
  process.exit(1);
}

const appDomain = new URL(appUrl).hostname;
const root = path.join(__dirname, "..");
const sourceDir = path.join(root, "teams");
const outputDir = path.join(sourceDir, "dist");
const packageDir = path.join(outputDir, "package");
const packagePath = path.join(outputDir, "totall-hub-cfo-teams.zip");

fs.rmSync(packageDir, { recursive: true, force: true });
fs.mkdirSync(packageDir, { recursive: true });
fs.mkdirSync(outputDir, { recursive: true });

const template = fs.readFileSync(path.join(sourceDir, "manifest.template.json"), "utf8");
const manifest = template.replaceAll("{{APP_URL}}", appUrl).replaceAll("{{APP_DOMAIN}}", appDomain);

JSON.parse(manifest);
fs.writeFileSync(path.join(packageDir, "manifest.json"), manifest);
fs.copyFileSync(path.join(sourceDir, "color.png"), path.join(packageDir, "color.png"));
fs.copyFileSync(path.join(sourceDir, "outline.png"), path.join(packageDir, "outline.png"));
fs.rmSync(packagePath, { force: true });

childProcess.execFileSync("zip", ["-qr", packagePath, "manifest.json", "color.png", "outline.png"], {
  cwd: packageDir,
  stdio: "inherit",
});

console.log(`Pacote Teams criado: ${packagePath}`);

function normalizeUrl(value) {
  const trimmed = String(value || "").trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  const url = new URL(trimmed);
  if (url.protocol !== "https:") {
    throw new Error("A URL do Teams precisa usar HTTPS.");
  }
  return url.toString().replace(/\/$/, "");
}
