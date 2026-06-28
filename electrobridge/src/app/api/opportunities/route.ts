import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const eligibility = searchParams.get("eligibility");
    const location = searchParams.get("location");
    const deadline = searchParams.get("deadline");
    const search = searchParams.get("search");

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
        const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        query = query.gte("deadline", now.toISOString().split("T")[0]);
        query = query.lte("deadline", weekLater.toISOString().split("T")[0]);
      } else if (deadline === "This Month") {
        const monthLater = new Date(
          now.getTime() + 30 * 24 * 60 * 60 * 1000
        );
        query = query.gte("deadline", now.toISOString().split("T")[0]);
        query = query.lte("deadline", monthLater.toISOString().split("T")[0]);
      } else if (deadline === "Later") {
        const monthLater = new Date(
          now.getTime() + 30 * 24 * 60 * 60 * 1000
        );
        query = query.gt("deadline", monthLater.toISOString().split("T")[0]);
      }
    }

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,organization.ilike.%${search}%,tags.cs.{${search}}`
      );
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ opportunities: data, count: data?.length || 0 });
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    return NextResponse.json(
      { error: "Failed to fetch opportunities" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from("opportunities")
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json({ opportunity: data?.[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating opportunity:", error);
    return NextResponse.json(
      { error: "Failed to create opportunity" },
      { status: 500 }
    );
  }
}
