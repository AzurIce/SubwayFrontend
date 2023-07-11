<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

import { getData } from '../lib/axios/data'

const chart = ref(null)

let myChart = null
onMounted(async () => {
  if (!myChart) {
    myChart = echarts.init(chart.value);
  }

  let res = await getData('R01')
  console.log(res)

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
</script>

<template>
  <div ref="chart" class="tw-h-80 tw-w-80" />
</template>