<script setup>
import * as Highcharts from '@/plugins/highcharts-gantt.js'
import { stamp, format, dayjsObj } from '@/utils/time'

const gantt = ref({})
const WEEKS = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
}
// 官方建议用UTC的时间，鉴于业务需要，我们需要和数据库时间保持统一，得看数据库的存储格式
const data = [
  {
    start: '2021-6-1 0',
    end: '2021-6-1 2',
    factory: '华为',
    material: 'P50',
    uid: 1,
    y: 0,
    completed: 0.35,
  },
  {
    start: '2021-6-1 2',
    end: '2021-6-1 3',
    factory: '华为',
    material: 'P50',
    uid: 2,
    y: 0,
  },
  // {
  //   start: '2021-6-3 8',
  //   end: '2021-6-4 24',
  //   factory: '华为',
  //   material: 'P50',
  //   uid: 3,
  //   y: 0,
  // },
  // {
  //   start: '2021-6-4 12',
  //   end: '2021-6-5 15',
  //   factory: '华为',
  //   material: 'P50',
  //   uid: 4,
  //   y: 0,
  // },

  {
    start: '2021-6-1 0',
    end: '2021-6-1 1',
    factory: '小米',
    material: '红米3',
    uid: 5,
    y: 1,
  },
  {
    start: '2021-6-1 1',
    end: '2021-6-1 2',
    factory: '小米',
    material: '红米3',
    uid: 6,
    y: 1,
  },

  // {
  //   start: '2021-6-1 6',
  //   end: '2021-6-1 16',
  //   factory: '苹果',
  //   material: 'iPhone13',
  //   uid: 7,
  //   y: 2,
  // },
  // {
  //   start: '2021-6-2 3',
  //   end: '2021-6-2 19',
  //   factory: '苹果',
  //   material: 'iPhone13',
  //   uid: 8,
  //   y: 2,
  // },
  // {
  //   start: '2021-6-3 8',
  //   end: '2021-6-3 17',
  //   factory: '苹果',
  //   material: 'iPhone13',
  //   uid: 9,
  //   y: 2,
  // },

  // {
  //   start: '2021-6-1 12',
  //   end: '2021-6-1 24',
  //   factory: 'OPPO',
  //   material: 'Reno7',
  //   uid: 10,
  //   y: 3,
  // },
  // {
  //   start: '2021-6-2 5',
  //   end: '2021-6-2 18',
  //   factory: 'OPPO',
  //   material: 'Reno7',
  //   uid: 11,
  //   y: 3,
  // },
  // {
  //   start: '2021-6-3 1',
  //   end: '2021-6-5 12',
  //   factory: 'OPPO',
  //   material: 'Reno7',
  //   uid: 12,
  //   y: 3,
  // },
]
let newData = data.map((item) => {
  item.start = stamp(item.start)
  item.end = stamp(item.end)
  return item
})

