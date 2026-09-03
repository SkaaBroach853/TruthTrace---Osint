// Keep the local-only build wording concise across every rendered view.
const root = document.querySelector('#app');
function normalizeLabels() {
  root.querySelector('.legal')?.remove();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const replacements = [
    ['LOCAL DEMO MODE', 'LOCAL'], ['DEMO-001', 'LOCAL-001'],
    ['DEMO INVESTIGATION', 'LOCAL INVESTIGATION'], ['DEMO ASSET', 'LOCAL ASSET'],
    ['Load demo case', 'Load local case'], ['demo provider', 'provider'],
    ['Demo mode', 'Local mode'], ['the demo case', 'the local case']
  ];
  let node;
  while ((node = walker.nextNode())) for (const [from, to] of replacements) node.nodeValue = node.nodeValue.replaceAll(from, to);
}
new MutationObserver(normalizeLabels).observe(root, {childList:true, subtree:true});
normalizeLabels();
