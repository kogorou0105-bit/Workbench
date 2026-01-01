import { config } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    // 这里是你的自定义规则区域
    // 如果你有什么想覆盖 monorepo 统一规则的，写在这里
    languageOptions: {
      parserOptions: {
        // 修改这里：把 project 变成一个数组，包含所有相关的 tsconfig
        // 这里的 tsconfig.node.json 专门负责管理 vite.config.ts 等配置文件
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // 例如：关掉 console 报错
      // "no-console": "off",
    },
    ignores: ["dist/**"], // 忽略打包目录
  },
];
