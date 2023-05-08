export function renderHaiku(haiku: string): string[] {
  const formattedHaiku = haiku.replace(/\|\|/g, "\n");
  return formattedHaiku.split("\n");
}
