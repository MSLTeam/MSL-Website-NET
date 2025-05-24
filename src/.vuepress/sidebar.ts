import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "使用文档",
      icon: "laptop-code",
      prefix: "docs/",
      link: "docs/",
      children: ["start","server-config","frp","p2p","config","launch_bds","package","faq","neoforge_foge","server_crash"],
    },
    {
      text: "其它文档",
      icon: "angles-right",
      prefix: "docs/other/",
      link: "docs/other/",
      children: ["choose-server-tips","oauth2","use-linux"],
    },
    {      text: "团队成员",
    icon: "address-card",
    link: "/group",
    children: [],
    },
    {
      text: "用户使用协议",
      icon: "circle-info",
      link: "/eula",
    },
  ],
});
