const fs = require("fs");
const path = require("path");

const replacements = {
    "'": "'",
    "'": "'",
    """: '"',
    """: '"',
    "-": "-",
    "-": "-",
    "...": "...",
    "•": "•",
    "→": "→"   // Fix for Explore arrow
};

function fixEncoding(str) {
  let fixed = str;
  for (const [bad, good] of Object.entries(replacements)) {
    fixed = fixed.replace(new RegExp(bad, "g"), good);
  }
  return fixed;
}

function scanAndFix(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      scanAndFix(fullPath);
    } else if (/\.(js|json|md)$/i.test(file)) {
      let content = fs.readFileSync(fullPath, "utf8");
      let fixed = fixEncoding(content);
      if (fixed !== content) {
        fs.writeFileSync(fullPath, fixed, "utf8");
        console.log(`✅ Fixed: ${fullPath}`);
      }
    }
  });
}

scanAndFix("./");
