const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "ToolTipMsg.txt");
const content = fs.readFileSync(file, "utf8");

const result = [];

const regex = /#Msg\s+(\d+)\s*\{\s*([\s\S]*?)\s*\}/g;

let match;

while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  let text = match[2].trim();

  text = text.replace(/\s+/g, " ");

  text = text.replace(/\$([A-Za-z0-9]+)\$/g, (_, v) => `\${${v.toUpperCase()}}`);

  result.push(`${id},"${text}"`);
}

fs.writeFileSync(path.join(__dirname, "output.txt"), result.join("\n"));

console.log("Converted:", result.length);