import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "MSL使用文档",
      icon: "laptop-code",
      prefix: "docs/",
      link: "docs/",
      children: ["start", "server-config", "frp", "p2p", "config","yggdrasil", "launch-bds", "package","choose-server-tips","neoforge-forge","faq", "server-crash"],
    },
    {
      text: "其它文档",
      icon: "angles-right",
      prefix: "docs/other/",
      link: "docs/other/",
      children: ["msl-skin","msl-mirrors", "oauth2", "use-linux"],
    },
    {
      text: "更新日志",
      icon: "paper-plane",
      link: "/change-logs",
    },
    {
      text: "团队成员",
      icon: "address-card",
      link: "/group",
    },
    {
      text: "友情链接",
      icon: "link",
      link: "/friend-links",
    },
    {
      text: "用户使用协议",
      icon: "circle-info",
      link: "/eula",
    },
  ],
});
