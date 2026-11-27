import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY_TEXT: string =
  "My alarm clock filed for overtime, my Wi-Fi took a personal day, and my calendar quietly moved the deadline to next week without telling me.";

function main(): void {
  const outputDir: string =
    process.env.MAKEFUN_OUTPUT_DIR ?? path.join(process.cwd(), "output");
  fs.mkdirSync(outputDir, { recursive: true });
  const target: string = path.join(outputDir, "entry.txt");
  const temp: string = `${target}.tmp`;
  fs.writeFileSync(temp, ENTRY_TEXT, "utf8");
  fs.renameSync(temp, target);
}

main();
