import { ReactNode } from "react";

type BadgeVariant = "default" | "neutral" | "danger" | "success" | "warning";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const variants = {
    default: "bg-blue-100 text-blue-600 border-blue-200",
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    danger: "bg-red-100 text-red-600 border-red-200",
    success: "bg-emerald-100 text-emerald-600 border-emerald-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={`
      inline-flex items-center px-2.5 py-0.5 
      rounded-lg border-2
      text-xs font-bold uppercase tracking-wider
      ${variants[variant]}
      ${className}
    `}
    >
      {children}
    </span>
  );
};
