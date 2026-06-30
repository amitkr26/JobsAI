export async function generateStaticParams() {
  try {
    const { api } = await import('@/lib/api');
    const res = await api.organizations.list();
    return (res.data || []).map((o: any) => ({ slug: o.slug }));
  } catch {
    return [];
  }
}

export default function OrganizationSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
