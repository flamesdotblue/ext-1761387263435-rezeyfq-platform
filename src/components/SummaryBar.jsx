import { Loader2, Info } from 'lucide-react';

export default function SummaryBar({ loading, error, totals, count }) {
  if (loading) {
    return (
      <div className="mt-4 flex items-center gap-3 text-zinc-300">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading profile data…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 flex items-center gap-3 text-red-300">
        <Info className="h-5 w-5" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-3">
      <Stat label="Videos" value={String(totals.total || 0)} />
      <Stat label="Avg Views" value={formatNumber(totals.avg?.views || 0)} />
      <Stat label="Avg Likes" value={formatNumber(totals.avg?.likes || 0)} />
      <Stat label="Avg Comments" value={formatNumber(totals.avg?.comments || 0)} />
      <Stat label="Avg Saves" value={formatNumber(totals.avg?.saves || 0)} />
      <Stat label="Avg Shares" value={formatNumber(totals.avg?.shares || 0)} />
      <div className="col-span-2 md:col-span-6 text-sm text-zinc-400">Showing {count} results</div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-zinc-900/70 border border-zinc-800 p-3">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function formatNumber(n) {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(n);
}
