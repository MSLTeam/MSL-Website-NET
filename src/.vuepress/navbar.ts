import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "文档",
    icon: "book",
    link: "/docs/",
  },
  {
    text: "加入QQ群",
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
    text: "MSL Github",
    icon: "code-merge",
    link: "https://github.com/MSLTeam/MSL",
  },
]);
