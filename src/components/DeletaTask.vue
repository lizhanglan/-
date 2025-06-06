<script setup>
import { defineProps, defineEmits } from 'vue';

// 定义组件接收的属性
const props = defineProps({
  deletedTasks: {
    type: Array,
    required: true
  }
});

// 定义组件可触发的事件
const emit = defineEmits(['back-to-tasks']);

// 返回任务列表
const backToTasks = () => {
  emit('back-to-tasks');
};
</script>

<template>
  <div class="deleted-task-container">
    <van-nav-bar
      title="已删除任务记录"
      left-arrow
      @click-left="backToTasks"
      fixed
    />
    
    <div class="deleted-list-container">
      <van-empty v-if="deletedTasks.length === 0" description="暂无已删除的任务记录" />
      
      <van-cell-group v-else inset>
        <van-cell 
          v-for="task in deletedTasks" 
          :key="task.id"
          :title="task.details"
        >
          <template #label>
            <div class="task-info">
              <van-tag type="primary" size="medium" class="task-id-tag">{{ task.id }}</van-tag>
              <span class="delete-time">删除时间: {{ task.deleteTime }}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
.deleted-task-container {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  font-family: 'Arial', sans-serif;
  padding-top: 46px; /* 为固定的导航栏留出空间 */
  min-height: 100vh;
  background-color: #f7f8fa;
}

.deleted-list-container {
  padding: 16px;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.task-id-tag {
  flex-shrink: 0;
}

.delete-time {
  color: #7f8c8d;
  font-size: 14px;
}

/* 覆盖Vant组件的一些样式 */
:deep(.van-cell-group--inset) {
  margin: 0;
}

:deep(.van-nav-bar__title) {
  font-size: 18px;
  font-weight: bold;
}

:deep(.van-tag--primary) {
  background-color: #e74c3c;
}

:deep(.van-cell__title) {
  word-break: break-all;
  white-space: normal;
}
</style>