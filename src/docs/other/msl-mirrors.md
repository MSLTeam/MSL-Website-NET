---
icon: cloud
---
# MSL服务端镜像源
```component VPBanner
title: 使用方法
content: MSL服务端镜像源支持MSL内使用，在线使用（MSL用户中心内），以及API调用
logo: https://bbs-static.miyoushe.com/static/2025/02/26/ef8c86003ce5397d98ecce574ffeed9e_5817017236091018001.png
actions:
  - text: 在线下载
    link: https://user.mslmc.net/download/serverCore
    
  - text: API文档 (Apiox)
    link: https://apidoc-v3.mslmc.cn/api-191469704
    type: default
```

## 简介

MSL服务端镜像源为`MSLTeam`自主研发的服务端镜像源同步系统，支持诸多常用的MC服务端，且会定期从各服务端官方API拉取更新。  

目前大部分服务端均在MSL服务器做了镜像，下载速度非常快~

部分服务端来自第三方源（如Forge端返回的是来自BMCL的下载地址）。

## MSL服务端镜像源API文档（概述版）

::: tip API信息
API端点地址：

```
https://api.mslmc.cn/v3
```
MSL-API-V3 通用返回格式:
```json
{
  "code": 200,
  "message": "",
  "data": ""
}
```

单IP QPS限制：中国大陆  `20 QPS` | 海外 `100 QPS`

请求API时请带上含有相应APP名字的`User-Agent`

:::

### 1.查询镜像源支持的服务端

`GET`

```
/query/available_server_types
```

返回服务端列表（数组），示例:

```json
{
  "code": 200,
  "message": "",
  "data": {
    "types": [
      "paper",
      "purpur"
    ]
  }
}
```

### 2.查询服务端支持的MC版本

`GET` `{server}`为服务端名字（从上一步获取到的）

```
/query/available_versions/{server}
```

返回支持的MC版本列表（数组），示例:

```json
{
  "code": 200,
  "message": "",
  "data": {
    "versionList": [
      "1.21.5",
      "1.21.4"
    ]
  }
}
```

### 3.查询特定MC版本的服务端下载地址
::: important 防滥用限制
本接口具有特殊的请求限制  
1小时: `20次`
1天: `50次`
:::

`GET` `{server}`为服务端名字 `{version}`为MC版本号

```
/download/server/{server}/{version}
```

返回下载地址链接和校验值（如果有），示例:

```json
{
  "code": 200,
  "message": "",
  "data": {
    "url": "https://file.mslmc.cn/servers/xxx/xxx.jar",
    "sha256": "933514c5ff8df47ab8fdb106ad435945bf6512702f9299cc66c4d173a1b7062x"
  }
}
```

::: warning 注意

并非所有服务端下载都会返回`sha256`这个key！

也有可能是这样的:

```json
{
  "code": 200,
  "message": "",
  "data": {
    "url": "https://file.mslmc.cn/mirrors/vanilla/xxx/server.jar"
  }
}
```

:::

### 其他API

我们还支持获取各服务端的简介，服务端分类，部分服务端支持下载不同的构建版本的api接口，这些请参考Apifox文档啦~

[MSL-API-V3 文档](https://apidoc-v3.mslmc.cn/api-191469704)