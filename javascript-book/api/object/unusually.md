## 不常用的方法

### setPrototypeOf
为目标对象设置原型   
```
Object.setPrototypeOf(obj, prototype)
```

### values
> Object.values(obj)

获取值数组

### freeze
> Object.freeze(obj)   

一个被冻结的对象，再也不能被修改👇：
```
var obj = { name: 'leo' }; Object.freeze(obj); obj.name = '123'; console.log(obj)
// 输出还是leo，不抛错，可是没更改
```
#### isFrozen
> Object.isFrozen(obj)

判断一个对象是否被冻结   
```
var obj = { name: 'leo' }; Object.freeze(obj); Object.isFrozen(obj)
```

### seal
封闭对象
> Object.seal(obj)

阻止添加新属性，原有属性是可写的仍可改变

#### isSealed
判断一个对象是否是密封的


### 判断一个对象是否可扩展 isExtensible
> Object.isExtensible(obj)

seal和freeze的对象都是不可扩展的

### 阻止扩展 preventExtensions
> Object.preventExtensions(obj)

永远不能添加新的属性