import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Minecraft Server Launcher",
  description: "Minecraft Server Launcher(MSL)",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
