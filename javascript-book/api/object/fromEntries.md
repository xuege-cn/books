## fromEntries

> Object.fromEntries(iterable)

**Object.fromEntries可以把map转为object**   

把键值对列表转换为一个对象   

```
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
])
Object.fromEntries(entries)
```

### entries
entries出来的是个二维数组   
```
let obj = { name: 'leo', age: 29 }
Object.entries(obj)

=>

[
  ['name', 'xq'],
  ['age', 29]
]
```

二维数组可以转换为Map👇：   
```
new Map([
  ['name', 'xq'],
  ['age', 29]
])
```