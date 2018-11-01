$(function(){
  var myChart = echarts.init(document.querySelector(".echarts_left"));
  option = {
    title: {
      text: '2017年注册人数'
  },
  tooltip: {},
  legend: {
    data:['人数','销量']
},
color:['#BFEFFF','#EE6363'],
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
        type: 'value'
    },
    series: [
      {
      name:"人数",
        data: [500, 202, 360, 1000, 800, 600],
        type: 'bar'
    },
    {
      name:"销量",
      data: [1500, 1202, 1360, 600, 400, 700],
      type: 'bar'
    }
  ]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);


        var myChart = echarts.init(document.querySelector(".echarts_right"));
        option2 = {
          title : {
              text: '热门品牌销售',
              subtext: '2017年6月',
              x:'center',
              textStyle:{
                color:"red",
                fontSize:24
              },
          },
        color:['#FFD700','#FFC0CB','#FA8072','#C6E2FF','#7CCD7C'],
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['耐克','阿迪','新百伦','阿迪王','李宁']
          },
          series : [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:335, name:'耐克'},
                      {value:310, name:'阿迪'},
                      {value:234, name:'新百伦'},
                      {value:135, name:'阿迪王'},
                      {value:1548, name:'李宁'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      };
      myChart.setOption(option2);
})