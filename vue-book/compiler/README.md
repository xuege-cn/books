## 编译部分
编译部分主要包括：
1. 模版解析
2. AST优化
3. 代码生成   

## 实现的功能 
**1. 模版👇：即我们编写的一般模版**
```
<div id="app" class="container">
    <template v-if="name === 'xuqiang'">
        <div @click={click}>my name is</div>
        <div v-for="(item, index, index1) in 3">{{name}}</div>
    </template>
</div>
```

**2. 生成AST树**
```
{
    start: 0,
    end: 214,
    plain: false,
    static: false,
    staticClass: '"container"',
    staticRoot: false,
    tag: 'div',
    type: 1,
    attrs: [{
        dynamic: undefined,
        end: 13,
        name: 'id',
        value: '"app"'
    }],
    attrsList: [{
        end: 13,
        start: 5,
        name: 'id',
        value: 'app'
    }],
    attrsMap: {
        class: 'container',
        id: 'app'
    },
    rawAttrsMap: {
        class: {
            start: 14,
            end: 31,
            name: 'class',
            value: 'container'
        },
        id: {
            start: 5,
            end: 13,
            name: 'id',
            value: 'app'
        }
    },
    children: [{
        start: 39,
        end: 203,
        plain: true,
        static: false,
        staticRoot: false,
        tag: 'template',
        type: 1,
        attrsList: [],
        attrsMap: {
            'v-if': 'name === "xuqiang"'
        },
        if: 'name === "xuqiang"',
        ifConditions: [{
            exp: 'name === "xuqiang"'
        }],
        ifProcessed: true,
        rawAttrsMap: {
            'v-if': {
                start: 49,
                end: 74,
                name: 'v-if',
                value: 'name === "xuqiang"'
            }
        },
        children: [{
            start: 84,
            end: 122,
            plain: false,
            static: false
            staticRoot: false,
            tag: "div"
            type: 1,
            attrsList: [{
                start: 89,
                end: 105,
                name: "@click",
                value: "{click}",
            }],
            attrsMap: {
                '@click': "{click}"
            },
            rawAttrsMap: {
                '@click': {
                    start: 89,
                    end: 105,
                    name: "@click",
                    value: "{click}",
                }
            },
            children: [{
                start: 106,
                end: 116,
                static: true,
                text: "my name is",
                type: 3
            }]
        }, {
            start: 122,
            end: 131,
            static: true,
            text: " ",
            type: 3
        }]
    }]
}
```

**3. AST生成代码**
```
with(this) {
    return _c('div', {
        staticClass: "container",
        attrs: {
            "id": "app"
        }
    },
    [(name === 'xuqiang') ? [
        _c('div', {
            on: {
                "click": click
            }
        }, [_v("my name is")]),
        _v(" "),
        _l((3), function(item, index, index1) {
            return _c('div', [_v(_s(name))])
        })
    ] : _e()], 2)
}
```