"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase, isConfigured } from "@/lib/supabase";
import type { Opportunity } from "@/types";
import OpportunityCard from "@/components/OpportunityCard";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import { Loader2 } from "lucide-react";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [eligibility, setEligibility] = useState("All");
  const [location, setLocation] = useState("All");
  const [deadline, setDeadline] = useState("All");
  const [search, setSearch] = useState("");

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);

    if (!isConfigured) {
      setOpportunities([]);
      setLoading(false);
      return;
    }

    try {
      const today = new Date().toISOString().split("T")[0];

      let query = supabase
        .from("opportunities")
        .select("*")
        .eq("is_active", true)
        .or(`deadline.gte.${today},deadline.is.null`)
        .order("created_at", { ascending: false });

      if (category && category !== "All") {
        query = query.eq("category", category);
      }

      if (eligibility && eligibility !== "All") {
        query = query.ilike("eligibility", `%${eligibility}%`);
      }

      if (location && location !== "All") {
        if (location === "International") {
          query = query.not("location", "ilike", "%India%");
          query = query.not("location", "ilike", "%Delhi%");
          query = query.not("location", "ilike", "%Bangalore%");
          query = query.not("location", "ilike", "%Mumbai%");
        } else {
          query = query.ilike("location", `%${location}%`);
        }
      }

      if (deadline && deadline !== "All") {
        const now = new Date();
        if (deadline === "This Week") {
          const weekLater = new Date(
            now.getTime() + 7 * 24 * 60 * 60 * 1000
          );
          query = query.gte("deadline", now.toISOString().split("T")[0]);
          query = query.lte(
            "deadline",
            weekLater.toISOString().split("T")[0]
          );
        } else if (deadline === "This Month") {
          const monthLater = new Date(
            now.getTime() + 30 * 24 * 60 * 60 * 1000
          );
          query = query.gte("deadline", now.toISOString().split("T")[0]);
          query = query.lte(
            "deadline",
            monthLater.toISOString().split("T")[0]
          );
        } else if (deadline === "Later") {
          const monthLater = new Date(
            now.getTime() + 30 * 24 * 60 * 60 * 1000
          );
          query = query.gt(
            "deadline",
            monthLater.toISOString().split("T")[0]
          );
        }
      }

      if (search) {
        query = query.or(
          `title.ilike.%${search}%,organization.ilike.%${search}%,tags.cs.{${search}}`
        );
      }

      const { data } = await query;
      setOpportunities(data || []);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    } finally {
      setLoading(false);
    }
  }, [category, eligibility, location, deadline, search]);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary">
          All Opportunities
        </h1>
        <p className="text-text-muted mt-2 text-sm">
          Browse JRF, PhD, government, and private sector opportunities.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <SearchBar onSearch={setSearch} />
        <FilterBar
          selectedCategory={category}
          selectedEligibility={eligibility}
          selectedLocation={location}
          selectedDeadline={deadline}
          onCategoryChange={setCategory}
          onEligibilityChange={setEligibility}
          onLocationChange={setLocation}
          onDeadlineChange={setDeadline}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-cyan animate-spin" />
        </div>
      ) : opportunities.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted">No opportunities found.</p>
          <p className="text-text-muted text-sm mt-1">
            Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </div>
  );
}
