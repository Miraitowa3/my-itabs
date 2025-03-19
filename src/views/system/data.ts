import type{ DefineComponent } from 'vue'
 import IconSet from '@/views/system/components/IconSet.vue'
 import LayoutSet from '@/views/system/components/LayoutSet.vue'
 import SiderSet from '@/views/system/components/SiderSet.vue'

type AsideItem = {
    name: string;
    icon: string;
    component:  DefineComponent | null;
    top:number
    tip:string
}
export const  asideList: AsideItem[]=[
      {
        name: "登录/注册",
        icon: '',
        tip:'个人信息',
        component: null,
        top:0
    },
    {
        name: "打开方式",
        icon: new URL('@/assets/svg/setting/icon_open.svg',import.meta.url).href,
        tip:'图标、搜索结果 ',
        component: null,
        top:0
    },
        {
        name: "搜索栏",
        tip:'搜索栏样式、翻译',
        icon:  new URL('@/assets/svg/setting/icon_search.svg',import.meta.url).href,
        component: null,
        top:0


    },
    {
        name: "图标",
        tip:'图标样式、图标间距、宽度',
        icon:  new URL('@/assets/svg/setting/icon_icon.svg',import.meta.url).href,
        component:markRaw(IconSet),
        top:0


    },
    {
        name: "时间/日期",
        tip:'时间显示内容、字体样式',
        icon: new URL('@/assets/svg/setting/icon_time.svg',import.meta.url).href ,
        component: null,
        top:0

    },
       {
        name: "主题/壁纸",
        tip:'深色模式、主题色',
        icon: new URL('@/assets/svg/setting/icon_wallpaper.svg',import.meta.url).href ,
        component: null,
        top:0

    },   {
        name: "布局",
        tip:'极简模式、一言',
        icon: new URL('@/assets/svg/setting/icon_layout.svg',import.meta.url).href ,
        component:markRaw(LayoutSet) ,
        top:0

    },
       {
        name: "侧边栏",
        tip:'侧边栏位置、是否隐藏、宽度',
        icon: new URL('@/assets/svg/setting/icon_sidebar.svg',import.meta.url).href,
        component: markRaw(SiderSet),
        top:0

    },
       {
        name: "备份与恢复",
        tip:'数据保存至云端，享受多设备同步',
        icon: new URL('@/assets/svg/setting/icon_backup.svg',import.meta.url).href ,
        component: null,
        top:0

    },   {
        name: "重置设置",
        tip:'恢复成默认设置',
        icon: new URL('@/assets/svg/setting/icon_reset.svg',import.meta.url).href,
        component: null,
        top:0

    },
    //  {
    //     name: "关于",
    //     tip:'版本：1.5.23',
    //     icon: new URL('@/assets/svg/setting/icon_about.svg',import.meta.url) .href,
    //     component: null,
    //     top:0

    // }, {
    //     name: "实验功能",
    //     tip:'实验功能',
    //     icon: new URL('@/assets/svg/setting/icon_experiment.svg',import.meta.url).href ,
    //     component: null,
    //     top:0

    // },
]
