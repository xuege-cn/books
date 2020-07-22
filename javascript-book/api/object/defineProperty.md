## defineProperty

> Object.defineProperty(obj, prop, descriptor)

可枚举属性会被枚举到：for...in 或 Object.keys   

属性描述符有两种主要形式，可为其一，不能同时是两者：   
1. 数据描述符：具有值的属性
2. 存取描述符：由getter函数和setter函数所描述的属性   

描述符：
1. configurable：表示是否可删除
2. enumerable：for...in，Object.keys是否可被枚举
3. writable：是否可写，不能与存取描述符共存
4. value：值或函数，不能与存取描述符共存