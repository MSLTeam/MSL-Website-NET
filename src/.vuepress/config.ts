import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "MSL帮助文档",
  description: "MSL帮助文档 powered by vuepress",

  theme,
  head: [
    // ...

    // 导入相应链接
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.proxy.ustclug.org", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.proxy.ustclug.org/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap",
        rel: "stylesheet",
      },
    ],
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
