<template>
    <div class="wxchat-login text-center" >
      <img class="wechat-logo" src="@/assets/img/wechat.svg"></img>
      <p class="wxchat-title">微信登录</p>
      <div class="wxchat-qrcode relative inline-block">
        <div class="saomiao" ref="saomiao"></div>
        <img alt="加载二维码" src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQEp8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAycEZMX2RGdURmUkUxRVE0Z05EMWsAAgQUaJBnAwQgHAAA" class="el-image__inner">
      </div>
      <p  class="ac mb-5"> 打开微信 <b  calss="b">扫一扫</b>， <b calss="b">关注公众号</b>后即可登录/注册 </p>
    </div>
</template>

<script lang="ts" setup>
const saomiao=ref<HTMLDivElement>();

onMounted(() => {
  saomiao.value!.addEventListener('animationend', () => {
    saomiao.value!.style.display = 'none';
});
});
</script>
<style scoped>
.wxchat-login{
  margin-top: 10px;
  width: 100%;

}
.wechat-logo{
  width: 40px;
  height: 40px;
  display: inline-block;
}
.wxchat-title{
  font-size: 14px;
  color: #606266;
  margin-top: 2px;

}
.wxchat-qrcode{

    width: 240px;
    height: 240px;
    overflow: hidden;
}
.ac{
  font-size: 14px;
  color: #606266;
}
.saomiao{
  position: absolute;
  top: 20px;
  left: 20px;
  width: 200px;
  height: 40px;
    background: linear-gradient( rgba(0, 255, 51, 0) 43%, #00ff33 211%);
   animation: move 3.5s ease-in-out  2;

}
 @keyframes move {
          from {
          transform: translateY(-30px);
          }
          /*网格移动到显示区域的外面*/
          to {
             transform: translateY(160px);
          }
        }

</style>
