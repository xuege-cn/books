## entries

> Object.entries(obj) 

### Polyfill
```
if (typeof Object.entries !== 'function') {
    Object.defineProperty(Object, 'entries', {
        value: obj => {
            const keys = Object.keys(obj)
            let resArray = new Array(i)
            for (let key of keys) {
                resArray.push([key, obj[key]])
            }
            return resArray
        }
    })
}
```