import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "文档",
    icon: "fas fa-book",
    link: "/docs/",
  },
  {
    text: "开发者",
    icon: "fas fa-user-group",
    link: "/group",
  },
  {
    text: "QQ群",
    icon: "fas fa-comment",
    children: [
      {
        text: "1群",
        icon: "fas fa-comment-dots",
        link: "https://qm.qq.com/q/XJHolO55ue",
      },
      {
        text: "2群",
        icon: "fas fa-comment-dots",
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
        icon: "fas fa-link",
        link: "https://user.mslmc.net/",
      },
      {
        text: "MCSL",
        icon: "fas fa-link",
        link: "https://mcsl.com.cn/",
      },
      {
        text: "MSLX(InDev)",
        icon: "fas fa-link",
        link: "https://mslx.mslmc.cn/",
      },
      {
        text: "MSL纪念站",
        icon: "fas fa-link",
        link: "https://msdoc.nstarmc.cn/",
      },
    ],
  },
]);
