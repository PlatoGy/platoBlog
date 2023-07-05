import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
export const userInfoStore = defineStore('userInfoStore', ()=>{
    let user:any = reactive({
        ip:'',
        location:{},
        weather:{}
    })
    // const setToken = (newVal:string):void =>{
    //     token.value = newVal
    // }
    return {
        user,
    }
})

