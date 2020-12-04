<template>
  <div id="mainline" style="width:600px;height:250px">
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'LineChart',
    data() {
      return {

      }
    },
    mounted() {
      var myChart = echarts.init(document.getElementById('mainline'));
      var option = {
        title: {
          text: '最近几个月各品类销售趋势图',
          left: "center",
        },
        color: ['dodgerblue', 'goldenrod', 'brown'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['家电', '百货', '食品'],
          top: '10%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisTick: {
            show: false
          },
          // 是否显示x轴样式
          axisLine: {
            show: true,
            lineStyle: {
              shadowOffsetX: 10
            }
          },
          splitLine: {
            show: true
          },
          data: ['6月', '7月', '8月', '9月', '10月']
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          interval: 60,
          min: 0,
          max: 300,
          axisLabel: {
            showMinLabel: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              shadowOffsetY: -10
            }
          },
        },
        series: [{
            name: '家电',
            type: 'line',
            label: {
              show: true,
              position: 'top',
              distance: 0,
              fontSize: 10
            },
            data: [234, 278, 279, 190, 238]
          },
          {
            name: '百货',
            type: 'line',
            label: {
              show: true,
              position: 'top',
              distance: 0,
              fontSize: 10
            },
            data: [164, 178, 150, 135, 160]
          },
          {
            name: '食品',
            type: 'line',
            label: {
              show: true,
              position: 'top',
              distance: 0,
              fontSize: 10
            },
            data: [74, 118, 200, 235, 90]
          }
        ]
      };
      myChart.setOption(option)
    }
  }
</script>

<style scoped>
</style>