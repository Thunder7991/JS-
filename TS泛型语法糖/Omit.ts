/*
 * @Author: thunderchen
 * @Date: 2023-05-06 15:32:21
 * @LastEditTime: 2023-05-06 15:41:55
 * @email: 853524319@qq.com
 * @Description: Omit<T, K>:作用就是把T对象里面的K去掉, 返回T里面还剩下的 
 *               其作用和Exclude是一样的,都能做类型过滤并获得到新类型
 *               处理的主要是  => 对象类型
 */
// 定义如下: 
// type Omit<T, K extends keyof any> = { [P in Exclude<keyof T, K>]: T[P]; }
type User = {
    name:string,
    age:number
}

type T1 = Omit<User,"age">
// type T1 =  {
//     name:string
// }

export {}


