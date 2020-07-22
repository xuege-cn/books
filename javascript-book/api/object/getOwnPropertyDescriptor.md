## getOwnPropertyDescriptor

> Object.getOwnPropertyDescriptor(obj, prop)

getOwnPropertyDescriptor可以获取属性描述符👇：
```
let obj = { name: 'leo' }
Object.getOwnPropertyDescriptor(obj, 'name')

=> 

{
  value: 'leo',
  enumerable: true,
  writable: true,
  configurable: true
}
```