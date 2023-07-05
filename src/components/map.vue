<template>
    <div>
        <div id="map" ></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted, watch } from 'vue' 
import * as echarts from 'echarts';
import regions from '@/assets/china.json';
export default defineComponent({
    name:'Map',
    props:['mapData'],
    setup(props){
        watch(()=>props.mapData,(newVal:any)=>{
            while(maps.length){
                maps.pop()
            }
            maps.push(...newVal)
            initMap()
        },{deep:true})
        let maps:any = [
            {
                "value": 0,
                "name": "澳门特别行政区"
            },
            {
                "value": 0,
                "name": "西藏自治区"
            },
            {
                "value": 0,
                "name": "台湾省"
            },
            {
                "value": 0,
                "name": "新疆维吾尔自治区"
            },
            {
                "value": 0,
                "name": "天津市"
            },
            {
                "value": 0,
                "name": "黑龙江省"
            },
            {
                "value": 0,
                "name": "宁夏回族自治区"
            },
            {
                "value": 0,
                "name": "四川省"
            },
            {
                "value": 0,
                "name": "云南省"
            },
            {
                "value": 0,
                "name": "海南省"
            },
            {
                "value": 0,
                "name": "吉林省"
            },
            {
                "value": 0,
                "name": "青海省"
            },
            {
                "value": 0,
                "name": "北京市"
            },
            {
                "value": 0,
                "name": "浙江省"
            },
            {
                "value": 0,
                "name": "广西壮族自治区"
            },
            {
                "value": 0,
                "name": "江苏省"
            },
            {
                "value": 0,
                "name": "重庆市"
            },
            {
                "value": 0,
                "name": "湖南省"
            },
            {
                "value": 0,
                "name": "内蒙古自治区"
            },
            {
                "value": 0,
                "name": "贵州省"
            },
            {
                "value": 0,
                "name": "山东省"
            },
            {
                "value": 0,
                "name": "上海市"
            },
            {
                "value": 0,
                "name": "甘肃省"
            },
            {
                "value": 0,
                "name": "河北省"
            },
            {
                "value": 0,
                "name": "湖北省"
            },
            {
                "value": 0,
                "name": "江西省"
            },
            {
                "value": 0,
                "name": "安徽省"
            },
            {
                "value": 0,
                "name": "山西省"
            },
            {
                "value": 0,
                "name": "陕西省"
            },
            {
                "value": 0,
                "name": "香港特别行政区"
            },
            {
                "value": 0,
                "name": "福建省"
            },
            {
                "value": 0,
                "name": "辽宁省"
            },
            {
                "value": 0,
                "name": "河南省"
            },
            {
                "value": 0,
                "name": "广东省"
            }
            ]
        const sortBy = (field:any) => {
            return function (a:any, b:any) {
                return b[field] - a[field];
            };
        }

        function initMap(){

            let chartDom = document.getElementById('map')!;
            let myChart = echarts.init(chartDom);
            let regionsData:any = regions
            echarts.registerMap('china', regionsData); // 注册矢量地图数据

            let maxArr:any = maps.sort(sortBy('value'));//sortBy是根据value字段对对象数组进行排序
            // console.log('maxArr', maxArr);
            var option = {
                backgroundColor: '#fff', //画布背景颜色
                // tooltip: {
                //     show: true,
                //     trigger: 'item',
                //     formatter: (data:any) => {
                //         return `<h3>${data}</h3>`;
                // },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2
                },
                visualMap: {
                    min: 0,
                    max: maxArr[0].value,
                    // text: ['高', '低'],
                    realtime: false,
                    calculable: true,
                    inRange: {
                        color: ['#F3FBF4', '#00B42A'],
                    },
                    textStyle: {
                        color: '#333',
                    },
                    left: 20,
                    bottom: 10,
                },
                // geo: {
                //     show: true,
                //     map: 'china',
                //     roam: true,
                //     zoom: 1.2,
                //   viewControl: {
                //     rotateSensitivity: 0, //禁止旋转地图
                //     //下面的四个参数 可以实现禁止缩放地图
                //     projection: 'orthographic',
                //     orthographicSize: 110,
                //     maxOrthographicSize: 110,
                //     minOrthographicSize: 110,
                //   },
                //   label: {
                //     normal: {
                //       show: false,
                //       textStyle: {
                //         color: 'rgba(0,0,0,0.4)',
                //       },
                //     },
                //   },
                //   itemStyle: {
                //     normal: {
                //       borderColor: '#999',
                //       shadowColor: '#f90',
                //     },
                //     emphasis: {
                //       show: true,
                //       areaColor: '#f90',
                //       label: {
                //         show: true,
                //       },
                //       shadowOffsetX: 0,
                //       shadowOffsetY: 0,
                //       shadowBlur: 20,
                //       borderWidth: 0,
                //       shadowColor: 'rgba(0, 0, 0, 0.5)',
                //     },
                //   },
                // },

                series: [
                    {
                        name: '浏览量',
                        type: 'map',
                        map: 'china',
                        emphasis:{
                            label:{
                                show:true
                            }
                        },
                        roam: true,
                        zoom: 1.2, 
                        label: {
                        //     normal: {
                        //         formatter: '{b}\r\n{c}',
                        //         position: 'right',
                        //         show: false,
                        //     },
                        //     emphasis: {
                        //         show: true
                        //     },
                        },
                        data: maxArr,
                    },
                ],
            };
            option&&myChart.setOption(option);
        }
        // });
        onMounted(()=>{
            initMap()
        })

        return{

        }
    }
})
</script>
<style lang="scss" scoped>
#map{
    width: 890px;
    height: 500px;
    color: #7BE188;
}
</style>