import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">
              Electro<span className="text-cyan">Bridge</span>
            </h3>
            <p className="text-text-muted text-sm">
              Your gateway to electronics &amp; semiconductor opportunities in
              India and globally.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-text-primary mb-3">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/opportunities"
                className="text-text-muted hover:text-text-primary transition-colors text-sm"
              >
                All Opportunities
              </Link>
              <Link
                href="/news"
                className="text-text-muted hover:text-text-primary transition-colors text-sm"
              >
                Tech News
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-text-primary mb-3">
              Categories
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/opportunities?category=JRF"
                className="text-text-muted hover:text-text-primary transition-colors text-sm"
              >
                JRF / SRF Positions
              </Link>
              <Link
                href="/opportunities?category=PhD"
                className="text-text-muted hover:text-text-primary transition-colors text-sm"
              >
                PhD Opportunities
              </Link>
              <Link
                href="/opportunities?category=Govt+Job"
                className="text-text-muted hover:text-text-primary transition-colors text-sm"
              >
                Govt Jobs
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} ElectroBridge. Built for the
            electronics research community.
          </p>
        </div>
      </div>
    </footer>
  );
}
