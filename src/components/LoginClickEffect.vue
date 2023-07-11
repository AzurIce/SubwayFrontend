<template>
    <div>
      <div ref="clickContainer">
        <div
          v-for="effect in effects"
          :key="effect.id"
          class="click-effect"
          :style="{ left: effect.x, top: effect.y, backgroundColor: effect.color }"
        ></div>
      </div>
    </div>
  </template>
    
    <script setup>
  import { ref, onMounted } from 'vue'
  
  const clickContainer = ref(null)
  const effects = ref([])
  
  // 随机点击颜色
  onMounted(() => {
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  
    const handleClick = (event) => {
      const x = event.clientX - 20 + 'px'
      const y = event.clientY - 20 + 'px'
      const color = getRandomColor()
      const effect = { id: Date.now(), x, y, color }
  
      effects.value.push(effect)
  
      setTimeout(() => {
        effects.value.splice(effects.value.indexOf(effect), 1)
      }, 1000)
    }
  
    document.addEventListener('click', handleClick)
  })
  </script>
    
    <style scoped>
  #clickContainer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  
  .click-effect {
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    pointer-events: none;
    animation: click-animation 1s ease-out;
  }
  
  @keyframes click-animation {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.4;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  </style>