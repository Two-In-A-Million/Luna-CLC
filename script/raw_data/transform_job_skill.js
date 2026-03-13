const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split(/\r?\n/);

const result = [];

for (const line of lines) {

    if (!line.trim()) continue;

    const parts = line.split(/\t+/).filter(v => v.trim() !== "");

    if (parts.length < 3) continue;

    const id = parts[0];
    const count = parts[1];
    const rest = parts.slice(2).join(",");

    result.push(`${id},${count},"${rest}"`);
}

fs.writeFileSync("output.txt", result.join("\n"));

console.log("Rows generated:", result.length);