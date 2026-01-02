import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import { Column } from "@repo/ui/column";
import { Input } from "@repo/ui/input"; // 假设你之前创建了 input 组件

// --- 模拟数据 ---
const TASKS = [
  { id: "1", title: "Design System Draft", tag: "Design" },
  { id: "2", title: "Research Dnd Kits", tag: "Dev" },
  { id: "3", title: "Fix Navigation Bug", tag: "Bug" },
];

// --- 局部小组件 (Sidebar Item) ---
const SidebarItem = ({
  icon,
  label,
  active = false,
  count,
}: {
  icon: string;
  label: string;
  active?: boolean;
  count?: number;
}) => (
  <div
    className={`
    flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all
    ${
      active
        ? "bg-white text-blue-600 shadow-[0_2px_0_#cbd5e1] font-bold translate-y-[-1px]"
        : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-700"
    }
  `}
  >
    <div className="flex items-center gap-3">
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </div>
    {count && (
      <span
        className={`text-xs font-bold px-2 py-0.5 rounded-lg ${active ? "bg-blue-100" : "bg-slate-200"}`}
      >
        {count}
      </span>
    )}
  </div>
);

// --- TaskCard 组件 ---
const TaskCard = ({ title, tag }: { title: string; tag: string }) => (
  <Card className="flex flex-col gap-3 cursor-grab hover:-translate-y-1 transform-gpu transition-all duration-200 group">
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-slate-700 leading-tight group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <button className="text-slate-300 hover:text-red-400 font-bold px-1 opacity-0 group-hover:opacity-100 transition-opacity">
        •••
      </button>
    </div>
    <div className="flex justify-between items-center mt-1">
      <Badge
        variant={
          tag === "Bug" ? "danger" : tag === "Design" ? "warning" : "default"
        }
      >
        {tag}
      </Badge>
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-orange-300 border-2 border-white shadow-sm"></div>
    </div>
  </Card>
);

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    // 1. 最外层容器：占满屏幕，无滚动
    <div className="h-screen w-screen flex flex-col bg-slate-50 overflow-hidden font-sans">
      {/* 2. Header: 头部区域 */}
      <header className="h-16 flex-none bg-white border-b-2 border-slate-200 px-6 flex items-center justify-between z-10 shadow-sm relative">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500 rounded-xl shadow-[0_3px_0_#1e40af] flex items-center justify-center text-white font-black text-xl">
            TM
          </div>
          <h1 className="text-xl font-black text-slate-700 tracking-tight hidden sm:block">
            Task Master
          </h1>
          <div className="h-6 w-[2px] bg-slate-200 mx-2 hidden sm:block"></div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "◀" : "▶"} Menu
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {/* 搜索框 (稍微调小一点宽度) */}
          <div className="w-64 hidden md:block">
            <Input
              placeholder="Search tasks..."
              className="h-9 py-1 text-sm border-slate-200"
            />
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm"></div>
        </div>
      </header>

      {/* 3. 主体区域：包含侧边栏和看板 */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar: Inbox 面板 */}
        <aside
          className={`
          flex-none bg-slate-100 border-r-2 border-slate-200 flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64 p-4" : "w-0 p-0 border-none overflow-hidden"}
        `}
        >
          <div className="flex flex-col gap-1 w-64">
            {" "}
            {/* w-64 防止文字在收缩时换行 */}
            <div className="px-4 py-2 text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
              Workspace
            </div>
            <SidebarItem icon="📥" label="Inbox" count={4} active />
            <SidebarItem icon="📅" label="Today" count={2} />
            <SidebarItem icon="⭐" label="Favorites" />
            <div className="h-[2px] bg-slate-200 my-4 mx-2"></div>
            <div className="px-4 py-2 text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
              Boards
            </div>
            <SidebarItem icon="📦" label="Product Launch" />
            <SidebarItem icon="🎨" label="Design System" />
          </div>

          <div className="mt-auto w-64">
            <Card className="bg-blue-50 border-blue-100 shadow-none">
              <h4 className="font-bold text-blue-900 text-sm">Pro Plan</h4>
              <p className="text-xs text-blue-600 mt-1 mb-3">
                Get unlimited boards
              </p>
              <Button size="sm" className="w-full text-xs h-8">
                Upgrade
              </Button>
            </Card>
          </div>
        </aside>

        {/* Right Panel: Board 看板区域 */}
        <main className="flex-1 overflow-x-auto overflow-y-hidden bg-slate-50/50">
          <div className="h-full p-8 min-w-fit flex items-start gap-8">
            {/* Column 1: To Do */}
            <Column
              title="To Do"
              count={TASKS.length}
              // 关键：给 Column 加上 h-full 或者 max-h-full 让它撑开
              className="max-h-full h-full"
              action={
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-lg"
                >
                  +
                </Button>
              }
            >
              {TASKS.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))}
              <Button
                variant="secondary"
                className="w-full border-dashed border-2 bg-transparent shadow-none hover:shadow-sm text-slate-400"
              >
                + Add Task
              </Button>
            </Column>

            {/* Column 2: In Progress */}
            <Column title="In Progress" count={1} className="max-h-full h-full">
              <TaskCard title="Building Layout" tag="Dev" />
              {/* 塞很多卡片测试滚动 */}
              <TaskCard title="Test Scroll 1" tag="Dev" />
              <TaskCard title="Test Scroll 2" tag="Dev" />
              <TaskCard title="Test Scroll 3" tag="Dev" />
              <TaskCard title="Test Scroll 4" tag="Dev" />
              <TaskCard title="Test Scroll 5" tag="Dev" />
            </Column>

            {/* Column 3: Done */}
            <Column title="Done" count={0} className="max-h-full h-full">
              <div className="h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-sm font-bold">
                Drop here
              </div>
            </Column>

            {/* Add Column Button */}
            <div className="w-[320px] flex-none">
              <button className="w-full h-12 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 font-bold hover:bg-slate-100 hover:border-slate-400 hover:text-slate-600 transition-all">
                + Add New Column
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
