import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FlipBook Viewer - Interactive PDF Reader',
    short_name: 'FlipBook',
    description: 'Transform your PDFs into beautiful interactive flipbooks',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    // Note: Add icon files to public/ folder (icon-192.png, icon-512.png)
    // or comment out the icons array if not using PWA features
    icons: [],
  };
}
