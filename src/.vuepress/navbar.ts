import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "文档",
    icon: "book",
    link: "/docs/",
  },
  {
    text: "开发者",
    icon: "user-group",
    link: "/group",
  },
  {
    text: "QQ群",
    icon: "comment",
    children: [
      {
        text: "1群",
        icon: "comment-dots",
        link: "https://qm.qq.com/q/XJHolO55ue",
      },
      {
        text: "2群",
        icon: "comment-dots",
        link: "https://qm.qq.com/q/iQs8kpW7Ti",
      },
    ],
  },
  {
    text: "友情链接",
    icon: "link",
    children: [
      {
        text: "MSL用户中心",
        icon: "link",
        link: "https://user.mslmc.net/",
      },
      {
        text: "MCSL",
        icon: "link",
        link: "https://mcsl.com.cn/",
      },
      {
        text: "MSLX(InDev)",
        icon: "link",
        link: "https://mslx.mslmc.cn/",
      },
      {
        text: "MSL纪念站",
        icon: "link",
        link: "https://msdoc.nstarmc.cn/",
      },
    ],
  },
]);
