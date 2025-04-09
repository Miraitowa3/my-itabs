/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'lunar-calendar';

declare global{
    interface Window {
        define: any;
    }
}
export {};
