const transparentInlineElements = new Set(['code', 'del', 'em', 'span', 'strong']);

const visibleText = (node) => {
  if (node.type === 'text') return node.value;
  if (node.type !== 'element' || !transparentInlineElements.has(node.tagName)) return undefined;
  const values = node.children.map(visibleText);
  return values.includes(undefined) ? undefined : values.join('');
};

// Mark URL labels at build time without rewriting text or treating all links as URLs.
export default function rehypeRawUrls() {
  return function transform(tree) {
    const nodes = [tree];
    while (nodes.length > 0) {
      const node = nodes.pop();
      if (node.type === 'element' && node.tagName === 'a') {
        const href = node.properties?.href;
        const labels = node.children.map(visibleText);
        if (typeof href === 'string' && /^https?:\/\//i.test(href)
          && !labels.includes(undefined)
          && labels.join('') === href) {
          node.properties['data-raw-url'] = true;
        }
      }
      if (node.children) nodes.push(...node.children);
    }
  };
}
