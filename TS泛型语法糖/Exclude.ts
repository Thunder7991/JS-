/*
 * @Author: thunderchen
 * @Date: 2023-05-05 16:24:32
 * @LastEditTime: 2023-05-05 16:24:38
 * @email: 853524319@qq.com
 * @Description: Exclude<T, U>：作用简单说就是把 T 里面的 U 去掉，再返回 T 里还剩下的
 */



type T1 = Exclude<string | number,string>
// 此时 T1 =>  T1 = number


type T2 = Exclude<'a' | 'b' | 'c','b'|'d'>
// 此时T2 =>  T2 = "a" | "c"