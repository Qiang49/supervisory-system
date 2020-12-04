<template>
  <div id="main" style="width:600px;height:250px">
    <!-- <h2>柱状图</h2> -->
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'Histogram',
    data() {
      return {

      }
    },
    mounted() {
      var myChart = echarts.init(document.getElementById('main'));
      var option = {
        title: {
          text: '最近一周各类销售图',
          left: "center",
          // top: "center",
        },
        color: ['dodgerblue', 'goldenrod', 'brown'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          // 是否显示刻度标签 如果是true 就显示 否则反之
          containLabel: true
        },
        legend: {
          top: '10%'
        },
        tooltip: {},
        dataset: {
          source: [
            ['product', '家电', '百货', '食品'],
            ['周一', 234, 164, 144],
            ['周二', 278, 178, 198],
            ['周三', 270, 190, 150],
            ['周四', 190, 135, 235],
            ['周五', 230, 160, 120],
          ]
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#ccc',
            fontStyle: 'oblique',
            rotate: 45
          },
          // 显示坐标的样式
          axisLine: {
            show: true,
            lineStyle: {
              shadowOffsetX: 10
            }
          },
          // 显示x轴网格
          splitLine: {
            show: true
          },
        },
        yAxis: {
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
              shadowOffsetY: -10,
            }
          },
        },
        series: [{
            type: 'bar',
            barGap: 0,
            label: {
              show: true,
              position: 'top',
              distance: 0,
              fontSize: 10
            },
          },
          {
            type: 'bar',
            barGap: 0,
            label: {
              show: true,
              position: 'top',
              distance: 0,
              fontSize: 10
            },
          },
          {
            type: 'bar',
            barGap: 0,
            label: {
              show: true,
              position: 'top',
              distance: 0,
              fontSize: 10
            },
          }
        ]
      };
      myChart.setOption(option)
    }
  }
</script>

<style scoped>


</style>