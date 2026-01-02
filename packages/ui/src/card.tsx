import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string; // 允许外部微调布局
}

export const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div
      className={`
        bg-white 
        rounded-2xl 
        border-2 border-slate-200
        p-4
        shadow-[0_4px_0_#cbd5e1]
        duration-200
        hover:-translate-y-0.5 
        hover:shadow-[0_6px_0_#cbd5e1]
        transform-gpu
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
