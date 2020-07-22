## 函数作用域
### 最小暴露原则
在软件设计中，应该最小限度地暴露必要内容，而将其他内容都隐藏起来   
1. 控制访问权限
2. 规避冲突，如命名冲突   

### 匿名函数
匿名函数地缺点：
1. 在栈追踪中不会显示出有意义地函数名，使得调试困难
2. 函数无法引用自身，只能通过arguments.callee
3. 一个描述性地名称可以让代码不言自明，可读性变差   

始终给函数表达式命名是一个最佳实践

### IIFE
自执行函数
```
(function IIFE() {})()

=> 很多人更下面的形式👇

(function IIFE() {}())
```

#### IIFE解决undefined的问题
undefined有什么问题？ => undefined并不是一个关键字，可能会被覆盖，就像下面这样👇
```
undefined = true
```   

解决方案：
1. 使用void(0)作为undefined
2. 使用IIFE   

```
(function IIFE(undefined){})()
```
