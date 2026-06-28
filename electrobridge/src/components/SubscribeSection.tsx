"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import SubscribeModal from "./SubscribeModal";

export default function SubscribeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const quickSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, keywords: [], categories: [] }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 text-success">
        <Check className="w-5 h-5" />
        <span className="text-sm font-medium">Subscribed! Check your inbox.</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
        <form onSubmit={quickSubscribe} className="flex w-full gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-gray-800 border border-gray-700 text-text-primary text-sm rounded-lg px-4 py-2.5 focus:ring-cyan focus:border-cyan outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-cyan text-navy font-semibold rounded-lg px-4 py-2.5 text-sm hover:bg-cyan/90 transition-colors whitespace-nowrap disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-cyan text-xs mt-2 hover:underline"
      >
        Set preferences (keywords &amp; categories)
      </button>
      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
