## getOwnPropertySymbols

> Object.getOwnPropertySymbols(obj)

getOwnPropertyNames不能获取Symbol属性，只包含字符串属性   

### 获取数组的iterator和unscopables属性   
```
Object.getOwnPropertySymbols(Array.prototype)

=>

[Symbol(Symbol.iterator), Symbol(Symbol.unscopables)]
```   

