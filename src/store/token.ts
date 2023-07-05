import { ref } from 'vue'
import { defineStore } from 'pinia'
const useToken = defineStore('token', ()=>{
    let token = ref('')
    const setToken = (newVal:string):void =>{
        token.value = newVal
    }
    return {
        token,
        setToken
    }
})

export default useToken