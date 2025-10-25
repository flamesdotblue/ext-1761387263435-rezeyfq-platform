import { ArrowDownAZ, ArrowUpAZ, Filter } from 'lucide-react';

export default function ControlsBar({ sortBy, onSortBy, order, onOrder, timeRange, onTimeRange, topN, onTopN, disabled }) {
  const sorts = [
    { value: 'views', label: 'Views' },
    { value: 'likes', label: 'Likes' },
    { value: 'comments', label: 'Comments' },
    { value: 'saves', label: 'Saves' },
    { value: 'shares', label: 'Shares' },
    { value: 'engagement', label: 'Engagement %' },
  ];

  const ranges = [
    { value: 'all', label: 'All time' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '365d', label: 'Last 12 months' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div className="flex items-center gap-2 text-zinc-300">
        <Filter className="h-5 w-5" />
        <span className="font-medium">Filters</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <select
          value={sortBy}
          onChange={(e) => onSortBy(e.target.value)}
          disabled={disabled}
          className="h-10 rounded-lg bg-zinc-900/70 border border-zinc-800 text-zinc-200 px-3"
        >
          {sorts.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onOrder(order === 'desc' ? 'asc' : 'desc')}
          className="h-10 rounded-lg bg-zinc-900/70 border border-zinc-800 text-zinc-200 px-3 flex items-center gap-2 justify-center"
        >
          {order === 'desc' ? <ArrowDownAZ className="h-4 w-4" /> : <ArrowUpAZ className="h-4 w-4" />}
          {order === 'desc' ? 'High → Low' : 'Low → High'}
        </button>

        <select
          value={timeRange}
          onChange={(e) => onTimeRange(e.target.value)}
          disabled={disabled}
          className="h-10 rounded-lg bg-zinc-900/70 border border-zinc-800 text-zinc-200 px-3"
        >
          {ranges.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-400">Top</label>
          <input
            type="number"
            min={1}
            max={500}
            step={1}
            value={topN}
            onChange={(e) => onTopN(Number(e.target.value))}
            disabled={disabled}
            className="h-10 w-24 rounded-lg bg-zinc-900/70 border border-zinc-800 text-zinc-200 px-3"
          />
        </div>

        <div className="flex items-center justify-end text-sm text-zinc-500">
          <span>Sort and filter results</span>
        </div>
      </div>
    </div>
  );
}
