"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

// 定义变体类型
type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string; // 允许外部传入额外样式（比如 margin）
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  // 1. 基础构造：弹性布局、圆角、字体、过渡动画
  // active:translate-y-[4px] 配合 shadow-none 实现按压沉底效果
  const baseStyles = `
    inline-flex items-center justify-center
    font-bold tracking-wide transition-all duration-150 ease-in-out
    rounded-2xl border-2 border-transparent
    cursor-pointer
    active:scale-95 active:translate-y-[4px] active:shadow-none
    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:active:translate-y-0 disabled:active:shadow-none
  `;

  // 2. 颜色变体 (背景色 + 文字色 + 3D阴影色)
  // 核心技巧：shadow-[0_4px_0_COLOR] 用来模拟厚度
  const variants = {
    primary: `
      bg-blue-400 text-white 
      shadow-[0_4px_0_#2563eb] hover:bg-blue-300
    `,
    // 阴影色是 tailwind 的 blue-600 (#2563eb)

    secondary: `
      bg-white text-slate-700 border-slate-200
      shadow-[0_4px_0_#cbd5e1] hover:bg-slate-50 hover:text-slate-900
    `,
    // 阴影色是 slate-300

    danger: `
      bg-red-400 text-white 
      shadow-[0_4px_0_#dc2626] hover:bg-red-300
    `,
    // 阴影色是 red-600

    success: `
      bg-emerald-400 text-white 
      shadow-[0_4px_0_#059669] hover:bg-emerald-300
    `,
    // 阴影色是 emerald-600

    ghost: `
      bg-transparent text-slate-500 
      hover:bg-slate-100 hover:text-slate-700
      shadow-none active:translate-y-0 active:scale-95
    `,
    // Ghost 按钮不需要 3D 阴影，只需要简单的缩放
  };

  // 3. 尺寸控制
  const sizes = {
    sm: "h-8 px-3 text-xs uppercase",
    md: "h-11 px-6 text-sm", // 稍微高一点，更像积木
    lg: "h-14 px-8 text-base",
    icon: "h-11 w-11 p-0", // 专门用于方形图标按钮
  };

  return (
    <button
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
