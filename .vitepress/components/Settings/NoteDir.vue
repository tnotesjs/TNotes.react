<template>
  <p>
    <label for="path">📂 笔记文件夹位置：</label>
    <input id="path" v-model="path" placeholder="请输入当前笔记文件夹所在位置" />
    <button @click="savePath">确定</button>
  </p>
</template>

<script setup>
import { ref } from 'vue'
import { NOTE_DIR_KEY } from '../constants.js'


const path = ref(localStorage.getItem(NOTE_DIR_KEY) || '')

const savePath = () => {
  localStorage.setItem(NOTE_DIR_KEY, path.value)
  alert(`\n${path.value}\n\n 笔记文件夹位置已保存!`)
};
</script>

<style scoped>
input {
  padding: 8px;
  margin-right: 10px;
  width: 15rem;
  border-bottom: 1px solid #ddd;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>
