## defineProperties

> Object.defineProperties(obj, props)   

```
Object.definePrpperties(obj, {
  name: {
    value: 'leo',
    writable: true,
    configurable: true,
    enumerable: true,
    get () {},
    set () {}
  }
})
```   

### Polyfill
```
function defineProperties(obj, properties) {
    function convertToDescriptor (desc) {
        const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty(obj, prop);
        const isCallable = v => typeof v === 'function';

        if (typeof desc !== 'object' || desc === null) {
            throw new TypeError('bad desc');
        }

        const d = {}
        hasProperty(desc, 'configurable') && (d.configurable = !!desc.configurable)
        hasProperty(desc, 'enumerable') && (d.enumerable = !!desc.enumerable)
        hasProperty(desc, 'writable') && (d.writable = !!desc.writable)
        hasProperty(desc, 'value') && (d.value = !!desc.value)

        if (hasProperty(desc, 'get')) {
            const g = desc.get
            if (!isCallable(g) && typeof g !== 'undefined') {
                throw new TypeError('bad get');
            }
            d.get = g
        }
        if (hasProperty(desc, 'set')) {
            const s = desc.set
            if (!isCallable(s) && typeof s !== 'undefined') {
                throw new TypeError('bad set');
            }
            d.set = s
        }
        if (('get' in d || 'set' in d) && ('value' in d || 'writable' in d)) {
          throw new TypeError('identity-confused descriptor');
        }

        return d;
    }

    if (typeof obj !== 'object' || obj === null) {
        throw new TypeError('bad obj')
    }

    const keys = Object.keys(properties)
    for (let key of keys) {
        const desc = convertToDescriptor(properties[key])
        Object.defineProperty(obj, key, desc)
    }
    return obj
}
```