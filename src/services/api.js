import { mockInstagram, mockTikTok } from '../lib/mockData';

export async function fetchProfileData({ platform, profileQuery }) {
  const q = (profileQuery || '').trim();
  if (!q) {
    // return mock data by platform to demo UI with no input
    await delay(600);
    return platform === 'instagram' ? mockInstagram : mockTikTok;
  }

  // Parse username from URL or @handle
  const username = parseUsername(platform, q);
  if (!username) {
    throw new Error('Invalid profile URL or username');
  }

  // Demo: return mock data; in production, call your backend endpoint here
  await delay(800);
  return platform === 'instagram' ? mockInstagram : mockTikTok;
}

function parseUsername(platform, input) {
  const val = input.replace(/^@/, '').trim();
  try {
    if (val.startsWith('http')) {
      const u = new URL(val);
      if (platform === 'tiktok') {
        // https://www.tiktok.com/@username
        const handle = u.pathname.split('/').find(Boolean) || '';
        return handle.replace(/^@/, '') || null;
      } else {
        // https://www.instagram.com/username
        const segs = u.pathname.split('/').filter(Boolean);
        return segs[0] || null;
      }
    }
    return val || null;
  } catch {
    return null;
  }
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
