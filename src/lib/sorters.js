export function sortVideos(videos, sortBy = 'views', order = 'desc') {
  const key = String(sortBy);
  const dir = order === 'asc' ? 1 : -1;

  const score = (v) => {
    if (key === 'engagement') {
      const er = (v.likes + v.comments + v.saves + v.shares) / Math.max(v.views, 1);
      return er;
    }
    return v[key] ?? 0;
  };

  return [...videos].sort((a, b) => {
    const A = score(a);
    const B = score(b);
    if (A === B) return 0;
    return A > B ? dir : -dir;
  });
}
