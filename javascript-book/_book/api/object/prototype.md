## 原型上的方法

### hasOwnProperty
> obj.hasOwnProperty(prop)

判断此属性是否是自身的

#### 为什么不直接用obj.hasOwnProperty，而使用Object.prorotype.hasOwnProperty

因为hasOwnProperty可能被对象自身上的hasOwnProperty重写属性覆盖，所以用Object.prototype.hasOwnProperty更为准确

### isPrototypeOf

> prototypeObj.isPrototypeOf(object)

测试一个对象是否存在于另一个对象的原型链上   

isPrototypeOf与instance的不同：
```
object instanceOf AFunction
```   

object的原型链是针对AFunction.prototype进行检查的，而不是AFunction自身

### propertyIsEnumerable
> obj.propertyIsEnumerable(prop)

返回一个布尔值，表示此属性是否可枚举   
```
obj.propertyIsEnumerable('property1')
```

### toLocaleString
有一个妙用：给金额每三位加逗号分隔   
```
Number('123456789').toLocaleString()
// "123,456,789"
```

### toString
```
var obj = {
  name: 'leo',
  toString () { return this.name }
};
console.log(String(obj))
```