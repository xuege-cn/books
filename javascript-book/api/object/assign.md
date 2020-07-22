## assign

> Object.assign(target, ...sources)   

target：目标对象，sources：源对象，**返回值：目标对象**   

> 说明target会被改变   

assign方法只会拷贝源对象自身的并且可枚举的属性到目标对象   

### Polyfill
#### MDN官方Polyfill
```
if (typeof Object.assign !== 'function') {
    Object.defineProperty(Object, 'assign', {
        value: function assign(target, varArgs) {
            'use strict';
            if (target === null || target === undefined) {
                throw new Error('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey]
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    })
}
```

#### 自定义Polyfill
```
if (typeof Object.assign !== 'function') {
    Object.defineProperty(Object, 'assign', {
        value: (target, ...sources) => {
            if (target === null || target === undefined) {
                throw new Error('Cannot convert null or undefined to object');
            }
            const to = Object(target)
            if (sources && sources.length) {
                for (let source of sources) {
                    for (let key in source) {
                        if (Object.prototype.hasOwnProperty(source, key)) {
                            to[key] = source[key]
                        }
                    }
                }
            }
            return to
        },
        writable: true,
        configurable: true
    })
}
```

### 深拷贝问题   
assign复杂对象，复制的是引用值
```
let obj = { a: 0, b: { c: 0 } }
let obj1 = Object.assign(obj)
obj.b.c = 1;
console.log(obj1.b.c)
```   

这里的obj和obj1共享{ c: 0 }   

### 注意点   
1. 继承属性和不可枚举属性不能拷贝
2. 原始类型会被包装为对象
    2.1 只有字符串的对象，才可能有自身可枚举属性

### 拷贝访问器   
//TODO 先看下reduce