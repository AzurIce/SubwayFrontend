<!-- 用来实现偏移 -->
<template> 
    <div>
      <div style="height: 500px;"></div>
      <div style="height: 500px;"></div>
      <div style="height: 500px;"></div>
      <h1 :style="{ transform: 'translateX(' + transformValue + 'px)', textAlign: 'center' }">在中间</h1>
      <div style="height: 500px;"></div>
      <div style="height: 500px;"></div>
      <div style="height: 500px;"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const transformValue = ref(0);
  
  const handleScroll = () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    transformValue.value = scrollPosition * 2; // 可根据需要调整偏移量
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>