import { useState } from 'react';
import { Loader2, Search } from 'lucide-react';

export default function ProfileInput({ platform, onPlatformChange, value, onChange, onSubmit, loading }) {
  const [localValue, setLocalValue] = useState(value || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(localValue.trim());
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-[150px_1fr_140px] gap-3">
      <select
        aria-label="Platform"
        value={platform}
        onChange={(e) => onPlatformChange(e.target.value)}
        className="h-12 rounded-xl bg-zinc-900/70 border border-zinc-800 text-zinc-200 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="tiktok">TikTok</option>
        <option value="instagram">Instagram</option>
      </select>

      <input
        aria-label="Profile URL or username"
        type="text"
        inputMode="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={platform === 'tiktok' ? 'e.g. https://www.tiktok.com/@username or @username' : 'e.g. https://www.instagram.com/username or username'}
        className="h-12 rounded-xl bg-zinc-900/70 border border-zinc-800 text-zinc-100 placeholder-zinc-500 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="h-12 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition text-white font-semibold flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
        {loading ? 'Fetching...' : 'Analyze'}
      </button>
    </form>
  );
}
