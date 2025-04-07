<template>
    <template v-if="!$user.token">
        <div class="setting-panel">
            登录即可享受多端同步
            <br />
            让您的资料永不丢失
        </div>
        <div class="setting-panel mt-5">
            <a class="link" @click="show = true">登陆/注册</a>
        </div>
    </template>
    <template v-else>
        <div class="setting-panel">
            <div :class="['setting-user flex items-center']" style="height: auto">
                <img
                    class="h-[36px] w-[36px] object-cover"
                    src="https://files.codelife.cc/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_92/format,webp"
                />
                <div class="user-info">
                    <p class="user-name">miraitowa</p>
                    <p class="user-email">miraitowa</p>
                </div>
            </div>
        </div>
        <div class="setting-panel mb-5 mt-5">
            <a class="link">修改信息</a>
        </div>
        <BackUpSet />
        <div class="setting-panel mt-5">
            <a class="link" style="color: rgb(251, 56, 56)" @click.stop="$user.outLogin">退出登录</a>
        </div>
    </template>
    <Login v-model:show="show"></Login>
</template>

<script lang="ts" setup>
import Login from "@/views/login/Index.vue";
import userStore from "@/stores/user";
import BackUpSet from "./BackUpSet.vue";
const $user = userStore();

const show = ref(false);
</script>
<style scoped lang="scss">
.setting-panel {
    line-height: 24px;
    a {
        text-decoration: none;
        color: #1890ff;
        display: block;
    }
    .link {
        &:hover {
            font-weight: 700;
        }
    }
}
.setting-user {
    position: relative;

    box-sizing: content-box;
    img {
        border-radius: 8px;
    }
    .user-info {
        margin-left: 0.5rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        line-height: 1.5;
        .user-name {
            font-size: 14px;
            font-weight: 700;
        }
        .user-email {
            color: var(--d-sub);
        }
    }
}
</style>
