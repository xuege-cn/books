## Deno+ffmpeg+ossutil实现视频处理上传

[下载包](deno-mc.zip)

### 关于跳板机
跳板机的登陆   
```
ssh qiangxu@jump.yuceyi.com -p 2222
密码：lo*********

测试环境：ORG-test-node-web-02
预发环境：ORG-pre-node-web-01
```   

#### 测试机器目录
```
/home/admin/apps：项目目录
/home/admin/opt：cmd命令集
/home/admin/source：第三方资源，比如ffmpeg源文件就在这
```

### Deno运行环境配置

#### 一份sh跑多个场景
```
#!/bin/bash

if ! [[ -x "$(which deno)" ]]; then
  if ! [[ -x "$HOME/.deno/bin/deno" ]]; then
    curl -fsSL https://deno.land/x/install/install.sh | sh
  fi

  export PATH=$HOME/.deno/bin:$PATH
fi

case $1 in
  start)
    "$(which deno)" run \
      --allow-all \
      $2
    ;;
  bundle)
    "$(which deno)" bundle \
      --unstable \
      $2 $3
    ;;
  stop)
    echo 'stop'
    ;;
esac
```   

#### 如何停止程序
目前没有如node的process处理，停止程序需要手动杀：
```
pkill -9 deno
```

#### owl配置
1. 构建模式：NPM(js npm构建)
2. 部署模式：NODE_JS(推送部署包并执行node启动脚本)   

#### 跨域处理
```
import { oakCors } from 'https://deno.land/x/cors/mod.ts'
app.use(oakCors())
```   


### ffmpeg

ffmpeg源码包下载：
```
https://ffmpeg.org/download.html
```   

#### ffmpeg参数设置
为啥要设置ffmpeg？比如你如果要进行视频libx264编码，那么不进行参数设置，会抱unknown encoder libx264的错误❌   
如果设置呢？拿测试环境举例：   
```
<!-- 找到ffmpeg源文件 -->
cd /home/admin/source/ffmpeg

<!-- 设置参数 -->
第一步： ./configure --prefix=/usr/local --disable-debug --enable-shared --enable-gpl --enable-nonfree --enable-postproc --enable-swscale --enable-pthreads --enable-x11grab --enable-libx264 --enable-libxvid --enable-libvorbis --enable-libfaac --enable-libmp3lame

<!-- 打包 -->
第二步：make

<!-- 安装 -->
第三步：sudo make install
```   

✅ 完成这三步之后，可以在/home/admin/opt/ffmpeg/bin下找到三个：ffmpeg等   

那么目前命令在opt下，而并不在usr/lcoal，所以命令行直接运行ffmpeg，会发现是找不到的   

#### ffmpeg软连接   
```
sudo ln -s /home/admin/opt/ffmpeg/bin/ffmpeg /usr/local/bin/ffmpeg
```   
软链之后，在命令行再次运行可以发现ffmpeg指令已经生效   

#### ffmpeg命令行
命令行主要是执行什么呢？   
```
/usr/local/bin/ffmpeg -i uploads/2.mp4 -c:v libx264 -c:a aac -s 800x800 uploads/ffmpeg.mp4
```   
就是跑这么一行，就完事了，ffmpeg.ts实例的主要功能也就是组装这一行命令


### ossutil

下载ossutil:   
1. wget http://gosspublic.alicdn.com/ossutil/1.6.17/ossutil64   
2. chmod 755 ossutil64
3. ./ossutil64 config   

config设置key等：
```
AccessKey： 
accessKeySecret： 
bucket：cf-mc
endpoint：oss-cn-hangzhou.aliyuncs.com
region: oss-cn-hangzhou
stsToken: // 不填，直接回车
```

#### ossutil命令
```
./ossutil64 cp uploads/2.mp4 oss://cf_mc/1.mp4
```   

### 总结
- 1.视频处理之后，体积增大一倍，上传11M，处理完的文件22M
- 2.ossutil上传速度很慢，21KB/S的上传速度，22M需要上传18分钟
- 3.视频变形只能等比变形，比如500x400，变形800x800，变形之后的结果是1000x800
- 4.oakserver/oak
  - 4.1bug：在调用了await之后，ctx.response.body赋值会提示：response is not writable.
  - 4.2issue：https://github.com/oakserver/oak/pull/156 

