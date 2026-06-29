import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UGC-NET vs GATE for Electronics Research — Which to Choose? | ElectroBridge",
  description: "Complete comparison of UGC-NET Electronic Science vs GATE ECE for electronics research careers. Which exam opens JRF, which leads to PSU jobs, stipend comparison, difficulty analysis.",
  alternates: { canonical: "https://electrobridge.vercel.app/resources/net-vs-gate" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Which is better for JRF — NET or GATE?", acceptedAnswer: { "@type": "Answer", text: "Both qualify for JRF but through different routes: UGC-NET opens JRF at universities/colleges; GATE opens CSIR-JRF at CSIR labs leading to AcSIR PhD." } },
    { "@type": "Question", name: "Can I appear for both NET and GATE?", acceptedAnswer: { "@type": "Answer", text: "Yes, many candidates appear for both. UGC-NET is held in June/December, GATE in February. The syllabi overlap significantly (70-80% common topics in Electronic Science/ECE)." } },
    { "@type": "Question", name: "Which exam is harder — NET or GATE?", acceptedAnswer: { "@type": "Answer", text: "GATE ECE is generally considered more competitive due to higher number of applicants and wider syllabus. UGC-NET Electronic Science has a narrower syllabus focused on research-oriented electronics topics." } },
  ],
};

export default function NetVsGatePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Link href="/resources" className="text-cyan text-sm hover:underline mb-4 inline-block">&larr; Back to Resources</Link>
      <h1 className="font-display text-3xl font-bold text-text-primary mb-8">UGC-NET vs GATE for Electronics Research Career — Which Should You Choose?</h1>

      <div className="space-y-8 text-text-muted text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-text-primary mb-3">Key Differences at a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-gray-700"><th className="text-left py-2 px-3 text-text-primary">Parameter</th><th className="text-left py-2 px-3 text-text-primary">UGC-NET Electronic Science</th><th className="text-left py-2 px-3 text-text-primary">GATE ECE</th></tr></thead>
              <tbody>
                <tr className="border-b border-gray-800"><td className="py-2 px-3">Conducting Body</td><td className="py-2 px-3">NTA (for UGC)</td><td className="py-2 px-3">IISc / IITs</td></tr>
                <tr className="border-b border-gray-800"><td className="py-2 px-3">Frequency</td><td className="py-2 px-3">Twice a year (June/Dec)</td><td className="py-2 px-3">Once a year (Feb)</td></tr>
                <tr className="border-b border-gray-800"><td className="py-2 px-3">Validity</td><td className="py-2 px-3">3 years for JRF</td><td className="py-2 px-3">3 years</td></tr>
                <tr className="border-b border-gray-800"><td className="py-2 px-3">JRF Eligibility</td><td className="py-2 px-3">Directly qualifies for UGC-JRF</td><td className="py-2 px-3">Qualifies for CSIR-JRF</td></tr>
                <tr className="border-b border-gray-800"><td className="py-2 px-3">JRF Tenable At</td><td className="py-2 px-3">Any university/college</td><td className="py-2 px-3">CSIR labs (AcSIR PhD)</td></tr>
                <tr className="border-b border-gray-800"><td className="py-2 px-3">Also Qualifies For</td><td className="py-2 px-3">Assistant Professor</td><td className="py-2 px-3">PSU jobs, MTech admissions</td></tr>
                <tr><td className="py-2 px-3">Syllabus Coverage</td><td className="py-2 px-3">Narrower, research-focused</td><td className="py-2 px-3">Wider, engineering-focused</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-text-primary mb-3">Which One Should You Choose?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-text-primary">Choose UGC-NET if</strong>: You want flexibility to do JRF at any university/college, want the option of becoming an Assistant Professor later, or prefer a narrower syllabus focused on research topics.</li>
            <li><strong className="text-text-primary">Choose GATE if</strong>: You want to do JRF at CSIR labs (NPL, CEERI, etc.) with AcSIR PhD, want PSU jobs as backup, or want MTech admission options.</li>
            <li><strong className="text-text-primary">Best strategy</strong>: Appear for both! 70-80% syllabus overlap means preparing for one helps with the other. UGC-NET in June/December + GATE in February is manageable.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-text-primary mb-3">Stipend Comparison: NET-JRF vs GATE-JRF</h2>
          <p>Both UGC-NET JRF and CSIR-GATE JRF offer the same stipend of ₹37,000/month (JRF) and ₹42,000/month (SRF). However, UGC-JRF recipients have more flexibility in choosing their host institution, while CSIR-JRF recipients are typically placed at CSIR labs. The career progression and final PhD degree value are comparable.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-text-primary mb-3">Syllabus Comparison</h2>
          <p>UGC-NET Electronic Science covers 8 units: Electronic Devices, Circuit Theory, Analog Electronics, Digital Electronics, Signals & Systems, Communication Systems, Electromagnetics, and VLSI & Embedded Systems. GATE ECE covers additional engineering topics like Control Systems, Network Theory in more depth, and includes engineering mathematics. The overlap is significant (~70%) in core electronics topics.</p>
        </section>

        <section className="bg-navy-light border border-cyan/20 rounded-xl p-6">
          <h2 className="font-display text-lg font-bold text-text-primary mb-3">Ready to Find JRF Positions?</h2>
          <p className="mb-4">Whether you choose NET or GATE, ElectroBridge has active JRF positions waiting for you.</p>
          <Link href="/opportunities?category=JRF" className="inline-flex items-center gap-2 bg-cyan text-navy font-semibold rounded-lg px-4 py-2 text-sm hover:bg-cyan/90 transition-colors">
            Browse JRF Positions →
          </Link>
        </section>
      </div>
    </div>
  );
}
