## 从构造函数说起
### vue实例创建   
🧐 抛开vue-loader不说，就从最原始的vue使用方式来看看如何创建一个vue实例   
#### 模版
```
<div id="app" class="container">
    <template v-if="name === 'xuqiang'">
        <div @click="click">my name is</div>
        <div v-for="(item, index, index1) in 3">{{name}}</div>
    </template>
</div>
```
#### 实例创建
```
new Vue({
    el: '#app',
    data () {
        return {
            name: 'xuqiang'
        }
    },
    methods: {
        click () {
            alert('hahaha')
            console.log('it is clicked!')
        }
    }
}) 
```

🙊 Amazing！到这里一个Vue应用就能用了，数据双向绑定，事件监听啥的就已经实现了🚀🚀🚀   
🧐 那么让我们一层一层的扒开Vue构造函数，看看是如何实现的模版解析
### 模版编译入口
**Vue的构造函数就只执行了一个方法：_init**
```
function Vue (options) {
    this._init(options)
}
```
_init方法定义在core/instance/init.js🀄️，_init函数中前面会去执行初始化生命周期啊，事件啊等等   
最后⚠️ 重点来了👇
```
vm.$mount(vm.$options.el)
```
顾名思义：开始安装了   
**那么它其实就是编译的入口**
## WEB平台下的模版解析
web平台下的$mount定义在src/platforms/web/entry-runtime-with-compiler.js中   
在$mount的入口处，可以看到一个骚操作💃   
```
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function...
```
**为什么要这么处理呢？**   
这里我认为主要是因为👇：   
使原方法mount更纯净：只是作为安装组件，而新$mount包含了模版编译的过程，这符合装饰器的设计模式   
### 如何获取根节点
获取根节点的方法query定义在src/platforms/web/util/index.js中
```
export function query (el) {
    if (typeof el === 'string') {
        const selected = document.querySelector(el)
        if (!selected) {
            return document.createElement('div')
        }
        return selected
    } else {
        return el
    }
}
```
可以看到这里做了两个兜底👇：   
1. 判断el为string类型才进行获取
2. 当取不到相关节点时，createElement一个div   

### 根节点的要求
根节点有啥要求呢？可能在具体开发中没注意过，其实根节点不能是body或者html，可以试想如果是这两者被替换了，那么文档还符合规范吗？
```
if (el === document.body || el === document.documentElement) {
    return this
}
```

### template获取 
OK! 获取el并判断其合法之后，就开始获取template了，这里我们只讲此文顶部最简单的实例中是如何获取template的
```
template = getOuterHTML(el)
```
咱们这个demo会走到这个分支，通过getOuterHTML方法获取template，来看看getOuterHTML是如何实现的。这个方法就定义在entry-runtime-with-compiler.js的底部
```
function getOuterHTML (el) {
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        const container = document.createElement('div')
        container.appendChild(el.cloneNode(true))
        return container.innerHTML
    }
}
```
可以看到同样做了兜底操作👇：   
* el.outerHTML存在则返回
* 不存在的话，先建一个容器，复制一个el放进去，然后返回该容器的innerHTML

### template转化为render函数
有了template，下面就是编译的核心：   
> 把template转化为render函数   

```
const { render, staticRenderFns } = compileToFunctions(template, options)
```

compileToFunctions来自src/platforms/web/compiler/index.js中，是通过createCompiler创建的   
**而这个createCompiler来自src/compiler/index.js，其便是创建编译器的入口**

## 总结
兜兜绕绕的看了一圈，编译入口讲的大致以下几点：
* $mount是Vue开始解析模版安装组件的入口
* $mount方法四个作用：
  * 获取el
  * 获取template
  * template转化为render函数
  * 调用原$mount安装组件