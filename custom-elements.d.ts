
// 自定义元素的定义
interface ItabWallpaperssss extends HTMLElement {
    url: string; // 图片地址
}

// custom-elements.d.ts


declare global {
  interface Window {
    'itab-wallpaper': ItabWallpaper;
  }

  interface Document {
    createElement(tagName: "itab-wallpaper"): ItabWallpaper;
  }

  interface HTMLElementTagNameMap {
    "itab-wallpaper": ItabWallpaper;
  }
}

export {};
