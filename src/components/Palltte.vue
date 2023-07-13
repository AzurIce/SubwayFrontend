
<script setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue'

const colors = [
  { index: 0, color: '#84C9EF' },
  { index: 1, color: '#C7C9E0' },
  { index: 3, color: '#ABCCDD' },
  { index: 2, color: '#F4E0EA' }
]

const rotate = ref(0)
const selectedIndex = ref(0)
const selectedColor = computed(() => colors.find(color => color.index === selectedIndex.value)?.color || '')


const props=defineProps({
  backgroundColor:{
    type:String,
    required:true
  }
})
const emit = defineEmits(['changeColor'])
</script>


<template>
  <div class="tw-flex-auto" :style="`background-color:${selectedColor};transition: background-color 0.3s ease-in-out`">
    <div class="wrap tw-m-auto">
      <div :class="`tw-grid tw-grid-cols-2 tw-gap-2 tw-transition-all`" :style="`transform: rotate(${-(selectedIndex) * 90}deg);`">
        <div :class="`selector ${selectedIndex == color.index ? 'tw-ring-2' : ''}`" :style="`background-color: ${color.color};`" @click="() => { selectedIndex = color.index ;emit('changeColor',color.color)}"
          v-for="color in colors" v-bind:key="color.index"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --selected-color: #eaeaea;
}

.wrap {
  display: grid;
  place-content: center;
  height: 22%;
  width: max-content;
  transition: 0.5s ease;

  background: #fff;
  border-radius: 6px;
  padding: 16px;
  box-shadow: 0 4px 4px -6px rgba(0, 0, 0, 0.2), 0 8px 8px -6px rgba(0, 0, 0, 0.2),
    0 12px 12px 0 rgba(0, 0, 0, 0.2);
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

</style>