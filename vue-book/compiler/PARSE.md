## 解析入口
> 编译入口讲到了src/compiler/index.js的createCompiler方法   

```
export const createCompiler = createCompilerCreator(function baseCompile (
    template: string,
    options: CompilerOptions
) {
    const ast = parse(template.trim(), options)
    if (options.optimize !== false) {
        optimize(ast, options)
    }
    const code = generate(ast, options)
    return {
        ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns
    }
})
```
其中的parse方法便是解析template为ast🌲，那么具体看看parse函数是如何解析的
## parse方法
> parse方法是在src/compiler/parser/index.js中   

**精髓在parseHTML**   
> parseHTML在src/compiler/parser/html-parser.js中   

parseHTML是解析html模版的核心，接受两个参数：
* template：即模版
* options：options里有配置项，还有一些钩子函数，如comment，chars，start等   

### 解析方案
比如拿到一个模版，是根据outerHTML获取的模版，那么拿到的模版其实是如下的一串字符串👇：   
```
<div id="app" class="container">
    <template v-if="name === 'xuqiang'">
        <div @click="click">my name is</div>
        <div v-for="(item, index, index1) in 3">{{name}}</div>
    </template>
</div>
```
这里有个问题：   
如何判断模版格式是否规范，如果是个不规范的模版怎么办呢？   
```
let textEnd = html.indexOf('<')
if (textEnd === 0) {
    <!-- 规范模版 -->
}
if (textEnd >= 0) {
    <!-- <前面的作为text（文本）解析，从<开始作为规范模版解析 -->
}
if (textEnd < 0) {
    <!-- 整个模版作为文本 -->
    text = html
}
if (text) {
    <!-- 如何是文本模版，直接走过，不解析 -->
    advance(text.length)
}
```
**🥳 Vue使用的是正则匹配**      
比如匹配到注释，把注释解析出来，然后把html substring之后重新赋值给html，这样html就缩短了。长此以往，while(html)直到html全被解析   
那么这里有个注意点是需要保证所有节点都能被解析，不然可能会有bug，parse过程主要分为几类：
1. 注释
2. Doctype
3. 结束标签
4. 开始标签

这四类就涵盖了所有解析节点   
### 注释节点解析
HTML中注释主要包含两类：
1. 普通注释
```
<!-- 我是个普通注释啊 -->
```
2. 条件注释
```
<!--[if lt IE 7]>
```   

#### 普通注释解析
```
const comment = /^<!\--/
if (comment.test(html)) {
    const commentEnd = html.indexOf('-->')

    if (commentEnd >= 0) {
        if (options.shouldKeepComment) {
            options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
        }
        advance(commentEnd + 3)
        continue
    }
}
```   

从代码中可以看到：
* 用正则匹配普通注释开始标签
* 用indexOf获取普通注释结束标签   

当两者皆为true时判为comment存在成立🥳   
advance是啥？🤨   
```
function advance (n) {
    index += n
    html = html.substring(n)
}
```   
其实就是把已解析的代码片段删掉，然后索引走到当前解析的位置，可以理解为下一步的意思   
🚀 这里咱们暂时不关注shouldKeepComment和options.comment了。因为这对我们理解解析主流程没有影响
#### 条件注释解析
类似普通注释，不过条件注释更简单，是直接解析出来就advance了   
```
const conditionalComment = /^<!\[/
if (conditionalComment.test(html)) {
    const conditionalEnd = html.indexOf(']>')

    if (conditionalEnd >= 0) {
        advance(conditionalEnd + 2)
        continue
    }
}
```   

到这里注释就解析完了
### Doctype节点解析
Doctype没啥好讲的，解析到就删掉然后下一步
```
const doctype = /^<!DOCTYPE [^>]+>/i
const doctypeMatch = html.match(doctype)
if (doctypeMatch) {
    advance(doctypeMatch[0].length)
    continue
}
```
/^<!DOCTYPE \[^>\]+>/i 匹配以<!DOCTYPE开头，并且DOCTYPE 之后匹配非>的任意1个以上字符，忽略大小写   
比如<!DOCTYPE a>，<!doctype z>都是可以的
### 结束标签
```
const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const endTagMatch = html.match(endTag)
if (endTagMatch) {
    const curIndex = index
    advance(endTagMatch[0].length)
    parseEndTag(endTagMatch[1], curIndex, index)
    continue
}
```
endTag的正则是相对复杂的，有兴趣可以研究下，这里先略过   
可以看到endTag的解析不同之后在于多了个parseEndTag，parseEndTag是干嘛的呢？   

先思考下：结束标签有哪几种？
1. 闭合标签：普通标签
2. 自闭合标签：br   

⚠️ ：任意标签都是闭合标签，那么在解析到结束标签时需要查找到开始标签
```
function parseEndTag (tagName, start, end) {
    let pos, lowerCasedTagName
    if (tagName) {
        lowerCasedTagName = tagName.lowerCase()
        for (pos = stack.length - 1; pos >= 0; pos--) {
            if (stack[pos].lowerCasedTag === lowerCasedTagName) {
                break
            }
        }
    }
    if (pos >= 0) {
        for (let i = stack.length - 1; i >= pos; i--) {
            if (options.end) {
                options.end(stack[i].tag, start, end)
            }
        }
        stack.length = pos
        lastTag = pos && stackp[pos - 1].tag
    }
}
```   
这个方法的主要作用是：
* stack存储了当前未闭合的节点
* 找到当前闭合节点的开始节点在stack中的位置
* 找到开始节点和关闭节点之间的未关闭节点，这些节点都给关闭掉
* stack清理一下   

### 开始标签
```
const startTagMatch = parseStartTag()
if (startTagMatch) {
    handleStartTag(startTagMatch)
    if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
        advance(1)
    }
    continue
}
```
parseStartTag方法是解析开始标签的，会解析出标签名以及属性   
> 具体可以看src/compiler/parser/html-parser.js中parseStartTag   

解析开始标签的正则和结束标签类似   
```
const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
<!-- 匹配开始标签 -->
html.match(startTagOpen)
```

如何查找开始标签结束呢？
```
const startTagClose = /^\s*(\/?)>/
<!-- 匹配开始节点之后，就advance去掉html，然后查找下一个>，即为结束 -->
html.match(startTagClose)
```

匹配开始节点中的属性
```
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
attr = html.match(dynamicArgAttribute) || html.match(attribute)
```
⚠️ 注意： 匹配到一个属性之后，除了把属性存到match里面，还需要advance