import fs from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const htmlPath = path.join(process.cwd(), "index.html");
  const html = await fs.readFile(htmlPath, "utf8");

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

