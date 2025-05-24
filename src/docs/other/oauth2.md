---
icon: fas fa-arrow-right-to-bracket
---
# MSL OAuth 2.0
::: tip TIPS
此处介绍的开发者将自己的服务接入MSL统一身份验证（即MSL用户中心服务）第三方登录  
若您并不知道什么意思，那就别看啦~

:::

## 1.申请OAuth App

进入MSL用户中心-[OAuth App管理页面](https://user.mslmc.net/user/oauth) 点击添加应用

![image-20250518191948522](./assets/image-20250518191948522.png)

填写应用的名字，图标（推荐正方形，需要是可以外部访问的url地址），以及您的App的回调地址。

![image-20250518192149472](./assets/image-20250518192149472.png)

点击确定后，会返回您的App客户端ID以及密钥信息。
::: important 注意
请妥善保管您的密钥，密钥仅会显示一次。
后续若忘记密钥就只能重置了。
:::

![image-20250518192239600](./assets/image-20250518192239600.png)

![image-20250518193907252](./assets/image-20250518193907252.png)

::: info 审核
添加App后会进入待审核状态，请联系管理员审核。
否则App无法正常调用哦！
:::

## 2.OAuth流程
::: tip OAuth 2.0
[OAuth2](https://oauth.net/2/)  
MSL统一身份验证基于OAuth2的授权码模式规范设计  
若有出入，请联系反馈~
:::

### ①请求获取授权码（跳转MSL用户中心授权）

请求授权地址：

```
https://user.mslmc.net/oauth/authorize
```
查询参数:

| 参数         |              示例值               |       必需        |                             说明                             |
| ------------ | :-------------------------------: | :---------------: | :----------------------------------------------------------: |
| client_id    |    NeQ5v7T72vm4Yi6ADyYAW6m4eVK    |       必需        |                 客户端ID（第一步申请得到的）                 |
| state        |           SiGEWINNEQWQ            | 非必需 但强烈建议 | 随机字符串，防止CSRF，请求方应当生成并记录此字符串，用于后续验证 |
| redirect_uri | https://api.mslmc.cn/api/callback | 非必需 但强烈建议 | 登录成功后重新向的地址（一般是编码的地址），若不传此参数则读取App设置的URI地址 |

示例拼接地址:

```
https://user.mslmc.net/oauth/authorize?client_id=NeQ5v7T72vm4Yi6ADyYAW6m4eVK&state=SiGEWINNEQWQ&redirect_uri=https%3a%2f%2fapi.mslmc.cn%2fapi%2fcallback
```
::: warning 最小示例拼接地址
```
https://user.mslmc.net/oauth/authorize?client_id=NeQ5v7T72vm4Yi6ADyYAW6m4eVK
```
但是**不建议**这么做，缺少`state`参数可能会导致一些风险哦~
:::

若地址正确，访问后应该是如下页面:

![image-20250518194152354](./assets/image-20250518194152354.png)

### ②使用授权码交换AccessToken

登录成功后，MSL用户中心将根据填写的App回调地址重定向并添加`code`和`state`参数（方法是GET）
::: tip
`code`有效期只有10分钟。
:::

MSL用户中心授权成功的重定向示例:

```
https://api.mslmc.cn/api/callback?code=y94vzbhskzcizEDmJMbWt775tbI&state=iGEWINNEQWQ
```

您的客户端接收到回调后应该核对`state`是否与请求时的一致，若不一致，请拒绝登录请求。

然后需要用拿到的code通过api交换得到AccessToken

POST `application/x-www-form-urlencoded` 或者 `application/json`

```
https://user.mslmc.net/api/oauth/exchangeAccessToken
```

| 参数          | 示例值                      | 说明                       |
| ------------- | --------------------------- | -------------------------- |
| code          | y94vzbhskzcizEDmJMbWt775tbI | 回调拿到的授权码           |
| client_id     | NeQ5v7T72vm4Yi6ADyYAW6m4eVK | 您在第一步申请的客户端ID   |
| client_secret | FAOFoGDPtTK8Yudlerv...      | 您在第一步申请的客户端密钥 |

返回示例:

```
{
  "code": 200,
  "msg": "授权成功",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTc0NzU1NzY3MiwiZXhwIjoxNzQ3NTYxMjcyfQ.iyX0dIXxrUkr6Dg7HCZ7YNQb2G1u5EYpzh-6wKYJShg",
  "expires_in": 3600,
  "token_type": "Bearer",
  "scope": "user_info"
}
```

获取到`access_token`即可

此api文档: [获取Access Token - MSL-User-System](https://apidoc-user.mslmc.cn/297247077e0)

### ③获取用户信息

GET

```
https://user.mslmc.net/api/oauth/user
```

需要添加`Authorization`请求头

在 Header 添加参数 Authorization，其值为在 Bearer 之后拼接 Token
示例: 

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTc0NzU1NzY3MiwiZXhwIjoxNzQ3NTYxMjcyfQ.iyX0dIXxrUkr6Dg7HCZ7YNQb2G1u5EYpzh-6wKYJShg
```

返回示例:

```
{
  "code": 200,
  "msg": "获取用户信息成功",
  "uid": 1,
  "username": "小可爱",
  "email": "user@mslmc.cn",
  "qq": null,
  "score": 1500,
  "avatar": "https://cravatar.cn/avatar/d31946d60f6051840edc9d41a1261?d=identicon&s=640",
  "regTime": 1737992780,
  "lastLoginTime": 1745988703,
  "permission": 1,
  "realName": false,
  "lastCheckInTime": null,
  "twoFactorAuth": true
}
```

请使用`uid`字段作为判断用户绑定的参数，这是每位用户唯一的ID，且不会变化。

其他的信息按需使用/更新即可。

此api文档: [获取用户信息 - MSL-User-System](https://apidoc-user.mslmc.cn/297251390e0)

## 3.快速接入MSL登录

### # 接入到WordPress

使用此插件: [Releases · luluxiaoyu/MSL-OAuth2-WordPress](https://github.com/luluxiaoyu/MSL-OAuth2-WordPress/releases)

下载zip，并在您的wordpress上安装并启用插件。

![image-20250519124130518](./assets/image-20250519124130518.png)

在插件设置填写OAuth App信息:

![image-20250519124318341](./assets/image-20250519124318341.png)

回调地址要填写到OAuth App信息中

![image-20250519124415802](./assets/image-20250519124415802.png)

两边的信息配置好后，即可进入个人资料页面绑定MSL账户，绑定后即可使用MSL账户快速登录~

![image-20250519124520689](./assets/image-20250519124520689.png)