export async function generateStaticParams() {
  try {
    const { api } = await import('@/lib/api');
    const res = await api.opportunities.list({ verified: 'true' });
    return (res.data || []).map((o: any) => ({ slug: String(o.id) }));
  } catch {
    return [];
  }
}

export default function OpportunitySlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
