<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { showDialog, showToast, showLoadingToast, closeToast } from 'vant';

// 定义组件接收的属性
const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
});

// 加载状态
const loading = ref(false);

// 定义组件可触发的事件
const emit = defineEmits(['delete-task', 'show-add-task', 'show-deleted-tasks']);

// 删除任务
const deleteTask = (taskId) => {
  // 使用Vant的Dialog组件替代原生confirm
  showDialog({
    title: '确认删除',
    message: '确定要删除此任务吗？',
    confirmButtonText: '删除',
    confirmButtonColor: '#ee0a24',
    showCancelButton: true,
  }).then(() => {
    emit('delete-task', taskId);
    showToast({
      type: 'success',
      message: '删除成功',
      position: 'bottom',
    });
  }).catch(() => {
    // 用户取消删除操作
  });
};

// 标记任务完成
const markComplete = async (taskId) => {
  loading.value = true;
  showLoadingToast({
    message: '更新中...',
    forbidClick: true,
    duration: 0,
  });
  
  try {
    const task = props.tasks.find(t => t.id === taskId);
    if (task) {
      // 直接更新任务状态
      task.completed = !task.completed;
      showToast({
        type: 'success',
        message: task.completed ? '任务已完成' : '已取消完成状态',
        position: 'bottom',
      });
    }
  } catch (error) {
    console.error('更新任务状态失败:', error);
    showToast({
      type: 'fail',
      message: '更新任务状态失败',
      position: 'bottom',
    });
  } finally {
    loading.value = false;
    closeToast();
  }
};

// 添加任务 - 触发跳转到添加任务页面
const addTask = () => {
  emit('show-add-task');
};

// 查看已删除任务
const viewDeletedTasks = () => {
  emit('show-deleted-tasks');
};
</script>

<template>
  <div class="task-memo-container">
    <van-nav-bar
      title="任务备忘录系统"
      fixed
    >
      <template #right>
        <van-icon name="delete-o" size="18" @click="viewDeletedTasks" />
      </template>
    </van-nav-bar>
    
    <div class="task-list-container">
      <van-empty v-if="tasks.length === 0" description="暂无任务" />
      
      <van-cell-group v-else inset>
        <van-cell 
          v-for="task in tasks" 
          :key="task.id"
          :class="{ 'completed-cell': task.completed }"
        >
          <template #title>
            <div class="task-title">
              <span class="task-id">{{ task.id }}</span>
              <span :class="{ 'completed-text': task.completed }">{{ task.details }}</span>
            </div>
          </template>
          <template #right-icon>
            <div class="task-actions">
              <van-checkbox 
                :model-value="task.completed" 
                @click="markComplete(task.id)"
                shape="square"
              />
              <van-button 
                type="danger" 
                size="small"
                icon="delete-o"
                @click="deleteTask(task.id)"
                class="delete-btn"
              />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    
    <van-floating-bubble 
      icon="plus" 
      @click="addTask" 
      axis="xy" 
      magnetic="x"
    />
  </div>
</template>

<style scoped>
.task-memo-container {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  font-family: 'Arial', sans-serif;
  padding-top: 46px; /* 为固定的导航栏留出空间 */
  min-height: 100vh;
  background-color: #f7f8fa;
}

.task-list-container {
  padding: 16px;
}

.task-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-id {
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.completed-text {
  text-decoration: line-through;
  color: #7f8c8d;
}

.completed-cell {
  background-color: #f9f9f9;
}

.task-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.delete-btn {
  padding: 0 8px;
  height: 28px;
}

/* 覆盖Vant组件的一些样式 */
:deep(.van-cell-group--inset) {
  margin: 0;
}

:deep(.van-nav-bar__title) {
  font-size: 18px;
  font-weight: bold;
}

:deep(.van-floating-bubble) {
  --van-floating-bubble-size: 56px;
  --van-floating-bubble-background: #3498db;
  --van-floating-bubble-icon-color: #fff;
}

:deep(.van-button--danger) {
  --van-button-danger-background: #ee0a24;
  --van-button-danger-border-color: #ee0a24;
}
</style>