const fs = require("fs");
const path = require("path");

const sourceDir = path.join(process.cwd(), "node_modules", "pdfkit", "js", "data");
const targetDir = path.join(process.cwd(), ".next", "server", "chunks", "data");

if (!fs.existsSync(sourceDir) || !fs.existsSync(path.join(process.cwd(), ".next"))) {
  process.exit(0);
}

fs.mkdirSync(targetDir, { recursive: true });

for (const entry of fs.readdirSync(sourceDir)) {
  const sourcePath = path.join(sourceDir, entry);
  const targetPath = path.join(targetDir, entry);
  fs.copyFileSync(sourcePath, targetPath);
}

console.log(`Copied PDFKit runtime assets to ${targetDir}`);
