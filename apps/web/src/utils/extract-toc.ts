export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractToc(
  markdown: string | null | undefined,
): TocItem[] | null {
  if (!markdown) return null;
  // matches ## or ### followed by text
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length; // 2 for h2, 3 for h3
    const text = match[2].trim();

    // recreate slug format that rehype uses
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, ""); // Remove all non-word chars

    toc.push({ id, text, level });
  }
  return toc;
}
