## 提升
函数声明会提升，函数表达式不会提升
```
foo() // 这里会报typeError，因为foo提升是undefined，并不是个函数
var foo = function () {
  // ...
}
```

换个具名来看看
```
foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
  // ...
};
```
foo，bar都会报错，是因为这段代码提升之后变成了下面这样👇：
```
var foo;
foo(); // TypeError
bar(); // ReferenceError
foo = function() {
  var bar = ...self...
  // ...
}
```

### 函数优先
意指：函数首先被提升，然后才是变量   
=> 重复声明会被忽略   
```
foo(); // 1
var foo;
function foo() {
    console.log( 1 );
}
foo = function() {
    console.log( 2 );
};
```
=> 重复的函数声明会被覆盖   
