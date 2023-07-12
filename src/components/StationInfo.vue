<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import station_details from '../data/station_details.json'
import { getData } from '../lib/axios/data'

import * as echarts from 'echarts'


const props = defineProps(['modelValue'])
defineEmits(['update:modelValue'])

// const selected = computed(() => (props.modelValue != ''))
const station = computed(() => station_details[props.modelValue] || {})

// const loading = ref(false)
let mounted = false;
function updateData() {
  if (myChart) {
    myChart.dispose()
  }
  console.log(chart.value)
  myChart = echarts.init(chart.value);
  
  myChart.showLoading();
  // loading.value = true
  getData(props.modelValue).then((res) => {
    // console.log(res)
    myChart.hideLoading();
    // loading.value = false
    // 绘制图表
    myChart.setOption({
      grid: {
        right: 0,
        bottom: 100
      },
      title: {
        text: '人流量图'
      },
      tooltip: {},
      xAxis: {
        data: res.map((v) => v.dateTime.replace(':00:00', '时')),
        axisLabel: {
          rotate: 60
        }
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
watch(() => props.modelValue, (newValue) => {
  console.log('newValue: ', newValue)
  if (newValue && mounted) {
    console.log('updateData')
    updateData()
  }
})

onMounted(() => {
  mounted = true
  updateData()
})

</script>

<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-flex-1 tw-overflow-y-auto tw-overflow-x-hidden">
    <div class="tw-flex tw-items-center tw-w-full tw-sticky tw-top-0 tw-bg-white tw-z-20 tw-pb-2">
      <v-btn icon="mdi-arrow-left-thin" @click="() => { $emit('update:modelValue', '') }" size="small" />
      <span class="tw-ml-4">{{ station.name }}</span>
      <v-chip class="tw-ml-4">{{ props.modelValue }}</v-chip>
    </div>
    <span class="tw-mt-2 tw-mb-2">Longitude: {{ station.longitude }}, Latitude: {{ station.latitude }}</span>
    <!-- <v-progress-circular color="white" indeterminate size="64" v-if="loading">🫠</v-progress-circular> -->
    <div ref="chart" class="tw-w-full tw-mb-5" style="height: 400px;" />
  </div>
</template>