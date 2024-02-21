import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "文档",
    icon: "book",
    link: "/docs/",
  },
  {
    text: "团队",
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
        text: "MSLX",
        link: "https://mslx.fun/",
      },
      {
        text: "MCSL",
        link: "https://mcsl.com.cn/",
      },
    ],
  },
]);
