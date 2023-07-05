import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
export const searchStore = defineStore('searchStore', ()=>{
    let search:any = ref('')
    
    return {
        search
    }
})

