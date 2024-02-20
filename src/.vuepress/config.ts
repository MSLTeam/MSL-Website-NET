import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "MSL帮助文档",
  description: "MSL帮助文档 powered by vuepress",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
