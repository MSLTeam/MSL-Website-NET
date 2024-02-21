import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "文档",
    icon: "book",
    link: "/docs/start",
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
    text: "Vitepress版本",
    icon: "more",
    link: "https://mslx.fun/msl"
  }
]);
