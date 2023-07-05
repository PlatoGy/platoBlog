<template>
  <div class="wrapper">
    <header>
        <div class="navigation">
            <ul>
                <router-link to="/">首页</router-link>
                <router-link to="flow">流量统计</router-link>
            </ul>
            <input type="text" v-model="search" @input="searchArticle" v-if="route.path=='/'">
        </div>
        <div class="header-title">
            <img src="@/assets/images/golden-title.png" alt="">
        </div>
    </header>
    <section class="main-area">
      <router-view v-slot="{ Component }">
        <component ref="routerViewRef" :is="Component" />
      </router-view>
    </section>
    <footer>
        <div class="front">
            <div class="footer-main">
            <div class="footer-main-blocks">
                <div class="footer-main-block">
                    <img src="@/assets/images/addWechat.jpg" alt="">
                </div>
                <div class="footer-main-block">
                    <p class="footer-title">友情链接</p>
                    <a>空位待补</a>
                    <a>空位待补</a>
                    <a>查看更多&申请</a>
                </div>
                <div class="footer-main-block">
                    <p class="footer-title">联系作者</p>
                    <a><img src="@/assets/images/QQIcon.png" alt=""/>1031905920</a>
                    <a><img src="@/assets/images/wechatIcon.png" alt=""/>Plato</a>
                    <a><img src="@/assets/images/githubIcon.png" alt=""/>Plato</a>
                </div>
                <div class="footer-main-block">唯一的梦想是出人头地。</div>
            </div>
            <!-- <div class="file-number">粤ICP备20003149号 | Copyright © 2020 - 2023 - www.platoblog.cn | By Plato</div> -->
        </div>
        </div>
    </footer>
    <div class="small-tools">
        <div class="weather">
            <Weather></Weather>
        </div>
        <div class="up-to-top" @click="moveUp">
            <img src="@/assets/images/up-to-top.png" alt="">
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted,onBeforeUnmount, inject } from 'vue' 
import { useRouter,useRoute } from 'vue-router'
import Weather from '@/views/index/components/weather.vue'
import { searchStore } from '@/store/search'
import { userInfoStore } from '@/store/user'
import { getDetails,getList,getSortInfo,getVisitorInfo,getIp } from '@/api/index'

//引入路由
const route:any = useRoute()
const routerViewRef:any = ref()
//导入userInfoStore
const userStore = userInfoStore() 
//根据滚动条位置控制nav-fixed
const handleScroll = () :void => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    let offsetTop = (document.querySelector('.main-area') as HTMLElement).offsetTop // 获取所需元素到文档顶部的距离，然后判断滚动条位置让该元素是否固定定位
    let upToTop = document.querySelector(".up-to-top") as HTMLElement
    let navigation = document.querySelector(".navigation") as HTMLElement
    if (scrollTop > offsetTop) {
            upToTop.classList.add("show-tool");
            navigation.classList.add("fixed");
    }else{
        upToTop.classList.remove("show-tool");
        navigation.classList.remove("fixed");
    }

}
        //获取用户ip信息等
        const getUserInfo:any = () => {
            //在组件中获取，可以选择在首页载入前获取该参数
           //获取IP
            getIp()
                .then((data:any) => {
                var Ip:any = data
                // userStore.user.ip = window.location.host.split(":")[0]
                // console.log(userStore.user.ip);
                if((!userStore.user.ip)||(Ip != userStore.user.ip)){
                    localStorage.setItem('Ip', Ip)
                    getVisitorInfo(Ip)
                    .then((res:any)=>{
                        userStore.user.ip = Ip.trim()
                        userStore.user.location = res.data.location
                        userStore.user.weather = res.data.weather
                    })
                    .catch((err:any)=>{

                    })
                }
                })
                .catch((err:any)=>{
                    console.log(err);
                    
                })

        }

onMounted(()=>{ 
    getUserInfo()                
    window.addEventListener('scroll', handleScroll, true);
})
onBeforeUnmount(()=>{
    window.removeEventListener('scroll', handleScroll)
})
const moveUp = () :void => {
    let currentPosition :number ,timer :any;
    var speed=10;
    timer = setInterval(function(){
        currentPosition=document.documentElement.scrollTop || document.body.scrollTop;
        currentPosition-=speed; //speed变量
        if(currentPosition>0){
            window.scrollTo(0,currentPosition);
        }else{
            window.scrollTo(0,0);
            clearInterval(timer);
        }
        speed++
    },5);
}

let search = ref("")
const debounce:any = inject('debounce')
const searchInfoStore = searchStore()
const searchArticle = debounce(() => {
  searchInfoStore.search = search.value
  routerViewRef.value.getBlogList()
},1000)
</script>

