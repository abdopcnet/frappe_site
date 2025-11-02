// Image utility functions
export function getImageUrl(image, type = 'product') {
  if (!image) {
    // Return a placeholder SVG data URI
    return getPlaceholderImage(type);
  }

  // If image is already a full URL, return it
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  // If image starts with /, it's already a path (like /files/image.jpg)
  if (image.startsWith('/')) {
    return image;
  }

  // If image doesn't start with /, assume it's a file path and add /
  return `/${image}`;
}

function getPlaceholderImage(type) {
  const width = type === 'category' ? 200 : 400;
  const height = type === 'category' ? 150 : 400;
  const text = type === 'category' ? 'Category' : 'Product';

  // SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f5f5f5"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#999" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `
    .trim()
    .replace(/\s+/g, ' ');

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export function handleImageError(event) {
  // Set placeholder image on error
  const type = event.target.dataset.type || 'product';
  event.target.src = getPlaceholderImage(type);
}
