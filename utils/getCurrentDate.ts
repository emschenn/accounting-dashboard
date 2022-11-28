export function getCurrentDate(): string {
  const now = new Date();
  return `${now.getFullYear()}.${now.getMonth() + 1}`;
}
