# 任务备忘录系统

一个基于 Vue 3 + Vant 开发的移动端任务管理应用，提供简洁直观的任务管理功能。

## 功能特点

- 📝 任务列表展示
- ➕ 添加新任务
- ✅ 标记任务完成/未完成
- 🗑️ 删除任务
- 📦 已删除任务记录
- 📱 移动端友好的界面设计

## 技术栈

- Vue 3 - 渐进式 JavaScript 框架
- Vant 4 - 移动端组件库
- Vite - 现代前端构建工具

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── AddTask.vue     # 添加任务组件
│   ├── AllTas.vue      # 任务列表组件
│   └── DeletaTask.vue  # 已删除任务组件
├── App.vue             # 根组件
└── main.js             # 入口文件
```

## 主要功能说明

### 1. 任务列表
- 显示所有待办任务
- 每个任务项包含：
  - 任务ID
  - 任务详情
  - 完成状态复选框
  - 删除按钮

### 2. 添加任务
- 点击右下角悬浮按钮进入添加任务页面
- 支持多行文本输入
- 提交前进行内容验证

### 3. 任务管理
- 标记任务完成/未完成
- 删除任务（带确认提示）
- 查看已删除任务记录

### 4. 界面设计
- 采用 Vant 组件库的移动端设计
- 响应式布局
- 直观的操作反馈

## 开发环境设置

1. 克隆项目
```bash
git clone https://github.com/lizhanglan/-.git
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 项目依赖

```json
{
  "dependencies": {
    "vant": "^4.9.19",
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.3",
    "unplugin-auto-import": "^19.3.0",
    "unplugin-vue-components": "^28.7.0",
    "vite": "^6.3.5"
  }
}
```

## 使用说明

1. 查看任务
   - 打开应用后自动显示任务列表
   - 任务按添加顺序排列

2. 添加任务
   - 点击右下角"+"按钮
   - 在输入框中输入任务内容
   - 点击"提交"按钮保存

3. 管理任务
   - 点击复选框标记任务完成/未完成
   - 点击删除按钮删除任务
   - 点击顶部删除图标查看已删除任务

## 注意事项

- 任务数据存储在内存中，刷新页面后会重置
- 建议定期备份重要任务信息
- 确保浏览器支持现代 JavaScript 特性

## 许可证

MIT License
