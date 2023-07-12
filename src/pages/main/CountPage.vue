<template>
  <div>
    <div class="top-section">
      <div class="top-box">区域1</div>
      <div class="top-box">区域2</div>
      <div class="top-box">区域3</div>
      <Star class="top-box"></Star>
    </div>
    <v-divider :thickness="3" class="border-opacity-75" color="info"></v-divider>
    <div class="bottom-section">
      <apexchart id="chartContainer" class="bottom-left" type="bar" :options="chartOptions" :series="series"></apexchart>
      <div class="bottom-section-right">
        <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
          <div class="bottom-right-top" style="overflow: hidden">
            <v-expansion-panels>
              <v-expansion-panel title="attention" style="backgrund-color: aliceblue">
                <v-expansion-panel-text>
                  请选择你所要查询的日期，以4个小时为单位，输入的默认格式如下为<br /> yyyy/MM/dd HH
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />
            <v-text-field label="data" style="width: 50%; margin: 0% 5% 0% 15%"
              hint="input the correct data"></v-text-field>
            <v-text-field label="station" style="width: 50%; margin: 0% 5% 0% 15%"
              hint="input the correct station"></v-text-field>
            <v-text-field label="period" style="width: 50%; margin: 0% 5% 0% 15%"
              hint="input the correct period"></v-text-field>
            <v-btn color="blue" style="margin-left: 35%">confirm</v-btn>
          </div>
        </v-parallax>

        <!-- <div class="bottom-right-bottom">区域6-下</div> -->

        <apexchart id="lineContainer" class="bottom-right-bottom" type="line" :options="chartOptions" :series="series">
        </apexchart>
      </div>
    </div>
  </div>
</template>


<script>
import ApexCharts from 'apexcharts'
// import NavigationBar from '../components/NavigationBar.vue'
import Star from '@/components/Star.vue'

export default {
  name: 'DataAnalysisDashboard',
  components: {
    // NavigationBar,
    Star
  },
  mounted() {
    const inputTime = {
      time: ''
    }
    // 模拟数据
    const data = {
      labels: ['2023.7.11.0', '2023.7.11.4', '2023.7.11.8', '2023.7.11.12', '2023.7.11.16'],
      series: [
        {
          name: 'InActual',
          data: [3500, 4200, 2800, 5200, 4800]
        },
        {
          name: 'InForecase',
          data: [1500, 3200, 1800, 3200, 2800]
        },
        {
          name: 'OutActual',
          data: [4133, 2134, 3243, 1243, 6544]
        },
        {
          name: 'OutForecase',
          data: [424, 3253, 1322, 2324, 4355]
        }
      ]
    }

    // 创建柱状图
    const options = {
      chart: {
        type: 'bar'
      },
      series: data.series,
      xaxis: {
        categories: data.labels
      }
    }

    //创建折线图
    const lineoptions = {
      chart: {
        type: 'line'
      },
      series: data.series,
      xaxis: {
        categories: data.labels
      }
    }

    const chart = new ApexCharts(document.querySelector('#chartContainer'), options)
    chart.render()

    const linechart = new ApexCharts(document.querySelector('#lineContainer'), lineoptions)
    linechart.render()
  }
}
</script> 

<style scope>
/* .container {
  display: grid;
  grid-template-rows: 22.5% 22.5% 22.5% 22.5%;
  grid-template-rows: 25% 1% 70%;
  height: 100%;
  width: 100%;
  gap: 1%;
} */

.top-section {
  display: flex;
  gap: 4%;
}

.top-box {
  flex: 1;
  border: 1px solid black;
}

.bottom-section {
  display: flex;
  gap: 4%;
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
  /* border: 1px solid black; */
  display: grid;
  grid-template-rows: 48% 48%;
  gap: 4%;
}

.bottom-right-top,
.bottom-right-bottom {
  flex: 2;
  border: 1px solid black;
}
</style>