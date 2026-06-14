const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split(/\r?\n/);
const result = [];

for (const line of lines) {
    if (!line.trim()) continue;

    let cols = line.split("\t");

    // Trim only trailing empty padding, keep internal zeros
    while (cols.length && cols[cols.length - 1].trim() === "") cols.pop();

    if (cols.length < 3) continue;

    result.push(cols.join(","));   // ID stays as first field
}

fs.writeFileSync("output.txt", result.join("\n"));
console.log("Rows generated:", result.length);