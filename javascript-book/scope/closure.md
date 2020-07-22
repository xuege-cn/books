## 闭包
函数嵌套，js引擎变量查找的规则引起的一种现象   
1. 函数能记住并访问所在的词法作用域
2. 即使函数是在当前词法作用域之外执行

### 现象
1. 内部函数可以访问外部作用域的变量
2. 外部作用域的变量会一直存在内存中   

### 应用
1. 函数柯理化
2. 块级作用域变量泄漏   

```
<!-- 函数柯理化 -->
function foo (context) {
  return function (...args) {
    return Array.prototype.push.apply(context, args)
  }
}
```

```
<!-- 闭包解决for+setTimeout问题 -->
for (var i = 0; i < 10; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i)
    }, i * 1000)
  })(i)
}
```

