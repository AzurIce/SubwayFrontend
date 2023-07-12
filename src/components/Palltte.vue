
<script setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue'

const colors = [
  { index: 0, color: '#ffe4e7' },
  { index: 1, color: '#b98efb' },
  { index: 3, color: '#6ce4d8' },
  { index: 2, color: '#f6ff85' }
]

const rotate = ref(0)
const selectedIndex = ref(0)


</script>


<template>
  <!-- <span class="tw-rotate-90">????</span> -->

  <div class="fake-body">

    <div class="wrap">
      <div :class="`tw-grid tw-grid-cols-2 tw-gap-2 tw-transition-all`" :style="`transform: rotate(${-(selectedIndex) * 90}deg);`">
        <div :class="`selector ${selectedIndex == color.index ? 'tw-ring-2' : ''}`" :style="`background-color: ${color.color};`" @click="() => { selectedIndex = color.index }"
          v-for="color in colors" v-bind:key="color.index"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --selected-color: #eaeaea;
}

fake-body {
  display: grid;
  place-content: center;
  height: 100vh;
  background-color: var(--selected-color);
  transition: 0.5s ease;
}

.wrap {
  display: grid;
  place-content: center;
  height: 100vh;
  /* background-color: var(--selected-color); */
  transition: 0.5s ease;

  background: #fff;
  border-radius: 6px;
  padding: 24px;
  box-shadow: 0 4px 4px -6px rgba(0, 0, 0, 0.1), 0 8px 8px -6px rgba(0, 0, 0, 0.1),
    0 12px 12px 0 rgba(0, 0, 0, 0.1);
}

.wrap-inner {
  display: grid;
  grid-template-columns: repeat(2, 60px);
  grid-gap: 24px;
  transform: rotate(90deg);
  transition: 0.5s ease;
}

.selector {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  cursor: pointer;
  transform: rotate(-90deg);
}

.selector::before {
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  border: 4px solid #fff;
  border-radius: 50%;
  position: absolute;
  top: 6px;
  left: 6px;
  background-color: transparent;
  content: '';
  box-sizing: border-box;
  transform: scale(0);
  transition: 0.5s ease;
}

.selector--active {
  position: relative;
}

.selector--active::before {
  transform: scale(1);
}
</style>