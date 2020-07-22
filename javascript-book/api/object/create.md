## create
> Object.create(proto[, propertiesObject])   

Object.create方法创建一个新对象，使用现在的对象来提供新创建的对象的__ptoto__   

### propertiesObject
```
let obj = { name: 'xuqiang' }
let obj1 = Object.create(obj, {
    age: {
        writable: false,
        configurable: false,
        enumerable: false,
        value: 29
    }
})
```

### Polyfill
```
if (typeof Object._create !== 'function') {
    Object.defineProperty(Object, '_create', {
        value: (proto, propertiesObject) => {
            if (typeof proto !== 'object' && typeof proto !== 'function') {
                throw new Error('Object prototype may only be an Object or null:' + proto)
            }
            defineProperties(proto, propertiesObject)
            function F () {}
            F.prototype = proto
            return new F()
        }
    })
}
```