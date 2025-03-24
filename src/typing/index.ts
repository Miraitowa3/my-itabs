/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2025-03-19 18:54:24
 * @LastEditors: lyq
 * @LastEditTime: 2025-03-23 01:47:54
 * @FilePath: /mTab/my-itabs/src/typing/index.ts
 */
export interface IconType {
    iconLayout: string;
    iconRadius: number;
    iconSize: number;
    iconX: number;
    iconY: number;
    name: number;
    nameColor: string;
    nameSize: number;
    opactiy: number;
    startAnimation: boolean;
    unit: string;
    width: number;
    xysync: boolean;
}
export interface SidebarType {
    autoHide: boolean;
    lastGroup: boolean;
    mouseGroup: boolean;
    opacity: number;
    placement: string;
    width: number;
}
export interface LayoutType {
    view: string;
    yiyan: boolean;
}
export interface OpenType {
    iconBlank: boolean;
    searchBlank: boolean;
}
export interface SearchType {
    bgColor: number;
    height: number;
    history: boolean;
    radius: number;
    show: boolean;
    translate: string;
    translateHide: boolean;
}
export interface TimeType {
    color: string;
    font: string;
    fontWeight: string,
    hour24: string,
    lunar:string,
    month: string,
    sec: string,
    show: boolean,
    size: number,
    week: string,
    [key: string]: any;
};
