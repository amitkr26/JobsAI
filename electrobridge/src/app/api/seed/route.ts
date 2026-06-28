import { NextResponse } from "next/server";
import { supabaseAdmin, isConfigured } from "@/lib/supabase";
import { SEED_OPPORTUNITIES } from "@/lib/seed-data";

export async function GET() {
  if (!isConfigured) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }

  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Admin access not configured." }, { status: 503 });
    }
    const { data: existing } = await supabaseAdmin
      .from("opportunities")
      .select("id")
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({
        message: "Database already has data. Skipping seed.",
        count: existing.length,
      });
    }

    const { data, error } = await supabaseAdmin
      .from("opportunities")
      .insert(SEED_OPPORTUNITIES)
      .select();

    if (error) throw error;

    return NextResponse.json({
      message: "Seed data inserted successfully",
      count: data?.length || 0,
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return NextResponse.json(
      { error: "Failed to seed data" },
      { status: 500 }
    );
  }
}
