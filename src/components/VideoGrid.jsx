import { ExternalLink } from 'lucide-react';

export default function VideoGrid({ loading, items }) {
  if (loading) {
    return (
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[9/16] rounded-xl bg-zinc-900/70 border border-zinc-800 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="mt-10 text-center text-zinc-400">No videos to display. Try another profile or adjust filters.</div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {items.map((v) => (
        <Card key={v.id} v={v} />)
      )}
    </div>
  );
}

function Card({ v }) {
  const engagement = ((v.likes + v.comments + v.saves + v.shares) / Math.max(1, v.views)) * 100;
  return (
    <a href={v.url} target="_blank" rel="noreferrer" className="group block">
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70">
        <div className="relative aspect-[9/16] overflow-hidden">
          <img src={v.thumbnail} alt={v.caption || 'video thumbnail'} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs text-white/90">
            <div className="flex gap-2 bg-black/40 backdrop-blur px-2 py-1 rounded-lg">
              <Metric label="Views" value={v.views} />
              <Metric label="Likes" value={v.likes} />
              <Metric label="Com" value={v.comments} />
              <Metric label="Saves" value={v.saves} />
              <Metric label="Shares" value={v.shares} />
            </div>
            <div className="bg-black/40 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1">
              <span>{engagement.toFixed(2)}%</span>
              <span className="text-white/60">ER</span>
            </div>
          </div>
        </div>
        <div className="p-3 flex items-center justify-between gap-3">
          <div className="text-sm line-clamp-2 text-zinc-200">{v.caption || 'Untitled'}</div>
          <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300" />
        </div>
      </div>
    </a>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex items-center gap-1">
      <span className="font-semibold">{new Intl.NumberFormat('en', { notation: 'compact' }).format(value)}</span>
      <span className="text-white/70">{label}</span>
    </div>
  );
}
