// Mark URL labels at build time without rewriting text or treating all links as URLs.
export default function rehypeRawUrls() {
  return function transform(tree) {
    const nodes = [tree];
    while (nodes.length > 0) {
      const node = nodes.pop();
      if (node.type === 'element' && node.tagName === 'a') {
        const href = node.properties?.href;
        if (typeof href === 'string' && /^https?:\/\//i.test(href)
          && node.children.every((child) => child.type === 'text')
          && node.children.map((child) => child.value).join('') === href) {
          node.properties['data-raw-url'] = true;
        }
      }
      if (node.children) nodes.push(...node.children);
    }
  };
}
