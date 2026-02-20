/**
 * Resolves a media path to a full URL.
 * When NEXT_PUBLIC_MEDIA_BASE_URL is set (e.g. DigitalOcean Space CDN), assets are served from there.
 * Otherwise the path is used as-is (local /public).
 */
const baseUrl =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_MEDIA_BASE_URL
    ? process.env.NEXT_PUBLIC_MEDIA_BASE_URL.replace(/\/$/, "")
    : "https://netiapps-2026-website.sgp1.cdn.digitaloceanspaces.com";

export function getMediaUrl(path: string): string {
  if (!path) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return baseUrl ? `${baseUrl}${normalized}` : normalized;
}
