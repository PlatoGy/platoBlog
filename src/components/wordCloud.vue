<template>
    <div>
        <div id="wordCloud"></div>
    </div>

</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted,nextTick,watch } from 'vue' 
import * as echarts from 'echarts';
import 'echarts-wordcloud';
export default defineComponent({
    name:'WordCloud',
    props:{
        words:Array
    },
    emits:['choose'],
    setup(props,ctx) {
        watch(
            () => props.words,
            (newval:any)=>{
                const words =  [...newval as Array<any>]
                for(let i=0;i<words.length;i++){
                    words[i].value = words[i].count
                }
                initWordCloud(words)

            },
            {
                deep:true
            }
        )
        function initWordCloud(words:Array<any>){
            nextTick(()=>{
                const box = document.querySelector('#wordCloud')
                var chart = echarts.init(box as HTMLElement);
                const option = {
                    series: [{
                        type: 'wordCloud',
                        shape: 'circle',
                        keepAspect: false,
                        left: 'center',
                        top: 'center',
                        width: '100%',
                        height: '100%',
                        right: null,
                        bottom: null,
                        sizeRange: [12, 60],
                        rotationRange: [-90, 90],
                        rotationStep: 45,
                        gridSize: 8,
                        drawOutOfBound: false,
                        shrinkToFit: false,

                        // If perform layout animation.
                        // NOTE disable it will lead to UI blocking when there is lots of words.
                        layoutAnimation: true,

                        // Global text style
                        textStyle: {
                            fontFamily: 'sans-serif',
                            fontWeight: 'bold',
                            // Color can be a callback function or a color string
                            color: function () {
                                // Random color
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            focus: 'self',

                            textStyle: {
                                textShadowBlur: 10,
                                textShadowColor: '#333'
                            }
                        },

                        // Data is an array. Each array item must have name and value property.
                        data: words
                    }]
                }
                chart.on('click',chooseLabel)
                chart.setOption(option)
            })
        }
        function chooseLabel(param:any){
            ctx.emit('choose', param.data);
        }
        onMounted(()=>{
            if(props.words&&props.words.length){
                const words =  [...props.words as Array<any>]
                for(let i=0;i<words.length;i++){
                    words[i].value = words[i].count
                }
                initWordCloud(words)
            }
        })
    },
})
</script>
<style lang="scss" scoped>
#wordCloud{
    width: 300px;
    height: 800px;
}
</style>