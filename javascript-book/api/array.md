## 数组

### Array
> new Array(element0, element1, ...elementN)  |  new Array(arrayLength)   

### 静态方法   
#### Array.from   
> Array.from(arrayLike[, mapFn[, thisArg]])   
```
var obj = { x: 3 };
var ret = Array.from([1, 2, 3], function (item) { return item * this.x; }, obj);
console.log(ret)
```   

#### Array.length   
操作length会直接改变数组，比如length = 0; 就把数组给置空了   

#### Array.isArray
> Array.isArray(obj)

判断是否是个数组

#### Array.prototype[@@unscopables]   
属性名为Symbol.unscopables   
[][Symbol.unscopables]可以看到Array unscopables的属性👇：   
```
{
    copyWithin: true,
    entries: true,
    fill: true,
    find: true,
    findIndex: true,
    flat: true,
    flatMap: true,
    includes: true,
    keys: true,
    values: true
}
```   
##### unscopables的作用
防止某些数组方法被添加到with语句的作用域中   
```
let keys = []
with (Array.prototype) {
    keys.push('something')
}
```   
在es6中keys是function，push会报错，而unscopables正是为了解决这个问题