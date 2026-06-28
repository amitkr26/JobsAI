"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, isConfigured } from "@/lib/supabase";
import type { Opportunity, Subscriber } from "@/types";
import { CATEGORIES } from "@/lib/utils";
import { NEWS_SOURCES } from "@/lib/scrapers/rss-parser";
import { Loader2, Trash2, Plus, RefreshCw, Check, List, History } from "lucide-react";

interface ScrapeLog {
  id: number;
  timestamp: string;
  status: "success" | "error";
  message: string;
  total_fetched?: number;
  inserted?: number;
  skipped?: number;
}

let logIdCounter = 0;

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"opportunities" | "add" | "subscribers" | "sources" | "logs">(
    "opportunities"
  );

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    organization: "",
    category: "JRF",
    location: "",
    stipend: "",
    deadline: "",
    eligibility: "",
    description: "",
    apply_link: "",
    tags: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formMessage, setFormMessage] = useState("");
  const [scrapeStatus, setScrapeStatus] = useState("");
  const [scrapeLogs, setScrapeLogs] = useState<ScrapeLog[]>([]);
  const [sourcesEnabled, setSourcesEnabled] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      NEWS_SOURCES.forEach((s) => (initial[s.name] = true));
      return initial;
    }
  );

  const addLog = useCallback((log: Omit<ScrapeLog, "id" | "timestamp">) => {
    logIdCounter++;
    setScrapeLogs((prev) => [
      {
        id: logIdCounter,
        timestamp: new Date().toLocaleString(),
        ...log,
      },
      ...prev,
    ]);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "electrobridge2026";
    if (password === adminPassword) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const fetchOpportunities = async () => {
    setLoading(true);
    if (!isConfigured) {
      setOpportunities([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });
    setOpportunities(data || []);
    setLoading(false);
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    if (!isConfigured) {
      setSubscribers([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    setSubscribers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) {
      fetchOpportunities();
      fetchSubscribers();
    }
  }, [authenticated]);

  const handleAddOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const res = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          is_active: true,
        }),
      });

      if (res.ok) {
        setFormStatus("success");
        setFormMessage("Opportunity added successfully!");
        setForm({
          title: "",
          organization: "",
          category: "JRF",
          location: "",
          stipend: "",
          deadline: "",
          eligibility: "",
          description: "",
          apply_link: "",
          tags: "",
        });
        fetchOpportunities();
      } else {
        const data = await res.json();
        setFormStatus("error");
        setFormMessage(data.error || "Failed to add opportunity");
      }
    } catch {
      setFormStatus("error");
      setFormMessage("Something went wrong");
    }
  };

  const handleDeleteOpportunity = async (id: string) => {
    if (!confirm("Delete this opportunity?")) return;
    const { error } = await supabase.from("opportunities").delete().eq("id", id);
    if (!error) {
      fetchOpportunities();
    }
  };

  const handleMarkExpired = async (id: string) => {
    const { error } = await supabase
      .from("opportunities")
      .update({ is_active: false })
      .eq("id", id);
    if (!error) {
      fetchOpportunities();
    }
  };

  const handleScrape = async () => {
    setScrapeStatus("Scraping...");
    addLog({ status: "success", message: "Scraping started..." });
    try {
      const res = await fetch("/api/scrape");
      const data = await res.json();
      const msg = `Done: ${data.inserted} new, ${data.skipped} duplicates`;
      setScrapeStatus(msg);
      addLog({
        status: "success",
        message: msg,
        total_fetched: data.total_fetched,
        inserted: data.inserted,
        skipped: data.skipped,
      });
    } catch {
      const msg = "Scrape failed";
      setScrapeStatus(msg);
      addLog({ status: "error", message: msg });
    }
  };

  if (!authenticated) {
    return (
      <div className="max-w-sm mx-auto px-4 py-20">
        <h1 className="font-display text-2xl font-bold text-text-primary text-center mb-6">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-4 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-cyan text-navy font-semibold rounded-lg py-2.5 text-sm"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-bold text-text-primary mb-6">
        Admin Panel
      </h1>

      <div className="flex gap-2 mb-6 border-b border-gray-800 pb-4 overflow-x-auto">
        {(["opportunities", "add", "subscribers", "sources", "logs"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-cyan/20 text-cyan"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            {tab === "opportunities"
              ? "Opportunities"
              : tab === "add"
              ? "Add New"
              : tab === "subscribers"
              ? "Subscribers"
              : tab === "sources"
              ? "News Sources"
              : "Scrape Logs"}
          </button>
        ))}
      </div>

      {activeTab === "opportunities" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-text-primary">
              All Opportunities ({opportunities.length})
            </h2>
            <button
              onClick={handleScrape}
              className="flex items-center gap-2 text-cyan text-sm font-medium hover:underline"
            >
              <RefreshCw className="w-4 h-4" />
              Scrape News
            </button>
          </div>
          {scrapeStatus && (
            <p className="text-text-muted text-sm mb-4">{scrapeStatus}</p>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 text-cyan animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-text-muted">
                    <th className="text-left py-3 px-2">Title</th>
                    <th className="text-left py-3 px-2">Organization</th>
                    <th className="text-left py-3 px-2">Category</th>
                    <th className="text-left py-3 px-2">Deadline</th>
                    <th className="text-left py-3 px-2">Active</th>
                    <th className="text-right py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((opp) => (
                    <tr
                      key={opp.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30"
                    >
                      <td className="py-3 px-2 text-text-primary max-w-[200px] truncate">
                        {opp.title}
                      </td>
                      <td className="py-3 px-2 text-text-muted">
                        {opp.organization}
                      </td>
                      <td className="py-3 px-2">{opp.category}</td>
                      <td className="py-3 px-2 text-text-muted text-xs">
                        {opp.deadline || "-"}
                      </td>
                      <td className="py-3 px-2">
                        {opp.is_active ? (
                          <span className="text-success text-xs">Active</span>
                        ) : (
                          <span className="text-red-400 text-xs">Expired</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {opp.is_active && (
                            <button
                              onClick={() => handleMarkExpired(opp.id!)}
                              className="text-xs text-warning hover:underline"
                            >
                              Expire
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteOpportunity(opp.id!)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "add" && (
        <div className="max-w-2xl">
          <h2 className="font-display text-xl font-bold text-text-primary mb-4">
            Add New Opportunity
          </h2>
          <form onSubmit={handleAddOpportunity} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted text-xs font-medium mb-1">
                  Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-3 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
                />
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium mb-1">
                  Organization
                </label>
                <input
                  required
                  value={form.organization}
                  onChange={(e) =>
                    setForm({ ...form, organization: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-3 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted text-xs font-medium mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-3 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium mb-1">
                  Location
                </label>
                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-3 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted text-xs font-medium mb-1">
                  Stipend
                </label>
                <input
                  value={form.stipend}
                  onChange={(e) =>
                    setForm({ ...form, stipend: e.target.value })
                  }
                  placeholder="₹37,000/month"
                  className="w-full bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-3 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
                />
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) =>
                    setForm({ ...form, deadline: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-3 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium mb-1">
                Eligibility
              </label>
              <input
                value={form.eligibility}
                onChange={(e) =>
                  setForm({ ...form, eligibility: e.target.value })
                }
                placeholder="NET/GATE, MSc Electronics"
                className="w-full bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-3 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
              />
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-3 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted text-xs font-medium mb-1">
                  Apply Link
                </label>
                <input
                  value={form.apply_link}
                  onChange={(e) =>
                    setForm({ ...form, apply_link: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-3 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
                />
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="VLSI, thin film, JRF"
                  className="w-full bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-3 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
                />
              </div>
            </div>
            {formStatus === "success" && (
              <p className="flex items-center gap-2 text-success text-sm">
                <Check className="w-4 h-4" />
                {formMessage}
              </p>
            )}
            {formStatus === "error" && (
              <p className="text-red-400 text-sm">{formMessage}</p>
            )}
            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="flex items-center gap-2 bg-cyan text-navy font-semibold rounded-lg px-6 py-2.5 text-sm hover:bg-cyan/90 transition-colors disabled:opacity-50"
            >
              {formStatus === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Opportunity
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {activeTab === "sources" && (
        <div>
          <h2 className="font-display text-xl font-bold text-text-primary mb-4">
            News Sources
          </h2>
          <p className="text-text-muted text-sm mb-4">
            RSS feeds used for news aggregation. Toggle sources on/off.
          </p>
          <div className="space-y-3">
            {NEWS_SOURCES.map((source) => (
              <div
                key={source.name}
                className="bg-navy-light border border-gray-800 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-text-primary text-sm font-medium">
                    {source.name}
                  </h3>
                  <p className="text-text-muted text-xs mt-0.5 break-all">
                    {source.url}
                  </p>
                  <div className="flex gap-1.5 mt-1.5">
                    {source.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-800 rounded text-text-muted text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sourcesEnabled[source.name]}
                    onChange={() =>
                      setSourcesEnabled((prev) => ({
                        ...prev,
                        [source.name]: !prev[source.name],
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan" />
                  <span className="ms-2 text-xs text-text-muted">
                    {sourcesEnabled[source.name] ? "Active" : "Disabled"}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "logs" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Scrape Logs
            </h2>
            {scrapeLogs.length > 0 && (
              <button
                onClick={() => setScrapeLogs([])}
                className="text-text-muted text-xs hover:text-text-primary transition-colors"
              >
                Clear logs
              </button>
            )}
          </div>
          {scrapeLogs.length === 0 ? (
            <p className="text-text-muted text-sm">
              No scrape logs yet. Run a scrape from the Opportunities tab.
            </p>
          ) : (
            <div className="space-y-2">
              {scrapeLogs.map((log) => (
                <div
                  key={log.id}
                  className={`bg-navy-light border rounded-lg p-3 ${
                    log.status === "success"
                      ? "border-gray-800"
                      : "border-red-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted text-xs">
                      {log.timestamp}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        log.status === "success"
                          ? "text-success"
                          : "text-red-400"
                      }`}
                    >
                      {log.status === "success" ? "Success" : "Error"}
                    </span>
                  </div>
                  <p className="text-text-primary text-sm mt-1">
                    {log.message}
                  </p>
                  {log.total_fetched !== undefined && (
                    <div className="flex gap-4 mt-2 text-xs text-text-muted">
                      <span>Fetched: {log.total_fetched}</span>
                      <span>Inserted: {log.inserted}</span>
                      <span>Skipped: {log.skipped}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "subscribers" && (
        <div>
          <h2 className="font-display text-xl font-bold text-text-primary mb-4">
            Subscribers ({subscribers.length})
          </h2>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 text-cyan animate-spin" />
            </div>
          ) : subscribers.length === 0 ? (
            <p className="text-text-muted">No subscribers yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-text-muted">
                    <th className="text-left py-3 px-2">Email</th>
                    <th className="text-left py-3 px-2">Categories</th>
                    <th className="text-left py-3 px-2">Keywords</th>
                    <th className="text-left py-3 px-2">Active</th>
                    <th className="text-left py-3 px-2">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30"
                    >
                      <td className="py-3 px-2 text-text-primary">
                        {sub.email}
                      </td>
                      <td className="py-3 px-2 text-text-muted text-xs">
                        {sub.categories?.join(", ") || "-"}
                      </td>
                      <td className="py-3 px-2 text-text-muted text-xs">
                        {sub.keywords?.join(", ") || "-"}
                      </td>
                      <td className="py-3 px-2">
                        {sub.is_active ? (
                          <span className="text-success text-xs">Active</span>
                        ) : (
                          <span className="text-red-400 text-xs">Inactive</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-text-muted text-xs">
                        {sub.created_at
                          ? new Date(sub.created_at).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
