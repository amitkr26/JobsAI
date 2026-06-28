"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { NewsArticle } from "@/types";
import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";
import { Loader2, RefreshCw } from "lucide-react";

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("news_articles")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(50);

      if (search) {
        query = query.or(
          `title.ilike.%${search}%,summary.ilike.%${search}%`
        );
      }

      const { data } = await query;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-primary">
            Tech News
          </h1>
          <p className="text-text-muted mt-2 text-sm">
            Latest electronics, semiconductor, and research news.
          </p>
        </div>
        <button
          onClick={fetchNews}
          className="inline-flex items-center gap-2 text-cyan text-sm font-medium hover:underline"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="mb-8 max-w-md">
        <SearchBar
          onSearch={setSearch}
          placeholder="Search news articles..."
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-cyan animate-spin" />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted">No news articles yet.</p>
          <p className="text-text-muted text-sm mt-1">
            News will appear here once fetched from RSS feeds.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
