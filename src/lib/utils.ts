export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default cn;

export async function fetchContentBySlug(slug: string): Promise<any | null> {
  try {
    const res = await fetch(`/api/content/${slug}`, { cache: 'no-store' });
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.item ?? null;
  } catch (error) {
    console.warn(`Failed to fetch content for slug "${slug}":`, error);
    return null;
  }
}