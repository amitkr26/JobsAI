export async function generateStaticParams() {
  const slugs = ['isro', 'iisc', 'intel', 'tata-motors', 'tifr', 'drdo'];
  return slugs.map((slug) => ({ slug }));
}

export default function OrganizationSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}