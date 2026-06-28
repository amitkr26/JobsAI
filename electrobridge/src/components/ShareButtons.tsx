"use client";

import { MessageCircle, Twitter } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  organization: string;
  deadline: string | null;
  opportunityUrl: string;
}

export default function ShareButtons({
  title,
  organization,
  deadline,
  opportunityUrl,
}: ShareButtonsProps) {
  const shareText = `New JRF/PhD opportunity: ${title} at ${organization} | Deadline: ${deadline || "TBD"} | Apply: ${opportunityUrl} | More opportunities: https://electrobridge.vercel.app`;
  const tweetText = `New opportunity: ${title} at ${organization} | Deadline: ${deadline || "TBD"} #JRF #Electronics #Semiconductor`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(opportunityUrl)}`;

  return (
    <div className="flex items-center gap-2">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600/20 text-green-400 rounded-lg text-xs font-medium hover:bg-green-600/30 transition-colors border border-green-600/30"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        WhatsApp
      </a>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-600/30 transition-colors border border-blue-600/30"
        title="Share on Twitter/X"
      >
        <Twitter className="w-3.5 h-3.5" />
        Twitter
      </a>
    </div>
  );
}
