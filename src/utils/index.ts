import type { AnyColumn } from "element-plus/es/components/table-v2/src/common"
import { getLunar } from 'chinese-lunar-calendar'
const format = {
    formatDate: (date :Date) :string =>{
        date = new Date(date)
        let year = date.getFullYear()
        let month = date.getMonth()+1
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        return year+" 年 "+ month + " 月 "+ day + " 日 " + hour + ":" + minute
    },
    formatMonth: (date :Date) :string =>{
        let before = new Date(date).valueOf()
        let now = new Date().valueOf()
        if (now-before < 31536000000){
            if (now-before < 2592000000){
                return Math.floor((now-before)/86400000)+"天前"
            }else{
                return Math.floor((now-before)/2592000000)+"个月前"
            }
        }else{
            return Math.floor((now-before)/31536000000)  +"年前"
        }
    },
    //农历
    formatLunar: (dateData:any):any => {
        let d = new Date(dateData)
        let year = d.getFullYear()
        let month = d.getMonth()+1
        let date = d.getDate()
        return getLunar(year,month,date)
    },
    //x月y日
    formatMD: (dateData:any):string => {
        let d = new Date(dateData)
        let month:any = d.getMonth()+1
        let date:any = d.getDate()
        if(month<10){
            month = '0' + month
        }
        if(date<10){
            date = '0' + date
        }
        return month+'月'+date+'日'
    },
    //空气质量
    formatWeather:(air:any) => {
        let res:string = ''
        if(air<=50){
            res = '优'
        }else if(air<=100){
            res = '良'
        }else if(air<=200){
            res = '轻度污染'
        }else if(air<=300){
            res = '中度污染'
        }else{
            res = '严重污染'
        }
        return res
    }
}

const debounce = (func:any, delay:number = 1000) :any => {
    let timer:any;
    return function (...args:any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func()
        }, delay);
    }
}


export default{
    format,
    debounce
}