export async function generateStaticParams() {
  const slugs = [
    'b49ab93c-139b-405b-bbbb-ee4868a47288',
    '1301e276-0d27-4621-90a2-de7276c3d99c',
    '39368138-b104-4d08-a9c6-90fcbe908845',
    '01b3b6ec-449e-4787-82b2-b9efe100f970',
    'ac305d5c-abee-4af8-9514-ec971728a349',
  ];
  return slugs.map((slug) => ({ slug }));
}

export default function OpportunitySlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}