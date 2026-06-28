import { ExternalLink, Clock } from "lucide-react";
import type { NewsArticle } from "@/types";

interface NewsCardProps {
  article: NewsArticle;
}

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <a
      href={article.source_url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-navy-light border border-gray-800 rounded-lg p-4 hover:border-cyan/30 transition-all duration-300 hover:translate-y-[-2px] block min-w-[280px] flex-shrink-0"
    >
      <div className="flex items-start gap-3">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt=""
            className="w-16 h-16 rounded object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded bg-cyan/10 flex items-center justify-center flex-shrink-0">
            <span className="text-cyan text-xs font-bold">
              {article.source?.substring(0, 2).toUpperCase() || "N"}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-text-primary text-sm font-semibold line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-cyan text-[10px] font-medium">
              {article.source}
            </span>
            {article.published_at && (
              <span className="flex items-center gap-1 text-text-muted text-[10px]">
                <Clock className="w-3 h-3" />
                {timeAgo(article.published_at)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-2 text-cyan text-[10px] hover:underline">
            Read More <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </a>
  );
}
