### cluster 
#### 进程和线程
1. 计算机的核心是 CPU，承担所有计算任务，就好比一座工厂 🏭
2. 假如电力有限，一次只能供给一个车间使用，车间即进程，它代表 CPU 所能处理的单个任务
3. 单核 CPU 一次只能运行一个任务
4. 一个车间有很多工人，工人代表线程，它们协同完成一个任务
5. 车间的空间是工人们共享的，一个进程的内存空间是共享的，每个线程都可以使用这些共享内存
6. 一个线程使用某些共享内存时，其他线程必须等他结束，才能使用，因为房间的大小不同，比如 WC
7. 防止他人进入的两种方式：互斥锁，信号量
8. 互斥锁是信号量的一种，互斥锁表示一把锁一把钥匙，信号量则表示 n 把锁 n 把钥匙

##### 总结
1. 进程：允许多个任务同时运行
2. 线程：允许单个任务分成不同部分去运行
3. 协调机制：防止进程之间和线程之间产生冲突，允许进程之间和线程之间共享资源

### cluster 创建共享服务器端口的子进程
```
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = numCPUs; i > 0; i--) {
        cluster.fork();
    }
} else {
    http.createServer().listen(8000);
}
```

### cluster 两种分发连接
1. 主进程监听端口，接收新连接后分发给工作进程
2. 主进程监听 socket 后发送给工作进程，由工作进程直接接收连接

### cluster API
判断是主进程
```
cluster.isMaster
```

判断是工作进程
```
cluster.isWorker
```

在主进程中获取所有子进程
```
cluster.workers
```

在子进程中获取当前进程实例
```
cluster.worker
```

子进程断开连接
```
const cluster = require('cluster');
if (cluster.isMaster) {
    let worker = cluster.fork();
    worker.disconnect();
} else {
    process.on('disconnect', () => {
        console.log('断开连接了');
        process.kill();
    })
}
```   

判断工作进程是主动退出还是被动退出（用于检测是否需要重启）
```
cluster.on('exit', (worker, code, signal) => {
    if (worker.exitedAfterDisconnect === true) {
        console.log('这是自发退出，无需担心')
    }
});

worker.kill();
```

worker.id
```
cluster.workers的数据格式如下：
{
    '1': Worker
}

cluster.worker.id 可以作为在 workers 中的 key
```

判断工作进程的状态
```
断开连接
worker.isConnected()

已关闭
worker.isDead()
```

杀掉子进程 kill：尝试正常断开工作进程，很容易无限期等待断开连接完成（如工作进程进入无限循环，则永远不会正常断开）   
强制断开：不需要等正常断开，worker.process.kill()
```
const cluster = require('cluster');
if (cluster.isMaster) {
    cluster.fork();
} else {
    cluster.worker.kill();
}
```

worker.process.kill 需要传个 pid
```
const cluster = require('cluster');
if (cluster.isMaster) {
    cluster.fork();
} else {
    process.kill(process.pid);
}
```

worker.process
```
会通过 child_process.fork 的方式创建 process，并保存在 worker.process
```

进程之间通信
```
const cluster = require('cluster');
if (cluster.isMaster) {
    let worker = cluster.fork();
    worker.on('message', data => {
        console.log('主进程接收到消息：', data)
    })

    worker.send('hello worker')
} else {
    process.on('message', data => {
        console.log('工作进程接收到消息：', data)
    })

    process.send('hello master')
}
```

disconnect 事件
```
cluster.on('disconnect', worker => {
    console.log(`工作进程 #${worker.id} 已断开连接`)
})
```

超时的实现思想：在一个事件中加定时器和超时事件，另一个事件中清楚定时器
```
const cluster = require('cluster');
const http = require('http');
let timeout;
if (cluster.isMaster) {
    cluster.on('fork', worker => {
        timeout = setTimeout(() => {
            console.error('超时啦')
        }, 2000)
    });
    cluster.on('listening', worker => {
        clearTimeout(timeout);
        console.log('worker fork success:', worker.id);
    });
    cluster.fork();
} else {
    http.createServer().listen()
}
```

online: 工作进程上线通知
```
const cluster = require('cluster');
if (cluster.isMaster) {
    cluster.on('online', worker => {
        console.log('worker fork success:', worker.id);
    });
    cluster.fork();
}
```

setupMaster 修改默认的 fork 行为
```
1.js
const cluster = require('cluster');
cluster.setupMaster({
    exec: '1.1.js',
    args: ['--use', 'https'],
    silent: true
})
let worker = cluster.fork();
worker.on('message', data => {
    console.log('主线程收到消息：', data)
})

1.1.js
const cluster = require('cluster')
cluster.worker.send('i am 1.1')
```

cluster.settings
```
execArgv： 可执行文件的字符串参数列表
exec： 工作进程的文件路径
args： 传给工作进程的字符串参数
cwd： 工作进程当前工作目录
serialization：进程之间发送消息的序列化类型 json ｜ advanced
silent：是否发送输出到父进程的 stdio
```