## Array

#### forEach   

> arr.forEach(callback(currentValue, index, array), thisArg)   

普通使用   
```
[1, 2, 3].forEach(function (item, index, array) {
    console.log(this, item, index, array)
})
```   
当没有显式声明thisArg时，this指向window   

可以显示声明回调的上下文👇：
```
var obj = {name: 'leo'};
[1, 2, 3].forEach(function (item, index, array) {
    console.log(this, item, index, array)
}, obj)
```   
可以发现上下文this变成了obj，可是如果是箭头函数会怎么样呢？   
```
var obj = {name: 'leo'};
[1, 2, 3].forEach((item, index, array) => {
    console.log(this, item, index, array)
}, obj)
```   
发现this又变成了window，箭头函数把当前的词法作用域作为this，优先级比forEach的thisArg高   

