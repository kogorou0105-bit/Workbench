"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // 支持可选的标签
  error?: string; // 支持错误提示
}

// 使用 forwardRef 确保组件可以配合 React Hook Form 等库使用
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label: 类似积木的小标题 */}
        {label && (
          <label className="ml-1 text-sm font-bold text-slate-500 uppercase tracking-wider">
            {label}
          </label>
        )}

        {/* Input 核心区域 */}
        <input
          ref={ref}
          className={`
            w-full px-5 py-3
            text-slate-700 font-bold placeholder:text-slate-400 placeholder:font-medium
            bg-slate-50 
            border-2 border-slate-200
            rounded-2xl
            outline-none
            transition-all duration-200
            focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]
            ${
              error
                ? "border-red-300 bg-red-50 text-red-600 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]"
                : ""
            }
            
            ${className}
          `}
          {...props}
        />

        {/* Error Message */}
        {error && (
          <p className="ml-1 text-xs font-bold text-red-400 animate-pulse">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
