## Object

> { [ nameValuePair1[, nameValuePair2[, ...nameValuePairN] ] ] }   

```
new Object({ name: 'leo', age: 19 })
```   

> new Object([value])   

**普通类型：**   
```
<!-- Number {1} -->
new Object(1)
<!-- String {"1"} -->
new Object('1')
<!-- Bolean {true} -->
new Object(true)
```

**null和undefined：**   
```
<!-- 都是返回{} -->
new Object(null)
new Object(undefined)
```

**传入是构造函数：**   
```
<!-- f () {} -->
new Object(function () {})
<!-- f Object () { [native code] } -->
new Object(Object)
<!-- f Symbol () { [native code] } -->
new Object(Symbol)
```   

### 小结
这么看下来，Object略显累赘，远不如对象字面量来的方便