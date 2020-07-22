## getOwnPropertyDescriptors

> Object.getOwnPropertyDescriptors(obj)

```
var obj = { name: 'leo' }
Object.getOwnPropertyDescriptors(obj)

=>

{
  name: {
    value: 'leo',
    enumerable: true,
    writable: true,
    configurable: true
  }
}
```

### getOwnPropertyDescriptors和create结合

```
Object.create({ name: 'leo' }, Object.getOwnPropertyDescriptors({
  name: 'leo1',
  age: 29
}))
```