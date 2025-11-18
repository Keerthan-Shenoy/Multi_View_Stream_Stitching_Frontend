// Format uptime in hours and minutes
export function formatUptime(seconds) {
  if (!seconds) return '0h 0m';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

// Format load average array
export function formatLoadAverage(loadAvg) {
  if (!loadAvg || !Array.isArray(loadAvg)) return '';
  return loadAvg.map(l => l.toFixed(2)).join(', ');
}

// Copy text to clipboard with notification
export function copyToClipboard(text, toast, label = 'Text') {
  navigator.clipboard.writeText(text);
  toast.success(`${label} copied!`);
}

// Get active and total stream counts
export function getStreamCounts(streams) {
  const activeStreams = streams.filter(s => s.enabled).length;
  const totalStreams = streams.length;
  return { activeStreams, totalStreams };
}
