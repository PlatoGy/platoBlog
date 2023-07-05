<template>
    <div class="pages">
        <img class="pre" src="@/assets/images/arrow-left-filling.png" alt="" @click="toLastPage">
        <div class="curr">
            <div class="page-item page-last" v-if="currPage!=1" @click="toLastPage">{{ currPage-1 }}</div>
            <div class="page-item page-curr">{{ currPage }}</div>
            <div class="page-item page-next" v-if="currPage!=totalPage" @click="toNextPage">{{ currPage+1 }}</div>
        </div>
        <img class="next" src="@/assets/images/arrow-right-filling.png" alt="" @click="toNextPage">
    </div>

</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted,watch } from 'vue' 
export default defineComponent({
    name:'Pages',
    props:['curr','totalPageNum'],
    emits:['toNextPage','toLastPage'],
    setup(props,ctx){
        let currPage = ref(props.curr)
        let totalPage = ref(props.totalPageNum)
        const toLastPage = ():void => {
            if(currPage.value>1){
                currPage.value--
                ctx.emit('toLastPage',currPage)
            }
        }
        const toNextPage = ():void => {
            if(currPage.value<totalPage.value){
                currPage.value++
                ctx.emit('toNextPage',currPage)
            }
        }
        watch(
            ()=>props.totalPageNum,
            (newVal) => {
                totalPage.value = newVal
            }
        )
            

        return {
            currPage,
            totalPage,
            toLastPage,
            toNextPage
        }
    }
})
</script>
<style lang="scss" scoped>
.pages{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    margin-bottom: 20px;
    .pre{
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
    .curr{
        display: flex;
        font-size: 16px;
        font-weight: 700;
        height: 40px;
        align-items: center;
        .page-item{
            width: 60px;
            margin: 0 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            transform: skew(-16deg);
            transition: all .2s ease;
            border-radius: 6px;
            cursor: pointer;
        } 
        .page-last,.page-next{
            height: 30px;
            background-color: rgb(252,117,62,.5);
            &:hover{
                height: 100%;
            }
        }
        .page-curr{
            height: 100%;
            background-color: #FC753E;
        }
    }
    .next{
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
}
</style>