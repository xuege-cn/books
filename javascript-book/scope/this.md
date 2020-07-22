## this
this是在运行时进行绑定的，取决于函数的调用方式   

### 箭头函数 =>
用一个例子来说明下除了书写方便之外，之前的function声明有何问题？
```
var obj = {
  name: 'leo',
  call: function () {
    console.log(this.name)
  }
}
let name = 'global'
obj.call()
setTimeout(obj.call, 0)

<!-- 输出 -->
leo
global
```   

setTimeout那里的obj.call丢失了同this之间的绑定

### 词法作用域作为this
把上面的demo，function修改成箭头函数 =>，发现this都变成了global   

**箭头函数是把当前的词法作用域作为this**

### 绑定规则
#### 默认绑定
独立函数调用，最常用的函数调用类型   
如果函数是严格模式下，那么默认绑定不会绑到全局对象   
```
function foo () {
    "use strict";
    console.log(this.name)
}
var a = 2;
foo(); // TypeError: this is undefined
```   

#### 隐式绑定   
##### 场景
函数调用时：用obj上下文来引用函数
```
obj.foo()
```   

#### 隐式丢失
```
var baz = obj.foo;
haz();
```   

#### 显式绑定
call，apply，bind

这些函数如果传入的是null，那么还是按照默认规则执行   

#### new绑定

### 自定义bind
```
function foo () {
    console.log(this.name)
}
var name = 'i am global'
var obj = {
    name: 'i am foo'
}
Function.prototype._bind = function (context) {
    let fn = this
    return function (...args) {
        fn.apply(context, args)
    }
}
foo._bind(obj)()
```

```
<!-- MDN实现 -->
if (!Function.prototype.bind) { Function.prototype.bind = function(oThis) {
if (typeof this !== "function") { // 与 ECMAScript 5 最接近的 // 内部 IsCallable 函数
throw new TypeError(
                     "Function.prototype.bind - what is trying " +
                     "to be bound is not callable"
 bar(3) 并没有像我们预计的那样把 obj1.a
 this全面解析 | 93
); }
var aArgs = Array.prototype.slice.call( arguments, 1 ), fToBind = this,
fNOP = function(){}, fBound = function(){
return fToBind.apply( (
this instanceof fNOP &&
oThis ? this : oThis ),
                         aArgs.concat(
                            Array.prototype.slice.call( arguments )
); }
;
fNOP.prototype = this.prototype;
fBound.prototype = new fNOP(); return fBound;
}; }
```

### DMZ对象
> DMZ：非军事区   

```
<!-- ø 表示：我希望this是空 -->
var ø = Object.create(null)
```