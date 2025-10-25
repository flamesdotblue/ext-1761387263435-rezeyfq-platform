import { useState, useMemo, useEffect } from 'react';
import HeroSpline from './components/HeroSpline';
import ProfileInput from './components/ProfileInput';
import ControlsBar from './components/ControlsBar';
import SummaryBar from './components/SummaryBar';
import VideoGrid from './components/VideoGrid';
import { sortVideos } from './lib/sorters';
import { fetchProfileData } from './services/api';

export default function App() {
  const [platform, setPlatform] = useState('tiktok');
  const [profileQuery, setProfileQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videos, setVideos] = useState([]);

  const [sortBy, setSortBy] = useState('views');
  const [order, setOrder] = useState('desc');
  const [timeRange, setTimeRange] = useState('all');
  const [topN, setTopN] = useState(50);

  const handleFetch = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProfileData({ platform, profileQuery });
      setVideos(data);
    } catch (e) {
      setError(e?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If desired, auto-fetch when profileQuery changes to a full URL
  }, [profileQuery]);

  const filteredAndSorted = useMemo(() => {
    let list = [...videos];

    if (timeRange !== 'all') {
      const now = new Date();
      let from = new Date(0);
      if (timeRange === '7d') {
        from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (timeRange === '30d') {
        from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      } else if (timeRange === '90d') {
        from = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      } else if (timeRange === '365d') {
        from = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      }
      list = list.filter(v => new Date(v.createdAt) >= from);
    }

    list = sortVideos(list, sortBy, order);
    if (topN && Number.isFinite(Number(topN))) {
      list = list.slice(0, Number(topN));
    }
    return list;
  }, [videos, sortBy, order, timeRange, topN]);

  const totals = useMemo(() => {
    const total = videos.length;
    const sum = videos.reduce(
      (acc, v) => {
        acc.views += v.views || 0;
        acc.likes += v.likes || 0;
        acc.comments += v.comments || 0;
        acc.saves += v.saves || 0;
        acc.shares += v.shares || 0;
        return acc;
      },
      { views: 0, likes: 0, comments: 0, saves: 0, shares: 0 }
    );
    const avg = total > 0 ? {
      views: Math.round(sum.views / total),
      likes: Math.round(sum.likes / total),
      comments: Math.round(sum.comments / total),
      saves: Math.round(sum.saves / total),
      shares: Math.round(sum.shares / total),
      engagement: ((sum.likes + sum.comments + sum.saves + sum.shares) / Math.max(sum.views, 1)) * 100,
    } : { views: 0, likes: 0, comments: 0, saves: 0, shares: 0, engagement: 0 };

    return { total, sum, avg };
  }, [videos]);

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100">
      <section className="relative h-[60vh] w-full">
        <HeroSpline />
        <div className="absolute inset-0 flex items-center justify-center pt-8">
          <div className="max-w-4xl w-full px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center mb-4">
              Sort any Instagram Reels and TikTok profile by performance
            </h1>
            <p className="text-zinc-300 text-center mb-6">
              Paste a profile URL or username and instantly rank their videos by views, likes, comments, saves, shares, or engagement.
            </p>
            <ProfileInput
              platform={platform}
              onPlatformChange={setPlatform}
              value={profileQuery}
              onChange={setProfileQuery}
              onSubmit={handleFetch}
              loading={loading}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/30 to-zinc-950" />
      </section>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 -mt-20">
        <div className="bg-zinc-900/60 backdrop-blur rounded-2xl border border-zinc-800 p-4 md:p-6 shadow-xl">
          <ControlsBar
            sortBy={sortBy}
            onSortBy={setSortBy}
            order={order}
            onOrder={setOrder}
            timeRange={timeRange}
            onTimeRange={setTimeRange}
            topN={topN}
            onTopN={setTopN}
            disabled={loading || videos.length === 0}
          />

          <SummaryBar loading={loading} error={error} totals={totals} count={filteredAndSorted.length} />

          <VideoGrid loading={loading} items={filteredAndSorted} />
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 text-sm text-zinc-400">
        <p>Note: For production use, connect a backend that fetches public profile media via official APIs or authorized scraping. This demo uses local mock data.</p>
      </footer>
    </div>
  );
}
