import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20',
        blue: 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20',
        green: 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20',
        yellow: 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20',
        red: 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20',
        purple: 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20',
        gray: 'bg-[#1F2937] text-[#94A3B8] border border-[#1F2937]',
      },
      size: {
        xs: 'px-1.5 py-0.5 text-[10px]',
        sm: 'px-2.5 py-1 text-[11px]',
        md: 'px-3 py-1 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
