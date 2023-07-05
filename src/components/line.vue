<template>
    <div>
    <div id="line"> </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted,watch,nextTick } from 'vue' 
import * as echarts from 'echarts';



export default defineComponent({
    name:'Line',
    props:['lineData'],
    setup(props){
        let dataList:any = []
        watch(()=>props.lineData,(newVal:any)=>{
            while(dataList.length){
                dataList.pop()
            }
            dataList.push(...newVal)
            initLine()
        },
        {
            deep:true
        })
        // let dataList = [
        //     {date: '08/01', value: 16},
        //     {date: '08/02', value: 56},
        //     {date: '08/03', value: 46},
        //     {date: '08/04', value: 11},
        //     {date: '08/05', value: 116},
        //     {date: '08/06', value: 146},
        //     {date: '08/07', value: 116},
        // ]
        var xKeys = dataList.map((item:any) => item.date);
        var values = dataList.map((item:any) => item.value);
        function initLine(){
            xKeys = dataList.map((item:any) => item.date);
            values = dataList.map((item:any) => item.value);
            nextTick(() =>{
            type EChartsOption = echarts.EChartsOption;
            var chartDom = document.getElementById('line')!;
            var myChart = echarts.init(chartDom);
            var option: EChartsOption;

            option = {
                // color:['#FFF7E8','#FFE4BA','#FFCF8B','#FFB65D','#FF9A2E'],
            xAxis: {
                type: 'category',
                data: xKeys,
                boundaryGap: false,//设置x轴两边的留白
                axisTick:{ //x轴刻度尺
                    show:false
                },
                axisLine: {//x轴线条颜色
                    lineStyle: {
                        color: '#FF7D00'
                    }
                },
                splitLine:{
                    show:true
                }

            },
            yAxis: {
                type: 'value',
                axisLine: {//x轴线条颜色
                    lineStyle: {
                        color: '#FF7D00'
                    }
                },

            },
            grid:{//设置图表四周留白间距
                top:'2%',
                right:'2%',
                bottom:'4%',
                left:'4%'
            },
            series: [
                {
                data: values,
                type: 'line',
                smooth:true,
                itemStyle:{
                    color:'#FF7D00'
                },
                lineStyle:{
                    color:'#FF7D00'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0,1,0,0,[
                        {
                            offset:0.4,
                            color:"#FFF7E8"
                        },
                        {
                            offset:1,
                            color:"#FF9A2E"
                        },
                    ])
                }
                }
            ]
            };

            option && myChart.setOption(option);
        })
        }
        onMounted(()=>{
            initLine()
        })
        
    }
})
</script>
<style lang="scss" scoped>
#line{
    width: 890px;
    height: 490px;
}
</style>