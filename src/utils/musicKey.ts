/**
 * Formats ASCII accidentals (# and b) into proper musical notation (♯ and ♭) for display,
 * while preserving the underlying stored key value.
 */
export function formatMusicalKey(key: string | null | undefined): string {
  if (!key) return '';
  return key
    .replace(/^([A-G])#/, '$1♯')
    .replace(/^([A-G])b/, '$1♭');
}
