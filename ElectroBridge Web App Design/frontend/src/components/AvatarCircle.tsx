interface AvatarCircleProps {
  initials: string;
  color: string;
}

export function AvatarCircle({ initials, color }: AvatarCircleProps) {
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
      style={{ background: color + '33', border: `1.5px solid ${color}50` }}
    >
      <span style={{ color }}>{initials}</span>
    </div>
  );
}
