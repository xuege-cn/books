## Function

每个javascript函数实际上都是一个Function对象，下面代码可以证明👇：
```
(function () {}).constructor === Function
```   

所以诸如Object，Array，Date等获取其__proto__，都是函数实例：
```
Object.getPrototypeOf(Object)

=> 

f () { [native code] }
```

Object，Array等都是继承自Function

### Polyfill
```
<!-- F代表Function，O代表Object构造函数 -->
function F () {
  function O () {
  
  }
  O.prototype = Object.prototype
  return O;
}

var O = new F()
console.log(O)
console.log(O.constructor)
console.log(O.__proto__)
console.log(O.prototype)
console.log(Object.prototype)
console.log(O.prototype === Object.prototype)
```