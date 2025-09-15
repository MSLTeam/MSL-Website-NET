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
    text: "QQ交流群",
    icon: "b:qq",
    children: [
      {
        text: "1群(可能满人)",
        icon: "comment-dots",
        link: "https://qm.qq.com/q/TZRpqXr2qm",
      },
      {
        text: "2群(空位较多)",
        icon: "comment-dots",
        link: "https://qm.qq.com/q/3JgcVlG9dC",
      },
      {
        text: "闲聊群",
        icon: "message",
        link: "https://qm.qq.com/q/db97QbwzGo",
      },
    ],
  },
  {
    text: "更新日志",
    icon: "paper-plane",
    link: "/change-logs",
  },
  {
    text: "友情链接",
    icon: "link",
    link: "/friend-links"
  },
]);
