export function renderHaiku(haiku: string): string[] {
  const lines = haiku
    .split(/(?:\|\||\r?\n)+/)
    .map((line) => line.trim())
    .filter((line) => line !== "");

  while (lines.length < 3) {
    lines.push("");
  }

  return lines.slice(0, 3);
}
