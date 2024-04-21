import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Minecraft Server Launcher",
  description: "Minecraft Server Launcher(MSL)",

  theme,
  head: [
    ["script", { async: true, src: "https://www.googletagmanager.com/gtag/js?id=G-SR9D9TXKVJ" }],
    ["script", {}, 
    `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-SR9D9TXKVJ');
    `
    ],
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
