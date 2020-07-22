## 关于Object构造函数

```
f Object () { [native Code] }
```

### Object.prototype
```
{
  constructor,
  hasOwnProperty,
  isPrototypeOf,
  propertyIsEnumerable,
  toLocalString,
  toString,
  valueOf
}
```

### Object.prototype.__proto__
null


### Object.getPrototype与prototype
为何 Object.getPrototype(Object) 和 Object.prototype的结果不同呢？   

1. Object.getPrototype获取的是Object的__proto__属性
2. Object.prototype获取的是Object的prototype   

说明Object的__proto__跟prototype是不同的