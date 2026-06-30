export async function generateStaticParams() {
  const slugs = [
    'india-semiconductor-mission-incentive',
    'isro-chandrayaan-4-cabinet-approval',
    'iisc-cryogenic-quantum-processor',
    'drdo-hypersonic-scramjet-test',
    'iit-bombay-intel-ai-research-lab',
  ];
  return slugs.map((slug) => ({ slug }));
}

export default function NewsSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}