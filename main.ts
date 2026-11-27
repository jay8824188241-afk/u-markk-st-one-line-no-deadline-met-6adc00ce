import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY_TEXT: string =
  "My alarm clock filed for overtime, my Wi-Fi took a personal day, and my calendar quietly moved the deadline to next week without telling me.";

// Entry spec: /output/entry.txt, ONE LINE, at most 200 characters.
if (ENTRY_TEXT.length > 200 || ENTRY_TEXT.includes("\n")) {
  throw new Error("ENTRY_TEXT must be a single line of at most 200 characters");
}

function main(): void {
  const outputDir: string =
    process.env.MAKEFUN_OUTPUT_DIR ?? path.join(process.cwd(), "output");
  fs.mkdirSync(outputDir, { recursive: true });
  const target: string = path.join(outputDir, "entry.txt");
  // Unique temp file per process so concurrent runs never share one, then
  // fsync + rename so the published entry.txt is never a partial write.
  const temp: string = `${target}.${process.pid}.tmp`;
  const fd: number = fs.openSync(temp, "w");
  try {
    fs.writeFileSync(fd, ENTRY_TEXT, "utf8");
    fs.fsyncSync(fd);
  } finally {
    fs.closeSync(fd);
  }
  fs.renameSync(temp, target);
}

main();
