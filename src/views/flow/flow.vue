<template>
    <div class="layout">
        <div class="welcome">欢迎你，来自 <strong> {{ loc.nation+loc.province+loc.city }} </strong> 的同学！</div>
        <div class="today charts">
            <h2>近日数据</h2>
            <div class="today-data">
                <span>今日 <strong>{{ today }}</strong> 访问量</span>
                <span>|</span>
                <span>昨日 <strong>{{ yesterday }}</strong> 访问量</span>
            </div>
        </div>
        <div class="seven-days charts">
            <h2>最近7天访问量</h2>
            <Line :lineData="lineData"></Line>
        </div>
        <div class="areas charts">
            <h2>地区访问量</h2>
            <Map :mapData="mapData"></Map>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue' 
import line from '@/components/line.vue'
import map from '@/components/map.vue'
import { getDetails,getList,getSortInfo,getVisitorInfo,getIp,getFlow } from '@/api/index'
import { userInfoStore } from '@/store/user'
export default defineComponent({
    name:'Flow',
    components:{
        Line:line,
        Map:map
    },
    setup () {
        //导入userInfoStore
        const userStore:any = userInfoStore()
        let loc:any = reactive({ nation:'未知区域',province:'',city:''})
        let today = ref(0)
        let yesterday = ref(0)
        let lineData:any = reactive([])
        let mapData:any = reactive([])
        const getInfo:any = () => {
            //在组件中获取，可以选择在首页载入前获取该参数
           //获取IP
           if(localStorage.getItem('Ip')){
            let Ip:any = localStorage.getItem('Ip')
                getFlow(Ip)
                    .then((res:any)=>{
                        console.log(res);
                        today.value = res.data.today[0]
                        yesterday.value = res.data.today[1]
                        loc.nation = res.data.loc.nation
                        loc.province = res.data.loc.province
                        loc.city = res.data.loc.city
                        Object.assign(lineData,res.data.sevenDays)
                        Object.assign(mapData,res.data.map)
                    })
                    .catch((err:any)=>{

                    })
           }else{
                getIp()
                    .then((data:any) => {
                    var Ip:any = data
                    localStorage.setItem('Ip', Ip)
                    console.log(localStorage.getItem('Ip'))

                    // userStore.user.ip = window.location.host.split(":")[0]
                    // console.log(userStore.user.ip);
                    
                    getFlow(Ip)
                        .then((res:any)=>{
                            console.log(res);
                            // userStore.user.location = res.data.location
                            // userStore.user.weather = res.data.weather
                        })
                        .catch((err:any)=>{

                        })
                    })
                    .catch((err:any)=>{
                        console.log(err);
                        
                    })

           }
           
        }
        onMounted(()=>{
            getInfo()                
        })
        return{

            loc,
            today,
            yesterday,
            lineData,
            mapData
        }
    }

})
</script>
<style lang="scss" scoped>
.layout{
    min-height: 500px;
    width: 900px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
    position: relative;
    z-index: 9;
    padding: 0 20px;
    .welcome{
        font-size: 15px;
        align-self: flex-end;
        color: #C396ED;
        strong{
            color: #551DB0;
            font-size: 17px;
        }
    }
    .charts{
        display: flex;
        flex-direction: column;
        margin:10px 0;  
        h2{
            width: 100%;
            height: 40px;
            margin: 30px 0;  
            font-size: 20px;
            font-weight: 700;
            position: relative;
            padding-left: 50px;
            line-height: 40px;
            &::before{
                display: block;
                content: "";
                position: absolute;
                width: 20px;
                height: 40px;
                left: 20px;
                // background-image: linear-gradient(180deg,rgba(1,124,175,.2),#C396ED);
                transform: skew(-16deg);
            }

        }
    }
    .today{
        color: #C396ED;
        h2{
            &::before{
                background-image: linear-gradient(180deg,rgba(1,124,175,.2),#C396ED);
            }
        }
        .today-data{
            align-self: center;
            span{
                font-size: 16px;

                strong{
                    font-size: 24px;
                    color: #551DB0;
                }
                &:nth-child(2){
                    display: inline-block;
                    margin: 0 40px;
                    font-size: 20px;

                }
            }
        }
    }
    .seven-days{
        color: #FFCF8B;
        h2{
            &::before{
                background-image: linear-gradient(180deg,rgba(1,124,175,.2),#FFCF8B);
            }
        }

    }
    .areas{
        color: #7BE188;
        h2{
            &::before{
                background-image: linear-gradient(180deg,rgba(1,124,175,.2),#7BE188);
            }
        }
    }
}
</style>