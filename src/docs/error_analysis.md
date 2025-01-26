# 常见错误分析

> [!TIP]
>
> 本篇教程由第三方提供维护
>
> 没有人在开服的路上是一帆风顺的，这时候学会分析报错往往是你得到解决问题的重要方法。
>
> 那么问题来了：小白不会错误分析怎么办？
>
> 别担心，这篇文档会教你一些基础的错误分析。
>
> 如果你认为这些报错中没有提到你经常遇到的，请[点击这里](https://github.com/Yuyi-Oak/MSL-Website-Modified/issues)发起Issue。

------

### 1. Forge/NeoForge/Fabric 发生核心"Main"错误，提示更换Java后仍无法开服

错误原因：在安装过程中发生错误

解决办法：

① 如果是Forge/NeoForge服务端出现此问题，优先更换插件模组混合服务端。

② 如果是Fabric服务端出现此问题，请尝试使用“科学上网”工具，还是不行就是玄学问题了。

### 2. 插件服务端提示"`Could not load [路径] in ‘plugins'`"并且在详细的提示中输出了"`Unknown/missing dependency plugins: [前置插件]. Please download ... ... to run '插件名'` "等类似错误

错误原因：该无法加载的插件缺少它的前置插件

解决办法：下载[前置插件]并加载

### 3. 模组服务端提示"`Missing or unsupported mandatory dependencies: Mod ID: '[前置模组]', Requested by: '[模组名称]', Expected range: '[***]', Actual version: '[MISSING]'`"

错误原因：模组缺少前置导致无法正常加载

解决办法：下载[前置模组]并加载

### 4. Java报错：`Unrecognized option: [问题参数]`

错误原因：添加的参数不正确

解决办法：删除参数或检查并改正参数

### 5.Forge/Forge混合端提示" `Missing Mods: Mod ID: '[Forge]', Requested by: '[模组名称]', Expected range: '[预期版本号]', Actual version: '[实际版本号]'`"

错误原因：模组预期/服务端Forge版本过低或过高

解决办法：

① 更换还在继续维护的 (即最近更新的) 服务端

② 使用工具打开服务端Jar包并更改下载的Forge版本（小白不建议使用；部分服务端会出现Class报错）

### 6. SpongeForge服务端在报错中提到"`SpongeForge(spongeforge) has failed to load correctly`"

错误原因：安装过程中出现错误

解决办法：重新安装SpongeForge服务端或使用其他的Forge模组插件混合端

