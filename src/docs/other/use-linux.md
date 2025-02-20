# 如何在Linux中开服

> [!IMPORTANT]
>
> 由于MSL暂时不支持Linux，所以本教程适合有一些基础的用户使用

很多小伙伴都在云服务商购买了云`服务器用来开服，但是有的时候只能安装Linux系统，这时候无法使用MSL，我们应该怎么开服呢？

**别着急！这篇教程会帮到你！**

教程所使用的服务器系统：Ubuntu 22.04.1 LTS x64 amd64

------

#### 1. 准备开始

一般来说我们可以使用SSH进行远程连接，具体操作可以看[这里](https://blog.csdn.net/li528405176/article/details/82810342)



#### 2. 信息确认

确认操作系统发行版信息（因为本篇教程只在基于Debian的发行版下可行）：`cat /etc/issue`

更新软件包：`sudo apt update && sudo apt upgrade -y`



#### 3. 安装Java

安装Java有很多种方法，而且OpenJDK也有许多不同的发行版本，这里只提到**Oracle Java**和**Zulu JDK**，并且都使用**dpkg**安装。在以下教学中如果你复制的链接是下载**.deb**后缀，但是实际文件并不是，请使用`cp [原文件名] [更改后文件名]`进行更正，具体只需要将正确后缀后以"?"开头的部分删除。

1）Oracle JDK

[Oracle JDK下载界面](https://www.oracle.com/cn/java/technologies/) | [Java8下载界面](https://www.java.com/zh-CN/download/manual.jsp) 

将对应版本的下载链接复制（注意应是**.deb**后缀），然后进入到SSH界面，使用命令 `wget [下载链接]`或 `curl -O [下载链接]` 将对应的软件包下载，使用命令 `sudo dpkg -i [文件名]` 进行安装，如果不知道文件名具体是什么，可以使用 `ls`  命令查看。

如果你需要Java 8，你需要下载**.tar.gz**后缀的文件，请使用 `sudo tar -zxvf 文件名 -C /usr/lib/jvm`将文件解压。

*如果你购买的云服务器内存不太大，你可以使用`sudo rm [文件名]`删除下载的文件。*

------

2）Zulu JDK

[Zulu JDK下载](https://www.azul.com/downloads/?package=jdk#zulu)

下拉，在**Java Version**选择你所需要的版本，在**Operating System**选择你的系统，在**Architecture**选择**x86 64bit**，在**Java Package**选择**JDK**，点击**Download**并选择**.deb**选项，复制下载链接并进入SSH界面，使用命令`wget [下载链接]` 将对应的软件包下载，使用命令`sudo apt install java-common -y`安装依赖，使用命令`sudo dpkg -i [文件名]`进行安装，如果不知道文件名具体是什么，可以使用 `ls`  命令查看。

*如果你购买的云服务器内存不太大，你可以使用`sudo rm [文件名]`删除下载的文件。*

#### 4. 开服前的一些准备

新建一个文件夹并进入：`mkdir myserver && cd myserver`

连接SFTP，这里使用WinSCP进行演示

![](.\assets\winscp_1.png)

在**主机名**填写你SSH连接所使用的地址，在**端口**填写你连接时使用的端口（如果云服务器商没有特别说明即为22），在**用户名**填写你SSH连接时所使用的用户名，**密码**填写什么应该不用多说了吧。然后点击登录进入SFTP界面。

![](.\assets\winscp_2.png)

在左侧选择你提前准备好的服务端（图片中没有提到，如果需要更改路径点击左上角的白色框即可），然后拖入右侧的框中，即可进行上传。

![](.\assets\winscp_3.png)

**仔细阅读[EULA | Minecraft Minecraft 最终用户许可协议 (“EULA”)](https://www.minecraft.net/zh-hans/eula)。如果你继续下面的步骤，即视为你已同意Minecraft 最终用户许可协议 (“EULA”)且不违反相关条例！**

回到SSH界面，在目录下使用命令`nano eula.txt`并输入`eula=true`，随后按下Ctrl+X快捷键，会提示`Save modified buffer? `，输入`Y`并按下回车，再次按下回车，完成对eula的确认。

#### 5. 确定脚本内容

在SSH界面，使用命令`nano start.sh`编辑启动脚本，在脚本中输入如下内容：

```sh
#!/bin/sh

screen -dmS myserver java -Xms256m -Xmx512m -jar minecraft_server.1.12.jar nogui
```

**代码块中的一些说明：**

① "java"，默认使用云服务器上安装的最新Java，如果需要使用其他版本的Java请指定路径。举例：

```sh
#!/bin/sh

screen -dmS myserver "/usr/lib/jvm/jdk-21.0.5-oracle-x64" -Xms256m -Xmx512m -jar minecraft_server.1.12.jar nogui
```

② "-Xms256m"与"-Xmx512m"，分别指服务器可使用的最小内存与最大内存，如需更改只需更改数字内容，单位默认mb。

③ "minecraft_server.1.12.jar"，传输的服务端的名称，不知道可以使用`ls`命令查看。

根据自身情况更改后保存并退出，输入`nano stop.sh`编辑关服脚本，输入以下内容：

```sh
#!/bin/sh

screen -dr myserver -X stuff "say 服务器将在10s后关闭! \n"
sleep 10
screen -dr myserver -X stuff "stop\n"
```

**代码块中的一些说明：**

① 第三行中`stuff`后是在Minecraft服务器中执行的命令，以便提示玩家即将关服，如果没有需求可以删去。

② 第四行中与第三行中提示词有关，会在10秒后执行关服，如需更改时间，只需要替换数字，单位为秒。

根据自身情况更改后保存并退出。

#### 6. 开服！

执行命令`bash start.sh`开服

执行命令`bash stop.sh`关服

进入服务器后台需要先执行命令`screen -ls`，找到一个和**myserver**有关的信息，在它的前面有一段数字，将其完整复制并输入`screen -r ****.myserver`即可进入后台，想要退出需要按下快捷键**Ctrl+A+D**

下面是一段示例
```shell
（输入）screen -ls
（输出的主要字符）12345.myserver [时间] [状态]
（输入）screen -r 12345.myserver
（进入后台）
```
#### <u>7. (可选) 配置开机自启</u>

首先你需要确定你拥有管理员权限，随后输入
```shell
cd /etc/systemd/system 
nano myserver.service
```

在打开的窗口中输入
```shell
[Unit]
Description=MyServer
After=network.target

[Service]
User=root
Restart=on-failure
RestartSec=5s
WorkingDirectory=/myserver
ExecStart=bash start.sh

[Install]
WantedBy=multi-user.target
```

按下**Ctrl+X**并输入**Y**保存

接下来是设置开机自启的命令，包括手动开启，手动关闭，解除开机自启和查看状态。
```shell
# 手动开启
sudo systemctl start myserver
# 查看状态
sudo systemctl status myserver
# 手动关闭
sudo systemctl stop myserver
# 开机自启
sudo systemctl enable myserver
# 解除开机自启
sudo systemctl disable myserver 
```

## <u>最后祝所有人开服顺利！</u>

