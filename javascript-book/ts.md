## Typescript

### 类型系统
**Number**
```
let num: number = 666
```

**String**
```
let str: string = 'leo'
```

**Boolean**
```
let isTure: boolean = true
```

**Array**
```
<!-- 方法一 -->
let arr: number[] = [1, 2, 3]

<!-- 方法二 -->
let arr: Array<number> = [1, 2, 3]
```

**Object**
```
let obj: Object = {}
```

**Any**
```
let coco: any = 666
```

**Enum**   
方法一：
```
enum Animal {
  CAT = 'cat',
  DOG = 'dog',
  PIG = 'pig',
}

// Animal.CAT
// Animal['CAT']
```

方法二：
```
enum Animal { CAT, DOG, PIG }
```   

**Unknown**
```
let value: unknown;
```

**Tuple**   
固定长度，固定类型
```
let tup: [number, string] = [27, 'jianan']
```

**void**
```
function foo (): void {}
```

### 断言

#### 类型断言 as
```
let value: any = 'this is a value'
let len: number = (value as string).length
let len2: number = (<string>value).length
```

#### 非空断言
```
function foo(name: string | undefined) {
  let sname: string = name!
}
```
name!表示确定其有值，不会null或undefined   

### 类型判断
#### typeof类型演算
```
const a: number = 1
const b: typeof a = 3
```

#### instanceof 推断类型
```
const str: string = 'this is a value'
str instanceof String
```

### 类型别名和接口
类型别名
```
type people = {
  name: string,
  age: string
}
const someone: people = {
  name: 'leo',
  age: 29
}
```

接口
```
interface people = {
  name: string,
  age: string
}
<!-- 使用和type是一样的 -->
```   

### 来自别名和接口的约束
**约束类**
```
interface ClockInterface {
  cTime: Date,
  setTime(d: Date): string
}
```