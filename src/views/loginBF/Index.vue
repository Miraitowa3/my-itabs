<template>
    <Teleport to="body">
        <itab-wallpaper :url="url"> </itab-wallpaper>
    </Teleport>
    <div class="fixed left-0 top-0 z-[2] flex h-screen w-screen items-center justify-center overflow-hidden">
        <Transition name="custom-fade" enter-active-class="animate__animated animate__bounceInRight" leave-active-class="animate__animated animate__bounceOutRight">
            <div class="login relative flex" v-if="cs">
                <Login :show="show"></Login>
                <Registry :show="show"></Registry>
                <div class="container__overlay" :class="{ bb: !show }">
                    <!-- , 'background-position': `${!show ? info.s : info.t}px ${info.top}px` -->
                    <div class="overlay" :class="{ cc: show }">
                        <div class="bgc" :style="{ background: `url(${url})` }"></div>
                        <div class="overlay__panel overlay--left">
                            <div class="btn" id="signIn" @click="show = true">Sign In</div>
                        </div>
                        <div class="overlay__panel overlay--right">
                            <div class="btn" id="signUp" @click="show = false">Sign Up</div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
<script lang="ts" setup>
import Login from "./Login.vue";
import Registry from "./Registry.vue";
const url = ref("https://raw.gitcode.com/snows_l/blog_assets/raw/master/imgs/bg/34.png");
const timer = ref<NodeJS.Timeout>();
const show = ref(true);
const Max_INDEX = 100;
const Min_INDEX = 1;
let cur = Min_INDEX;
const cs = ref(false);
const info = ref<any>({
    left: 0,
    top: 0,
});

function changeWallpaper() {
    cur++;
    if (cur > Max_INDEX) {
        cur = Min_INDEX;
    }
    url.value = `https://raw.gitcode.com/snows_l/blog_assets/raw/main/imgs/bg/${cur}.png`;
}

onMounted(() => {
    setTimeout(() => {
        cs.value = true;
    }, 1000);
    // timer.value = setInterval(changeWallpaper, 1000 * 60 * 20);
    const signIn = document.querySelector("#signIn");
    const sigloginnUp = document.querySelector(".login");

    info.value = sigloginnUp?.getBoundingClientRect();

    const signUp = document.querySelector("#signUp");
    signIn?.addEventListener("click", () => {});
    signUp?.addEventListener("click", () => {});
});

onUnmounted(() => {
    clearInterval(timer.value);
});
</script>
<style scoped>
:root {
    /* COLORS */
    --white: #e9e9e9;
    --gray: #333;
    --blue: #0367a6;
    --lightblue: #008997;

    /* RADII */
    --button-radius: 0.7rem;

    /* SIZES */
    --max-width: 758px;
    --max-height: 420px;

    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.login {
    width: 758px;
    height: 420px;
    background-color: #fff;
    box-shadow:
        0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
        0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    border-radius: 20px;
}
.overlay {
    background-color: var(--lightblue);

    /* background-repeat: no-repeat; */
    /* background-attachment: fixed; */
    /* background-position: center center; */
    /* background-size: cover; */
    height: 100%;
    left: 0;
    position: relative;
    transition: transform 0.6s ease-in-out;
    width: 200%;
    /* overflow: hidden; */
}
.bgc {
    width: 100vw;
    height: 100vh;
    position: absolute;

    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
}

.container__overlay {
    height: 100%;

    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 0.6s ease-in-out;
    width: 50%;
    z-index: 100;
}
.overlay__panel {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 50%;
}

.overlay--right {
    right: 0;
    transform: translateX(0);
}
.btn {
    background-color: #0367a6;
    background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
    border-radius: 20px;
    border: 1px solid #0367a6;
    color: var(--white);
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    padding: 0.9rem 4rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

.form > .btn {
    margin-top: 1.5rem;
}

.btn:active {
    transform: scale(0.95);
}

.btn:focus {
    outline: none;
}

.bb {
    transform: translateX(100%);
}
.cc {
    transform: translateX(-50%);
}
</style>
