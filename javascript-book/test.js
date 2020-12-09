// function Obj () {
//     this.name = '123'
//     const symbol = Symbol('name')
//     this[symbol] = '哈哈哈'
// }

// Obj.prototype = {
//     age: 30
// }

// const obj = new Obj()

// console.log('for in :')
// for (let prop in obj) {
//     console.log(prop)
// }


// console.log('Object.keys :')
// const keys = Object.keys(obj)
// console.log(keys)

// function aa (a, b) {
//     console.log(a.toString(), a);
//     console.log(b.toString(), b);
// }

// const funcStr = aa.toString();

// const funcParaReg = /^function\s\w+\s{0,}\((.*)\)/;
// const funcParaRet = funcStr.match(funcParaReg);
// const funcPara = funcParaRet[1];

// const funcBodyReg = /^function\s\w+\s{0,}\(.*\)\s{0,}{\n(.*)\n}$/s;
// const funcBodyRet = funcStr.match(funcBodyReg);
// const funcBody = funcBodyRet[1];

// const params = []
// funcPara && funcPara.split(',').forEach(param => params.push(param.trim()))
// const b = new Function (...params, funcBody);
// b(1111, 2222)


// const map = new Map();
// map.set('name', 'xuqiang');
// for (let [key, value] of map.entries()) {
//     console.log(key, value)
// }

// const set = new Set();
// set.add(111)
// for (let item of set.values()) {
//     console.log(item)
// }

// function outputDate (startDate, endDate) {
//     const ret = []
//     const _start = new Date(startDate);
//     const _end = new Date(endDate);

//     function step () {
//         const _month = _start.getMonth() + 1;
//         const _year = _start.getFullYear();

//         if (_month <= 12) {
//             _start.setMonth(_month);
//         } else {
//             _start.setMonth(0);
//             _start.setFullYear(_year + 1);
//         }

//         return {
//             year: _year,
//             month: String(_month).padStart(2, '0'),
//         };
//     }
//     step();

//     while (_start < _end) {
//         const { year, month } = step();
//         ret.push(`${year}-${month}`);
//     }
//     return ret;
// }

// const result = outputDate('2018-08', '2019-12');
// console.log(result)

// function repeat (func, times, wait) {
//     return function (...args) {
//         function timeout () {
//             if (times > 0) {
//                 times--;
//                 func.call(this, args);
//                 setTimeout(timeout, wait);
//             }
//         }
//         timeout()
//     }
// }

// const repeatFunc = repeat(() => console.log(111), 4, 3000);
// repeatFunc();

// function transfer (num) {
//     const times = num / 26 | 0;
//     const last = num % 26;
//     let bit16Str = last > 0 ? `\\u00${last > 16 ? '7' : '6'}${(last % 16 || 16).toString(16)}` : '\\u007A';
//     const lastStr = new Function(`return '${bit16Str}'`)();
//     return ''.padStart(last ? times : times - 1, 'a') + lastStr;
// }

// console.log(transfer(1))
// console.log(transfer(26))
// console.log(transfer(27))
// console.log(transfer(28))
// console.log(transfer(53))
// console.log(transfer(52))
// console.log(transfer(78))


// ['00:00-00:30', '00:30-01:00', '06:00-06:30', '06:30-07:00', '07:00-07:30', '07:30-08:00', '23:30-24:00']



// function crashDetection (intervals) {
//     intervals.sort((spaceA, spaceB) => spaceA[0] - spaceB[0]);
//     let ret = [];
//     for (let i = 0, len = intervals.length; i < len; i++) {
//         const spaceA = intervals[i];
//         const spaceB = intervals[i + 1];
//         if (spaceA && spaceB) {
//             if (spaceA[1] >= spaceB[0]) {
//                 ret.push([spaceA[0], spaceA[1] > spaceB[1] ? spaceA[1] : spaceB[1]]);
//                 i++;
//             } else {
//                 ret.push(spaceA);
//             }
//         } else {
//             ret.push(spaceA);
//         }
//     }
//     return ret;
// }

// // [[1,6],[8,10],[15,18]]
// console.log( crashDetection([[1,3],[2,6],[8,10],[15,18]]) )

// // [[1, 5]]
// console.log( crashDetection([[1,4],[4,5]]) )

// // [1, 4]
// console.log( crashDetection([[1,4],[2,3]]) )

// // [[0, 5]]
// console.log( crashDetection([[1,4],[0,2],[3,5]]) )


// let supportPassive = false;
// const opts = {
//     get passive () {
//         console.log('support passive');
//         supportPassive = true;
//     }
// };
// window.addEventListener('test-passive', null, opts)

// const target = {}
// Object.defineProperty(target, 'name', {
//     configurable: true,
//     writable: false,
//     value: 'hehe'
// })

// const proxy = new Proxy(target, {
//     get () {
//         return 'haha'
//     }
// })

// console.log(proxy.name)


// const target = {};
// Object.defineProperty(target, 'name', {
//     writable: false,
//     configurable:false,
//     enumerable: false,
//     value: 'haha'
// })
// console.log(Reflect.ownKeys(target))
// console.log(Object.keys(target))
// console.log(Object.getOwnPropertyNames(target))
// target.name = 'hehe'
// console.log(target.name)
// const ret = Reflect.set(target, 'name', 'hehe')
// console.log('reflect result：', ret)
// console.log(target.name)

