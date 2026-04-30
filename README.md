# TaskFlow — 任务管理应用

一个基于 React + Tailwind CSS 构建的轻量级任务管理 Web 应用，数据保存在浏览器本地，无需后端服务器。

## 功能特性

- **仪表盘** — 总览任务统计、今日待办、逾期提醒、项目进度
- **项目管理** — 创建/编辑/删除项目，自定义主题颜色
- **看板视图** — 拖拽任务在三列（待办/进行中/已完成）之间移动
- **列表视图** — 表格形式查看任务，支持快速编辑和删除
- **任务管理** — 设置标题、描述、优先级、截止日期、状态
- **筛选排序** — 按优先级、截止日期、创建时间排序
- **搜索** — 全局搜索任务标题和描述
- **数据持久化** — 自动保存到浏览器 localStorage
- **数据备份** — 支持导出/导入 JSON 格式的数据备份

## 技术栈

- [React 19](https://react.dev/) — UI 框架
- [Vite](https://vitejs.dev/) — 构建工具
- [Tailwind CSS v4](https://tailwindcss.com/) — 样式
- [Lucide React](https://lucide.dev/) — 图标

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

访问 http://localhost:5173 即可使用。

## 项目结构

```
src/
├── core/                  # 核心基础设施
│   ├── constants/         # 全局常量
│   ├── store/             # 状态管理（Context + Reducer + Selectors）
│   └── utils/             # 工具函数
├── modules/               # 业务模块
│   ├── layout/            # 布局（侧边栏、顶部栏）
│   ├── dashboard/         # 仪表盘
│   ├── projectBoard/      # 项目看板/列表
│   ├── task/              # 任务弹窗
│   └── project/           # 项目弹窗
├── shared/                # 共享组件
│   └── components/        # ModalShell、ProjectSelect 等
├── App.jsx
└── main.jsx
```

## 数据存储

所有数据保存在浏览器的 `localStorage` 中，键名为 `taskflow_data_v1`。你可以通过侧边栏底部的「导出数据」按钮备份为 JSON 文件，或在更换设备时通过「导入数据」恢复。

## 浏览器兼容性

支持 Chrome、Firefox、Safari、Edge 最新两个版本。
