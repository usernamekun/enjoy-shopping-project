import {v4 as uuidv4} from 'uuid'
// 要生成一个随机的字符串，且每次执行不能发生变化，游客身份持久储存
export const getUUID = ()=>{
    // 先从本地存储获取uuid（看一下本地存储里面是否有）
    let uuid_token = localStorage.getItem("UUIDTOKEN")
    // 如果没有
    if(!uuid_token){
        // 生成游客临时身份
        uuid_token = uuidv4()
        //存储到本地存储当中:用户身份只需要存储一次，而且不能变
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return uuid_token
}