<style lang="scss" scoped>
.wrapper{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 14px;
  header{
    width: 100%;
    height: 180px;
    position: relative;
    background-image: url('@/assets/images/background.png');
    /* 背景图垂直、水平均居中 */
    background-position: center center;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 让背景图基于容器大小伸缩 */
    background-size: cover;
    /* 设置背景颜色，背景图加载过程中会显示背景色 */
    background-color: #464646;
    .navigation{
        width: 100%;
        height: 52px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        background-color: rgba(0,0,0,0.2);
        color: #fff;
        position: relative;
        z-index: 99;
        ul{
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            text-shadow: 0 1px 1px rgb(0 0 0 / 30%);
            a{
                margin-right: 12px;
                color: #fff;
                cursor: pointer;
                &:hover{
                    transform: scale(1.2, 1.2);
                    font-weight: 800;
                }
            }
        }
        input{
            width: 400px;
            height: 35px;
            border-radius: 15px;
            background:url('@/assets/images/search.png');
            background-color: rgba(0,0,0,0.4);
            background-size:20px 20px;
            background-repeat:no-repeat;
            background-position: 370px 6px;
            position: relative;
            left: 800px;
            padding: 0 10px;
            &:focus{
                background:url('@/assets/images/search-focus.png');
                background-color: #fff;
                background-size:20px 20px;
                background-repeat:no-repeat;
                background-position: 370px 6px;
            }
        }
    }
    .header-title{
        width: 100%;
        height: 100%;
        position: absolute;
        top: -30px;
        left: 0;
        display: flex;
        justify-content: center;
        img{
            width: 480px;
            height: 270px;

        }
    }

    .fixed{
        z-index: 100;
        position: fixed!important;
        top: 0;
        left: 0;
        animation: down .3s ease-in-out;
        background-color: rgb(252,117,62);
        box-shadow: 0 1.5px 5px rgb(0 0 0 / 10%);
    }
  }
  .main-area{
    min-height: 500px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    position: relative;
    z-index: 9;
    padding: 0 20px;
  }
  footer{
    height: 340px;
    position: relative;
    
    z-index: 10;
    background-image: url('@/assets/images/footer-background.jpg');
    background-size: cover;
    color: rgba(255,255,255,0.6);
    .front{
        padding: 70px 0;
        .footer-main{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .footer-main-blocks{
                margin: 0 auto;
                width: 1127px;
                height: 160px;
                padding-bottom: 10px;
                border-bottom: 1px solid hsla(0,0%,100%,.1);
                display: flex;
                justify-content: center;
                .footer-main-block{
                    width: 25%;
                    height: 100%;
                    border-left: 1px solid hsla(0,0%,100%,.1);
                    flex-direction: column;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    p{
                        margin-bottom: 5px;
                    }
                    a{
                        margin-bottom: 5px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        color: rgba(255,255,255,0.6);
                        &:hover{
                            color: #fff;
                        }
                        img{
                            width: 18px;
                            height: 18px;
                            display: block;
                            margin-right: 5px;
                        }
                    }
                    .footer-title{
                        color: #fff;
                    }
                    &:first-child{
                        border: 0;
                        img{
                            width: 110px;
                            height: 110px;
                        }
                    }
                }
            }
            .file-number{
                margin-top: 20px;
            }
        }
      }
  }
  .small-tools{
        position: fixed;
        z-index: 199;
        bottom: 100px;
        right: 40px;
        .weather{
            position: relative;
            margin-bottom: 10px;
            .weather-icon{
                width: 40px;
                height: 40px;
                cursor: pointer;
            }
            .weather-details{
                position: absolute;
                top: -280px;
                right: 45px;
                width: 220px;
                height: 320px;
                padding: 20px 10px;
                border-radius: 20px;
                color: #fff;
                background:linear-gradient(rgb(13,104,188),rgb(77,147,210));
                display: flex;
                flex-direction: column;
                align-items: center;
                .weather-header{
                    .first-row{
                        span{
                            &:first-child{
                                font-size: 20px;
                                font-weight: 600;
                            }
                        }
                        margin-bottom: 5px;
                    }
                }
                .weather-main{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .weather-image{
                        width: 138px;
                        height: 70px;
                    }
                    .temperature{
                        display: flex;
                        margin-bottom: 10px;
                        .temperature-number{
                            font-size: 60px;
                            font-weight: 700;
                            margin-right: 5px;
                        }
                        .temperature-right{
                                display: flex;
                                flex-direction: column;
                                justify-content: space-around;
                                padding: 10px 0;
                        }
                    }
                    .weather-info-item{
                        margin-bottom: 10px;
                    }
                }
            }
        }
        .up-to-top{
            position: relative;
            opacity: 0;
            width: 40px;
            height: 40px;
            background-color: rgb(252,117,62);
            border-radius: 4px;
            cursor: pointer;
            overflow: hidden;
            box-shadow: 0 4px 10px rgb(54 54 54 / 18%);
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            img{
                position: absolute;
                fill: #fff;
                width: 20px;
                height: 20px;
                top: 8px;
                left: 10px;
                transition: top .2s ease;
            }
        }
        .show-tool{
            opacity: 1;
        }
    }
}
</style>
