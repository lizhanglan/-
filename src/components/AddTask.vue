<script setup>
import { ref, defineEmits } from 'vue';
import { showToast } from 'vant';

// 定义组件可触发的事件
const emit = defineEmits(['add-task', 'cancel-add']);

// 任务详情
const taskDetails = ref('');

// 提交表单
const submitTask = () => {
  if (taskDetails.value.trim() === '') {
    showToast('请输入任务内容');
    return;
  }
  
  // 触发添加任务事件，并传递任务详情
  emit('add-task', taskDetails.value);
  
  // 清空输入
  taskDetails.value = '';
  
  // 显示成功提示
  showToast({
    type: 'success',
    message: '任务添加成功',
    position: 'bottom',
  });
};

// 取消添加
const cancelAdd = () => {
  emit('cancel-add');
};
</script>

<template>
  <div class="add-task-container">
    <van-nav-bar
      title="添加新任务"
      left-arrow
      @click-left="cancelAdd"
      fixed
    />
    
    <div class="form-container">
      <van-cell-group inset>
        <van-field
          v-model="taskDetails"
          rows="4"
          autosize
          type="textarea"
          label="任务详情"
          placeholder="请输入任务详情..."
        />
      </van-cell-group>
      
      <div class="button-group">
        <van-button type="primary" block @click="submitTask">提交</van-button>
        <van-button type="default" block @click="cancelAdd">取消</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-task-container {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  font-family: 'Arial', sans-serif;
  padding-top: 46px; /* 为固定的导航栏留出空间 */
}

.form-container {
  background-color: white;
  padding: 16px;
  width: 100%;
  margin: 0 auto;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  padding: 0 16px;
}

/* 覆盖Vant组件的一些样式 */
:deep(.van-field__label) {
  color: #2c3e50;
  font-weight: bold;
}

:deep(.van-button) {
  height: 44px;
  font-size: 16px;
}

:deep(.van-cell-group--inset) {
  margin: 16px 16px 0;
}

:deep(.van-nav-bar__title) {
  font-size: 18px;
  font-weight: bold;
}
</style>