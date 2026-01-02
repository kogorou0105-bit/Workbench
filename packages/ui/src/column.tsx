import { ReactNode, HTMLAttributes } from "react";

interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
  title: string; // 列标题
  count?: number; // 任务数量
  children?: ReactNode; // 里面的卡片
  action?: ReactNode; // 标题栏右侧的操作按钮（比如 + 号）
}

export const Column = ({
  title,
  count,
  children,
  action,
  className = "",
  ...props
}: ColumnProps) => {
  return (
    <div
      className={`
        flex flex-col gap-4
        min-w-[320px] w-[320px] 
        px-4 pt-4 pb-8 
        bg-slate-100/80         
        border-2 border-slate-200/50
        rounded-3xl
        shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]
        transition-colors
        ${className}
      `}
      {...props}
    >
      {/* Header: 标题栏 */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h2 className="font-black text-slate-600 uppercase tracking-wide text-sm">
            {title}
          </h2>
          {/* 数量气泡：用深一点的颜色强调 */}
          {count !== undefined && (
            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-lg text-xs font-bold">
              {count}
            </span>
          )}
        </div>

        {/* 操作区 */}
        {action}
      </div>

      {/* Body: 卡片存放区 */}
      <div className="flex flex-col flex-1 pb-4 px-1 gap-3 h-full overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
