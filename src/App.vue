<script setup>
import { ref, onMounted } from 'vue';
import { showLoadingToast, closeToast } from 'vant';
import AllTas from './components/AllTas.vue';
import AddTask from './components/AddTask.vue';
import DeletaTask from './components/DeletaTask.vue';

// 控制显示哪个组件
const currentView = ref('allTasks'); // 'allTasks', 'addTask' 或 'deletedTasks'

// 任务列表数据
const tasks = ref([
  { id: 1, details: '完成项目报告', completed: false },
  { id: 2, details: '准备周会演示', completed: false },
  { id: 3, details: '更新客户文档', completed: false }
]);

// 已删除任务列表
const deletedTasks = ref([]);

// 加载状态
const loading = ref(false);

// 初始化数据
onMounted(() => {
  console.log('组件挂载完成，已加载任务：', tasks.value);
});

// 加载任务列表
const loadTasks = async () => {
  // 直接使用静态数据，不需要加载
  console.log('当前任务列表:', tasks.value);
};

// 加载已删除任务列表
const loadDeletedTasks = async () => {
  // 直接使用静态数据，不需要加载
  console.log('已删除任务列表:', deletedTasks.value);
};

// 切换到添加任务页面
const showAddTask = () => {
  currentView.value = 'addTask';
};

// 切换到任务列表页面
const showAllTasks = () => {
  currentView.value = 'allTasks';
};

// 切换到已删除任务页面
const showDeletedTasks = async () => {
  currentView.value = 'deletedTasks';
};

// 添加新任务
const addNewTask = async (taskDetails) => {
  loading.value = true;
  showLoadingToast({
    message: '添加中...',
    forbidClick: true,
    duration: 0,
  });
  
  try {
    // 创建新任务
    const newTask = {
      id: tasks.value.length + 1,
      details: taskDetails,
      completed: false
    };
    
    // 添加到任务列表
    tasks.value.push(newTask);
    
    // 返回任务列表页面
    currentView.value = 'allTasks';
  } catch (error) {
    console.error('添加任务失败:', error);
  } finally {
    loading.value = false;
    closeToast();
  }
};

// 删除任务
const deleteTask = async (taskId) => {
  loading.value = true;
  showLoadingToast({
    message: '删除中...',
    forbidClick: true,
    duration: 0,
  });
  
  try {
    // 从任务列表中移除
    const taskIndex = tasks.value.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const deletedTask = { ...tasks.value[taskIndex] };
      deletedTask.deleteTime = new Date().toLocaleString();
      
      // 添加到已删除任务列表
      deletedTasks.value.push(deletedTask);
      
      // 从任务列表中移除
      tasks.value.splice(taskIndex, 1);
    }
  } catch (error) {
    console.error('删除任务失败:', error);
  } finally {
    loading.value = false;
    closeToast();
  }
};
</script>

<template>
  <div class="app-container">
    <!-- 任务列表组件 -->
    <AllTas 
      v-if="currentView === 'allTasks'"
      :tasks="tasks"
      @show-add-task="showAddTask"
      @show-deleted-tasks="showDeletedTasks"
      @delete-task="deleteTask"
    />
    
    <!-- 添加任务组件 -->
    <AddTask 
      v-else-if="currentView === 'addTask'"
      @add-task="addNewTask"
      @cancel-add="showAllTasks"
    />
    
    <!-- 已删除任务组件 -->
    <DeletaTask 
      v-else-if="currentView === 'deletedTasks'"
      :deletedTasks="deletedTasks"
      @back-to-tasks="showAllTasks"
    />
  </div>
</template>

<style>
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0;
  background-color: #f7f8fa;
  overflow-x: hidden;
}
</style>