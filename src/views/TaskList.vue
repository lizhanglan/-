<template>
  <div class="task-list-container">
    <template v-if="showAddTaskForm">
      <AddTask @add-task="handleAddTask" @cancel-add="handleCancelAdd" />
    </template>
    <template v-else>
      <AllTas 
        :tasks="tasks" 
        @show-add-task="handleShowAddTaskForm" 
        @delete-task="handleDeleteTask"
        @show-deleted-tasks="handleShowDeletedTasks"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddTask from '@/components/AddTask.vue';
import AllTas from '@/components/AllTas.vue'; // 引入AllTas组件

// 控制是否显示添加任务表单
const showAddTaskForm = ref(false); // 初始不显示添加表单，显示任务列表

// 从localStorage加载任务列表和最后使用的ID
const loadTasksFromStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  const savedNextId = localStorage.getItem('nextTaskId');
  return {
    tasks: savedTasks ? JSON.parse(savedTasks) : [],
    nextId: savedNextId ? parseInt(savedNextId) : 1
  };
};

// 保存任务到localStorage
const saveTasksToStorage = (tasks, nextId) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('nextTaskId', nextId.toString());
};

// 任务列表
const { tasks: initialTasks, nextId: initialNextId } = loadTasksFromStorage();
const tasks = ref(initialTasks);
let nextTaskId = initialNextId; // 用于生成唯一的ID

// 在组件挂载时加载任务
onMounted(() => {
  console.log('组件挂载完成，已加载保存的任务：', tasks.value);
});

// 处理添加任务事件
const handleAddTask = (taskDetails) => {
  console.log('任务详情已接收:', taskDetails);
  tasks.value.push({
    id: nextTaskId++, // 分配唯一ID
    details: taskDetails,
    completed: false
  });
  // 保存更新后的任务列表和ID
  saveTasksToStorage(tasks.value, nextTaskId);
  showAddTaskForm.value = false; // 添加后返回任务列表
  console.log('当前任务列表:', tasks.value);
};

// 处理取消添加事件
const handleCancelAdd = () => {
  showAddTaskForm.value = false; // 取消后返回任务列表
  console.log('取消添加任务');
};

// 处理显示添加任务表单的事件 (来自AllTas)
const handleShowAddTaskForm = () => {
  showAddTaskForm.value = true;
};

// 处理删除任务事件 (来自AllTas)
const handleDeleteTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
  // 保存更新后的任务列表
  saveTasksToStorage(tasks.value, nextTaskId);
  console.log(`任务 ${taskId} 已删除`);
};

// 处理查看已删除任务 (来自AllTas) - 可根据需要实现
const handleShowDeletedTasks = () => {
  console.log('请求查看已删除任务');
  // 此处可以导航到已删除任务页面或显示一个模态框
  // 目前AllTas.vue中已有此按钮，但具体逻辑未实现，这里仅作占位
};

// 初始加载一些示例任务 (可选)
// tasks.value = [
//   { id: nextTaskId++, details: '学习 Vue 3', completed: true },
//   { id: nextTaskId++, details: '编写项目文档', completed: false },
// ];

</script>

<style scoped>
.task-list-container {
  /* padding: 20px; */ /* AllTas.vue 内部已有padding，此处可移除或调整 */
  width: 100%;
  min-height: 100vh;
}

/* .task-list {
  margin-top: 20px;
}

.task-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
} */
</style>