## getOwnPropertyNames

> Object.getOwnPropertyNames(obj)

这个方法会把可枚举和不可枚举的属性全部都查询出来   
相比keys，keys只能查询可枚举的，for...in亦是遍历可枚举属性   

### 获取不可枚举属性
```
function getUnEnumerProps (obj) {
    const allKeys = Object.getOwnPropertyNames(obj)
    const keys = Object.keys(obj)
    const ret = []
    for (let key of allKeys) {
        if (~keys.indexOf(key)) {
            ret.push(key)
        }
    }
    return ret
}
```