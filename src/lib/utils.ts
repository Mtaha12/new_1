export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default cn;

export async function fetchContentBySlug(slug: string): Promise<any | null> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || '';
    const res = await fetch(`${base}/api/content/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.item ?? null;
  } catch {
    return null;
  }
}