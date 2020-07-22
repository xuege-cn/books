### 阿里云EcsRamRole文件上传

其实相对来说aliyun-cli的github文档已经说的很明白了   
我总结了下总共需要如下几步：   
1. 创建角色
2. 分配角色权限
3. 角色关联实例
4. CLI配置
5. CLI文件上传   

#### 角色创建
1. 进入云服务ECS控制台
2. 搜索并进入RAM控制台
3. 找到RAM角色管理 -> 创建RAM角色

#### 分配角色权限
分配权限，我是分配了4个系统权限：   
1. AdministratorAccess
2. AliyunOSSFullAccess
3. AliyunVPCFullAccess
4. AliyunECSNetworkInterfaceManagementAccess

还有一个自定义权限：EcsRamRole
```
{
    "Version": "1",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecs: [ECS RAM Action]",
                "ecs: CreateInstance",
                "ecs: AttachInstanceRamRole",
                "ecs: DetachInstanceRAMRole"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": "ram:PassRole",
            "Resource": "*"
        }
    ]
}
```   

#### 角色关联实例
在云服务器ECS控制台，左边菜单栏找到实例 -> 在实例列表右边👉更多 -> 实例设置 -> 授予RAM角色   
授予刚创建的角色，比如名称叫xiba

#### CLI配置
```
aliyunmac configure --profile ecsRamRoleProfile --mode EcsRamRole
Ecs Ram Role []: xiba
Default Region Id [cn-hangzhou]: cn-hangzhou
Default Language [zh|en] en: en
```   

这个配置如果在本地执行，会报100.100.100.200的timeout，因为这是专有网络，本地是访问不到的，需要登陆ECS实例才能访问，用人话说就是：需要登陆到阿里云服务器去执行

#### CLI文件上传
```
./aliyun oss cp ./mp4/3.mp4 oss://cf-mc-1/3.mp4
```   
如成就能上传成功了