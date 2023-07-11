<script setup>
import { computed, onUpdated, ref } from 'vue';
import station_details from '../data/station_details.json'
import { getData } from '../lib/axios/data'

import * as echarts from 'echarts'


const props = defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const selected = computed(() => (props.modelValue != ''))
const station = computed(() => station_details[props.modelValue] || {})

function updateData() {
  getData(props.modelValue).then((res) => {
    // console.log(res)
    if (myChart) {
      myChart.dispose()
    }
    myChart = echarts.init(chart.value);
    // 绘制图表
    myChart.setOption({
      title: {
        text: '人流量图'
      },
      tooltip: {},
      xAxis: {
        data: res.map((v) => v.dateTime)
      },
      yAxis: {},
      series: [
        {
          name: '出站人数',
          type: 'line',
          data: res.map((v) => v.tExits)
        },
        {
          name: '入站人数',
          type: 'line',
          data: res.map((v) => v.tEntries)
        }
      ]
    })
  })
}

let myChart = null
const chart = ref(null)
// onMounted(() => {
//   console.log('onMounted')
//   updateData()
// })
onUpdated(() => {
  console.log('onUpdated')
  if (selected.value) {
    console.log("select"+selected.value)
    updateData()
  }
  console.log('更新结束')
})

</script>

<template>
  <div v-if="selected" class="tw-flex tw-flex-col">
    <div class="tw-flex">
      <v-btn icon="mdi-arrow-left-thin" @click="() => { $emit('update:modelValue', '') }" />
      {{ props.modelValue }}
      {{ station.name }}
      {{ station.longitude }}
      {{ station.latitude }}
    </div>
    <div ref="chart" style="width: 500px;" class="tw-h-80 tw-w-80"/>
  </div>
</template>