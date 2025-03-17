<template>
  <div class="wxchat-login text-center">
    <img class="wechat-logo" src="@/assets/img/wechat.svg"></img>
    <p class="wxchat-title">微信登录</p>
    <div class="wxchat-qrcode relative inline-block" v-loading="loading" element-loading-background="#000c">
      <div class="saomiao" ref="saomiao" v-if="codeUrl"></div>
      <i class="wechat-qrcode-refresh flex justify-center items-center " v-if="!codeStatus && !loading"
        @click.stop="getQrcode">
        <svg-icon name="refresh"></svg-icon>
      </i>
      <img alt="加载二维码" :src="codeUrl" class="el-image__inner" v-if="codeUrl">
    </div>
    <p class="ac mb-5"> 打开微信 <b calss="b">扫一扫</b>， <b calss="b">关注公众号</b>后即可登录/注册 </p>
  </div>
</template>

<script lang="ts" setup>
import { getWxCode, wxLogin } from "@/api/login";
import userStore from "@/stores/user";
const saomiao = ref<HTMLDivElement>();
const codeUrl = ref<string>();
const ticket = ref<string>();
const timer = ref<NodeJS.Timeout>();
const curTimer = ref<number>(0);
const expireTime = ref<number>(0);
const loading = ref<boolean>(false);
const timerInterval = ref<NodeJS.Timeout>();
const $user = userStore();
const emits = defineEmits(['close'])
function getQrcode() {
  if (loading.value) {
    return;
  }
  loading.value = true;
  getWxCode().then((res: any) => {
    loading.value = false;
    codeUrl.value = res.data.url;
    ticket.value = res.data.ticket;
    expireTime.value = res.data.expire_seconds;

    timer.value = setInterval(() => {
      curTimer.value = Date.now() + 1000;

    }, 1000);
    nextTick(() => {
      saomiao.value!.addEventListener('animationend', () => {
        saomiao.value!.style.display = 'none';
      });
    })
  })
}
getQrcode()

const codeStatus = computed(() => {
  if (curTimer.value > expireTime.value) {
    if (timer.value) {
      clearInterval(timer.value);
    }
    codeUrl.value = '';
    ticket.value = '';
    return false;
  } else {
    return true;
  }

})

watch(() => ticket.value, (newVal, oldVal) => {
  if (ticket.value) {
    timerInterval.value = setInterval(() => {
      wxLogin({ ticket: ticket.value }).then((res: any) => {

        if (res.code === 200) {
          if (res.data.sucess) {
              $user.setToken(res.data.token)
            clearInterval(timerInterval.value);

             ElMessage({
            type: 'success',
            message: '登录成功',
            onClose: () => {
            emits('close')

            }
          })


          }


        } else {
          ElMessage.error('登录失败，请重试');
        }

      });
    }, 2400);

  }
})

onMounted(() => {
  // saomiao.value!.addEventListener('animationend', () => {
  //   saomiao.value!.style.display = 'none';
  // });
});
onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});

</script>
<style scoped>
.wxchat-login {
  margin-top: 10px;
  width: 100%;

}

.wechat-logo {
  width: 40px;
  height: 40px;
  display: inline-block;
}

.wxchat-title {
  font-size: 14px;
  color: #606266;
  margin-top: 2px;

}

.wxchat-qrcode {

  width: 240px;
  height: 240px;
  overflow: hidden;
}

.ac {
  font-size: 14px;
  color: #606266;
}

.saomiao {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 200px;
  height: 40px;
  background: linear-gradient(rgba(0, 255, 51, 0) 43%, #00ff33 211%);
  animation: move 3.5s ease-in-out 2;

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

.wechat-qrcode-refresh {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 50px;
  cursor: pointer;
  background: #000c;
  z-index: 10;


}
</style>
