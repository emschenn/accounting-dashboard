export function formatNumber(
  input: string | number | undefined | null
): string {
  if (!input) return "";
  return (+(+input).toFixed()).toLocaleString();
}
