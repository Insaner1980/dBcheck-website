const safeSchemes = new Set(['http', 'https', 'mailto', 'tel']);

export const isSafeEditorialUrl = (value) => {
  if (typeof value !== 'string') return false;
  const normalized = value.trim().replace(/[\u0000-\u0020]/g, '');
  if (normalized.startsWith('//')) return false;
  const scheme = /^([a-z][a-z\d+.-]*):/i.exec(normalized)?.[1].toLowerCase();
  return scheme === undefined || safeSchemes.has(scheme);
};

const rootRelativeRoute = (value) => {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return undefined;
  return value.split(/[?#]/, 1)[0];
};

const inspectEditorialNode = (node, file, definitions, linkedDestinations) => {
  if (node.type === 'heading' && node.depth === 1) {
    file.fail('Editorial Markdown must not contain an H1; use the frontmatter title', node);
  }
  if (node.type === 'html') {
    file.fail('Raw HTML is not allowed in editorial Markdown', node);
  }
  if (['link', 'image', 'definition'].includes(node.type) && !isSafeEditorialUrl(node.url)) {
    file.fail(`Unsafe URL scheme in editorial Markdown: ${node.url}`, node);
  }
  if (node.type === 'definition' && !definitions.has(node.identifier)) {
    definitions.set(node.identifier, node.url);
  }
  if (node.type === 'link') linkedDestinations.push(node.url);
  if (node.type === 'linkReference') linkedDestinations.push({ identifier: node.identifier });
};

export const remarkEditorialSafety = () => (tree, file) => {
  const definitions = new Map();
  const linkedDestinations = [];
  const nodes = [tree];
  while (nodes.length > 0) {
    const node = nodes.pop();
    if (!node) continue;
    inspectEditorialNode(node, file, definitions, linkedDestinations);
    if (Array.isArray(node.children)) {
      for (let index = node.children.length - 1; index >= 0; index -= 1) nodes.push(node.children[index]);
    }
  }

  file.data.astro ??= {};
  file.data.astro.frontmatter ??= {};
  file.data.astro.frontmatter.linkedRoutes = linkedDestinations
    .map((destination) => typeof destination === 'string' ? destination : definitions.get(destination.identifier))
    .map(rootRelativeRoute)
    .filter((route) => route !== undefined);
};
