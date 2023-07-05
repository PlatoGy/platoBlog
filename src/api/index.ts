import request from '@/utils/request'
//获取博客详情信息
export const getDetails = (id:number,ip:any = '0.0.0.0') : any => {
    return request({
        url:`http://127.0.0.1:3000/blog/getArticleDetail/${id}?ip=${ip}`,
        method:'get'
    })
}
// 获取博客列表
export const getList = (pageNum:number,pageSize:number,library:string,labels:string,search:string="") : any => {
    return request({
        url:`http://127.0.0.1:3000/blog/getArticleList?pageNum=${pageNum}&pageSize=${pageSize}&library=${library}&labels=${labels}&search=${search}`,
        method:'get'
    })
}

//获取分类信息（标签、知识库
export const getSortInfo = () : any => {
    return request({
        url:`http://127.0.0.1:3000/blog/getSortInfo`,
        method:'get'
    })
}

//获取用户信息
export const getVisitorInfo = (ip:string) : any => {
    return request({
        url:`http://127.0.0.1:3000/blog/getVisitorInfo?ip=${ip}`,
        method:'get'
    })
}

//获取用户信息
export const getIp = () : any => {
    return request({
        url:`https://ipv4.icanhazip.com/`,
        method:'get'
    })
}

//获取flow页面信息
export const getFlow = (ip:string) : any => {
    return request({
        url:`http://127.0.0.1:3000/flow/getFlowInfo?ip=${ip}`,
        method:'get'
    })
}

//发送验证码
export const getCode = (mail:string) :any => {
    return request({
        url:`http://127.0.0.1:3000/blog/postCode?mail=${mail}`,
        method:'get'
    })
}
//核对验证码 and 发布评论
export const publicComment = (data:any) :any => {
    return request({
        url:`http://127.0.0.1:3000/blog/postComment`,
        method:'post',
        data
    })
}