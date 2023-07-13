<template>
  <SnackBar v-model="msg" />
  <div :style="{ backgroundColor: backgroundColor, transition: 'background-color 0.4s ease-in-out' }">

    <div class="top-section">
      <Palltte class="top-box top-box-first" @changeColor="changeColor"></Palltte>
      <div class="top-box">区域2</div>
      <div class="top-box">区域3</div>
      <Star class="top-box top-box-fourth"></Star>
    </div>
    <v-divider :thickness="3" class="border-opacity-75" color="info"></v-divider>
    <div class="bottom-section">
      <!-- <apexchart id="chartContainer" class="bottom-left" type="bar" :options="chartOptions" :series="series"></apexchart> -->
      <apexchart id="chartContainer" class="bottom-left" type="bar"></apexchart>
      <div class="bottom-section-right" style="overflow: hidden;">
        <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" :contain="true">
          <div class="bottom-right-top" style="overflow: hidden;">
            <v-expansion-panels>
              <v-expansion-panel title="注意事项" style="backgrund-color: aliceblue">
                <v-expansion-panel-text>
                  1.请输入你所要查询的日期，以4个小时为单位<br />示例值: 2017-02-04 04:00:00<br />
                  2.输入你所要查询的站点 <br />示例值 R01<br />
                  3.输入你所要查询的事件段<br />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />

            <v-row>
              <v-col cols="4">
                <v-text-field v-model="data" label="data" style="width: 100%" hint="input the correct data"
                  :rules="[() => (data != '') || '日期不可为空']"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="station" label="station" style="width: 100%" hint="input the correct station"
                  :rules="[() => (station != '') || '站点不能为空']"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="period" label="period" style="width: 100%" hint="input the correct period"
                  :rules="[() => (period != '') || '时间段不能为空']"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-center">
                <v-btn color="blue" class="mx-auto" @click="submit()">confirm</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-parallax>

        <!-- <apexchart id="lineContainer" class="bottom-right-bottom" type="line" :options="chartOptions" :series="series"> -->
        <apexchart id="lineContainer" class="bottom-right-bottom" type="line">
        </apexchart>
      </div>
    </div>
  </div>
</template>


<script>
import ApexCharts from 'apexcharts'
import Star from '@/components/Star.vue'
import Palltte from '../../components/Palltte.vue'
import SnackBar from '../../components/SnackBar.vue'

import { getData } from '../../lib/axios/count'

import { color } from 'echarts'

export default {
  name: 'DataAnalysisDashboard',
  components: {
    Star,
    Palltte,
    SnackBar
  },
  data() {
    return {
      backgroundColor: '#faebd7',
      data: '',
      station: '',
      period: '',
      msg: '',
      chartData: {
        // labels: ['2023.7.11.0', '2023.7.11.4', '2023.7.11.8', '2023.7.11.12', '2023.7.11.16'],
        labels: [],
        series: []
        // series: [
        //   {
        //     name: 'InActual',
        //     data: [3500, 4200, 2800, 5200, 4800]
        //   },
        //   {
        //     name: 'InForecast',
        //     data: [1500, 3200, 1800, 3200, 2800]
        //   },
        //   {
        //     name: 'OutActual',
        //     data: [4133, 2134, 3243, 1243, 6544]
        //   },
        //   {
        //     name: 'OutForecast',
        //     data: [424, 3253, 1322, 2324, 4355]
        //   }
        // ]
      },
      barOptions: {
        chart: {
          type: 'bar'
        },
        grid: {
          right: 0,
          bottom: 100
        },
        title: {
          text: '人流量图',
          align: 'center',
        },
        series: [],
        xaxis: {
          categories: [],
          axisLabel: {
            rotate: 60
          }
        }
      },
      lineOptions: {
        chart: {
          type: 'line'
        },
        grid: {
          right: 0,
          bottom: 100
        },
        title: {
          text: '人流量图',
          align: 'center',
        },
        series: [],
        xaxis: {
          categories: [],
          axisLabel: {
            rotate: 60
          }
        }
      }
    }
  },
  methods: {
    changeColor(color) {
      this.backgroundColor = color //点击按钮更改颜色
    },
    initChart() {
      this.barOptions.series = this.chartData.series;
      this.barOptions.xaxis.categories = this.chartData.labels;

      this.barChart = new ApexCharts(document.querySelector('#chartContainer'), this.barOptions);
      this.barChart.render();

      this.lineOptions.series = this.chartData.series;
      this.lineOptions.xaxis.categories = this.chartData.labels;
      this.linechart = new ApexCharts(document.querySelector('#lineContainer'), this.lineOptions)
      this.linechart.render();
    },
    submit() {
      console.log(this.data + "  " + this.station + "  " + this.period);
      getData(this.station).then((res) => {
        this.msg = '获取成功'
        this.barChart.updateOptions({
          xAxis: {
            data: res.map((v) => v.dateTime.replace(':00:00', '时')),
            axisLabel: {
              rotate: 60
            }
          },
          series: [
            {
              name: '出战人数',
              type: 'bar',
              data:res.map((v)=>{
                return {
                  x:v.dateTime.replace(':00:00','时'),
                  y:v.tExits
                }
              })
            },
            {
              name: '入站人数',
              type: 'bar',
              data:res.map((v)=>{
                return {
                  x:v.dateTime.replace(':00:00','时'),
                  y:v.tEntries
                }
              })
            }
          ]
        })

        this.linechart.updateOptions({
          xAxis: {
            data: res.map((v) => v.dateTime.replace(':00:00', '时')),
            axisLabel: {
              rotate: 60
            }
          },
          series: [
            {
              name: '出战人数',
              type: 'line',
              data:res.map((v)=>{
                return {
                  x:v.dateTime.replace(':00:00','时'),
                  y:v.tExits
                }
              })
            },
            {
              name: '入站人数',
              type: 'line',
              data:res.map((v)=>{
                return {
                  x:v.dateTime.replace(':00:00','时'),
                  y:v.tEntries
                }
              })
            }
          ]
        })

      }).catch((err) => {
        this.msg = `获取失败:${err}`
        console.log(err)
      }).finally(() => {

      })
    }
  },
  mounted() {
    const inputTime = {
      time: ''
    }
    this.initChart()
  }
}
</script> 

<style scope>
.container {

  display: grid;
  grid-template-columns: 20% 20% 20% 20%;
  grid-template-rows: 22% 3% 75%;
  height: 100%;
  width: 100%;
  gap: 3%;
}

.top-section {
  display: flex;
  gap: 2%;
}

.top-box {
  flex: 2;
  border: 1px solid black;
}

.top-box-first {
  border: none;
}

.top-box-fourth {
  box-shadow: 2px 8px 16px rgba(0, 0, 0, 0.4);
  height: 200px;
  width: 200px;
  transform: translateZ(16px);
  border: none
}

.bottom-section {
  display: flex;
  gap: 2%;
}

.bottom-left {
  flex: 2;
  border: 1px solid black;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 5px;
}

.bottom-section-right {
  flex: 1;
  display: grid;
  grid-template-rows: 46% 52%;
  gap: 2%;
}

/* .bottom-right-top, */
.bottom-right-bottom {
  flex: 2;
  border: 1px solid black;
}
</style>