// const target = {
//     call (name) {
//         console.log(name)
//     }
// }

// Reflect.apply(target.call, target, ['xq'])

// function People (name) {
//     this.name = name;
// }
// People.prototype = {
//     call () {
//         console.log('my name is', this.name)
//     }
// }
// const people = Reflect.construct(People, ['xiur']);
// people.call();
// console.log(Reflect.getPrototypeOf(people))

// const target = {}
// const rf = Reflect.defineProperty(target, 'name', {
//     configurable: true,
//     writable: true,
//     enumerable: true,
//     value: 'xuqiang'
// })
// console.log(target, rf)
// const ds = Reflect.getOwnPropertyDescriptor(target, 'name')
// console.log(ds)

// const target = Object.create({ name: 'xiur' });
// // Object.defineProperty(target, 'name', {
// //     value: 'xiur',
// //     enumerable: false
// // })
// console.log(target)
// console.log(Reflect.has(target, 'name'))



// function createFlow (flows) {
//     return new Flow(flows);
// }
// const isFunc = obj => typeof obj === 'function'
// class Flow {
//     constructor (flows) {
//         this.flows = flows;
//     }
//     async run (callback) {
//         for (let flow of this.flows) {
//             if (flow instanceof Flow) {
//                 const _flows = flow.flows;
//                 for (let _flow of _flows) {
//                     isFunc(_flow) && await _flow();
//                 }
//             }
//             if (isFunc(flow)) {
//                 await flow();
//             }
//             if (Array.isArray(flow)) {
//                 for (let _flow of flow) {
//                     isFunc(_flow) && await _flow();
//                 }
//             }
//         }
//         isFunc(callback) && callback()
//     }
// }
// const log = console.log;
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

// createFlow([
//   () => log("a"),
//   () => log("b"),
//   subFlow,
//   [() => delay(1000).then(() => log("d")), () => log("e")],
// ]).run(() => {
//   console.log("done");
// });

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印


// 字符串编码
// var decodeString = function(s) {
//     while (s.indexOf('[') >= 0) {
//         const firstRightBk = s.indexOf(']');
//         let prevIdx = firstRightBk - 1;
//         while (s[prevIdx] !== '[' && prevIdx >= 0) {
//             prevIdx--
//         }
//         const string = s.substring(prevIdx + 1, firstRightBk);
//         let _doubleStr = '';

//         let times = '';
//         while (/[0-9]/.test(s[--prevIdx]) && prevIdx >= 0) {
//             times = s[prevIdx] + times
//         }
//         ++prevIdx;
//         times = Number(times);

//         while (times > 0) {
//             _doubleStr += string;
//             times--;
//         }
//         s = s.substr(0, prevIdx) + _doubleStr + s.substr(firstRightBk + 1);
//     }
//     return s;
// };


// // aaabcbc
// const ret1 = decodeString("3[a]2[bc]");
// // accaccacc
// const ret2 = decodeString("3[a2[c]]");
// // abcabccdcdcdef
// const ret3 = decodeString("2[abc]3[cd]ef");
// // abccdcdcdxyz
// const ret4 = decodeString("abc3[cd]xyz");

// const ret5 = decodeString("100[leetcode]");

// // console.log(ret1, ret2, ret3, ret4);
// console.log(ret1 === 'aaabcbc', ret2 === 'accaccacc', ret3 === 'abcabccdcdcdef', ret4 === 'abccdcdcdxyz', ret5);

// while(1) {
//     console.log(Math.random());
//     break;
// }

// const idToTemplate = cached(id => id + Date.now())

// function cached (callback) {
//     let cache = {}
//     return function (id) {
//         if (cache[id]) {
//             return cache[id]
//         }
//         return (cache[id] = callback(id))
//     }
// }

// const id1 = idToTemplate(1)
// const id2 = idToTemplate(2)
// const id3 = idToTemplate(3)
// const id4 = idToTemplate(1)
// const id5 = idToTemplate(2)

// console.log(id1, id2, id3, id4, id5)

// function Vue () {
//     console.log('123')
// }
// Vue.extend = function () {
//     console.log(this === Vue)
//     this()
// }

// const vm = new Vue()
// vm._base = Vue
// vm._base.extend()

// function parse(jsonStr) {
//     return eval(`(${jsonStr})`)
// }

// function parse(jsonStr) {
//     return new Function(`return ${jsonStr}`)()
// }

// const result = parse('{name: "xiur"}')
// console.log(result.name)

function sortVersion (versions) {
    return versions.sort((a, b) => {
        console.log(a, b)
        const _vs_a = a.split('.')
        const _vs_b = b.split('.')
        let i = 0
        let len = a.length
        for (; i < len; i++) {
            const aCode = _vs_a[i]
            const bCode = _vs_b[i]
            console.log(aCode, bCode, Number(aCode) > Number(bCode))
            if (aCode !== bCode) {
                return Number(aCode) > Number(bCode)
            }
        }
    })
}

var versions = ['1.45.0', '1.5', '6', '3.3.3.3.3.3.3']
const result = sortVersion(versions)
console.log(result)