// 全局配置，需要在图标初始化之前配置
window.Highcharts.setOptions({
  global: {
    useUTC: false, // 不使用utc时间
  },
  lang: {
    noData: '暂无数据',
    weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    months: [
      '一月',
      '儿月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
  },
  color: ['red', 'green', 'blue']
})
const dragStart = () => {}
const drag = () => {}
const drop = (e) => {
  const { newPoint = {}, target = {} } = e
  if (newPoint.y || newPoint.y === 0) {
    let list = [],
      tar = newData.find(
        (item) => item.y === newPoint.y && item.uid !== target.uid
      )
    list = newData.map((item) => {
      // 当前拖拽数据
      if (item.uid === target.uid) {
        return {
          ...item,
          factory: tar.factory,
          material: tar.material,
          ...newPoint,
        }
      } else {
        return item
      }
    })
    gantt.value.update({
      series: [
        {
          data: list,
        },
      ],
    })
  }
}
// 选中，可以弹窗，编辑一些业务数据
const handleSelect = () => {
  console.log('选中')
}
// 获取最终数据
const getData = () => {
  let data = gantt.value.series[0].data.map((item) => {
    return {
      uid: item.uid,
      factory: item.factory,
      material: item.material,
      start: item.start,
      end: item.end,
    }
  })
  console.log(data)
}

onMounted(() => {
  try {
    gantt.value = window.Highcharts.ganttChart('container', {
      // title: {
      //   text: 'hightCharts甘特图示例',
      // },
      xAxis: [
        {
          currentDateIndicator: true,
          tickPixelInterval: 70,
          grid: {
            borderWidth: 1, // 右侧表头边框宽度
            cellHeight: 35, // 右侧日期表头高度
          },
          labels: {
            align: 'center',
            formatter: function () {
              return `${format(this.value, 'M月D日:HH:mm:ss')}`
              // return `${format(this.value, 'M月D日:HH:mm:ss')}  ${ WEEKS[dayjsObj(this.value).day()] }`
            },
          },
        },
        {
          labels: {
            align: 'center',
            formatter: function () {
              return `${format(this.value, 'YYYY年M月')}`
            },
          },
        },
      ],
      // 数据横跨时间段过大，label如果写死，比如小时，hightcharts不会获取小时数据，还是天或者年的，会导致小时一直是00:00
      // 所以，拿到数据要做好判断，根据时间跨度，动态调整X轴的的 formatter，达到最好的效果

      // xAxis: [{
      //   currentDateIndicator: true,
      //   tickPixelInterval: 70,
      //   grid: {
      //     borderWidth: 1, // 右侧表头边框宽度
      //     cellHeight: 35, // 右侧日期表头高度
      //   },
      //   labels: {
      //     align: 'center',
      //     formatter: function() {
      //       return `${format(this.value, 'HH:mm')}`;
      //     }
      //   },
      // }, {
      //   labels: {
      //     align: 'center',
      //     formatter: function() {
      //       return `${format(this.value, 'YYYY年M月D')}  ${WEEKS[dayjsObj(this.value).day()]}`;
      //     }
      //   },
      // }],
      yAxis: {
        type: 'category',
        grid: {
          enabled: true,
          borderColor: 'rgba(0,0,0,0.3)',
          borderWidth: 1,
          columns: [
            {
              title: { text: '工厂' },
              labels: { format: '{point.factory}' },
            },
            {
              title: { text: '型号' },
              labels: { format: '{point.material}' },
            },
          ],
        },
      },
      tooltip: {
        formatter: function () {
          return `<div>
               工厂: ${this.point.factory}<br/>
              开始时间: ${format(this.point.start, 'YYYY-MM-DD HH:mm:ss')}<br/>
              结束时间: ${format(this.point.end, 'YYYY-MM-DD HH:mm:ss')}<br/>
              </div>`
        },
      },
      series: [{ data: newData }],
      plotOptions: {
        series: {
          animation: false, // Do not animate dependency connectors
          dragDrop: {
            draggableX: true, // 横向拖拽
            draggableY: true, // 纵向拖拽
            dragMinY: 0, // 纵向拖拽下限
            dragMaxY: 3, // 纵向拖拽上限
            dragPrecisionX: 1000, // 横向拖拽精度，单位毫秒
            // dragPrecisionX: 3600000, // 横向拖拽精度，单位毫秒
          },
          dataLabels: {
            enabled: true,
            format: '{point.factory}-{point.uid}',
            style: {
              cursor: 'default',
              pointerEvents: 'none',
            },
          },
          allowPointSelect: true,
          point: {
            events: {
              dragStart: dragStart,
              drag: drag,
              drop: drop,
              select: handleSelect,
            },
          },
        },
      },
      exporting: {
        sourceWidth: 1000,
      },
      credits: {
        // 去掉右下角版权信息
        enabled: false,
      },
    })
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="hightChart-gantt">
    <div id="container"></div>
    <button @click="getData">打印当前数据</button>
  </div>
</template>

<style lang="scss" scoped>
.hightChart-gantt {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  #container {
    max-width: 12000px;
    min-width: 800px;
    margin: 1em auto;
  }
}
</style>
