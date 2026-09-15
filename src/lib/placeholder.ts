function escapeSvgText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function placeholderImage(label: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400">
    <rect width="640" height="400" fill="#171d27" />
    <rect x="0.5" y="0.5" width="639" height="399" fill="none" stroke="#2b3441" />
    <line x1="0" y1="0" x2="640" y2="400" stroke="#2b3441" />
    <line x1="640" y1="0" x2="0" y2="400" stroke="#2b3441" />
    <text x="320" y="200" fill="#8fa0b3" font-family="IBM Plex Mono, monospace" font-size="18" text-anchor="middle" dominant-baseline="middle">${escapeSvgText(label)}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
