export async function generateStaticParams() {
  try {
    const { api } = await import('@/lib/api');
    const res = await api.news.list();
    return (res.data || []).map((n: any) => ({ slug: String(n.slug || n.id) }));
  } catch {
    return [];
  }
}

export default function NewsSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
