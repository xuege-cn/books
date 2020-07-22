## keys

> Object.keys(obj)

获取的属性会按照属性名的排列顺序，只能获取可枚举属性

### Polyfill
```
var obj = {}
Object.defineProperties(obj, {
  name: {
    value: 'leo',
    enumerable: true
  },
  age: {
    value: 29,
    enumerable: false
  },
  wife: {
    value: 'xixi',
    enumerable: true
  }
})
if (!Object._keys) {
  Object._keys = obj => {
    let ret = []
    for (let prop in obj) {
      console.log('prop:', prop)
      ret.push(prop)
    }
    return ret
  }
}
console.log(Object._keys(obj))
```

输出👇：
```
['wife', 'name']
```   
polyfill正常，再来试试其它方式的polyfill

### getOwnPropertyNames和getOwnPropertyDescriptor
```
var obj = {}
Object.defineProperties(obj, {
  name: {
    value: 'leo',
    enumerable: true
  },
  age: {
    value: 29,
    enumerable: false
  },
  wife: {
    value: 'xixi',
    enumerable: true
  }
})
if (!Object._keys) {
  Object._keys = obj => {
    let ret = []
    const keys = Object.getOwnPropertyNames(obj)
    for (let key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, key)
      if (descriptor.ennumerable) {
        ret.push(key)
      }
    }
    return ret
  }
}
var keys = Object._keys(obj)
```