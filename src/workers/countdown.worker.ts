// Target date: February 27, 2026 00:00:00 Bogotá Time (UTC-5)
const TARGET_DATE = "Feb 27 00:00:00 2026";

// Month mapping for date parsing
const MONTH_MAP: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

// Convert Bogotá time string to UTC timestamp
const parseColombiaTime = (ts: string): number => {
  const parts = ts.split(" ");
  if (parts.length !== 4) return Date.now();

  const month = MONTH_MAP[parts[0]];
  const day = parseInt(parts[1], 10);
  const timeParts = parts[2].split(":");
  const year = parseInt(parts[3], 10);

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const seconds = parseInt(timeParts[2], 10);

  // Create date in Bogotá timezone
  const bogotaDate = new Date(
    Date.UTC(year, month, day, hours, minutes, seconds),
  );

  // Bogotá is UTC-5, convert to UTC
  const utcDate = new Date(bogotaDate.getTime() + 5 * 60 * 60 * 1000);
  return utcDate.getTime();
};

// Format countdown string
const formatCountdown = (diff: number): string => {
  if (diff <= 0) return "TIME REACHED!";

  const secondsTotal = Math.floor(diff / 1000);
  const days = Math.floor(secondsTotal / (3600 * 24));
  const hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  // Format each part with leading zeros
  const format = (num: number, length: number = 2): string => {
    return num.toString().padStart(length, "0");
  };

  return `${days}:${format(hours)}:${format(minutes)}:${format(seconds)}`;
};

// Message handling
onmessage = function (e: MessageEvent<{ start: boolean }>) {
  if (e.data.start) {
    const targetUTC = parseColombiaTime(TARGET_DATE);

    setInterval(() => {
      const now = Date.now();
      const diff = targetUTC - now;

      try {
        postMessage({
          countdown: `${formatCountdown(diff)}`,
        });
      } catch (err) {
        postMessage({
          error: `Time calculation error: ${err instanceof Error ? err.message : String(err)}`,
        });
      }
    }, 100); // Update every 100ms
  }
};

// Export for TypeScript module recognition
export default {} as typeof Worker & (new () => Worker);
