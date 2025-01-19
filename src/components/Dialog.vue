<template>
    <Teleport to="body">
        <Transition @before-enter="handleBeforeEnter" @enter="enter" @leave="leave" @before-leave="onBeforeLeave">
            <Overlay v-if="show" @click="show = false">
                <div class="overlay-dialog">
                    <div :class="['dialog', customClass]" :style="{ width: width }">
                        <slot></slot>
                    </div>
                </div>
            </Overlay>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
const show = defineModel("show");
interface Props {
    customClass?: string;
    width?: string;
    time?: string;
}

const props = withDefaults(defineProps<Props>(), {
    dlogClass: "",
    width: "30%",
    time: "0.3s",
});

function handleBeforeEnter(e: Element) {
    (e.children[0] as HTMLElement).style.animation = `${props.time} ease 0ms dialog-fade-in`;
    (e as HTMLElement).style.animation = `${props.time} ease 0ms modal-fade-in`;
}

function onBeforeLeave(e: Element) {
    (e.children[0] as HTMLElement).style.animation = `${props.time} ease 0ms dialog-fade-out`;
    (e as HTMLElement).style.animation = `${props.time} ease 0ms modal-fade-out`;
}
function enter(e: Element, done: () => void) {
    const dialogElement = e.children[0] as HTMLElement;
    dialogElement.addEventListener(
        "animationend",
        () => {
            done();
            (e.children[0] as HTMLElement).style.animation = "none";
            (e as HTMLElement).style.animation = "none";
        },
        { once: true },
    );
}
function leave(e: Element, done: () => void) {
    const dialogElement = e.children[0] as HTMLElement;
    dialogElement.addEventListener(
        "animationend",
        () => {
            done();
            (e.children[0] as HTMLElement).style.animation = "none";
            (e as HTMLElement).style.animation = "none";
        },
        { once: true },
    );
}
</script>
<style>
.dialog {
    position: fixed;
    background: #ffffff;
    border-radius: 12px;
    box-shadow:
        0px 12px 32px 4px rgba(0, 0, 0, 0.04),
        0px 8px 20px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    margin: 10vh auto 50px;
    overflow-wrap: break-word;
    padding: 16px;
    position: relative;

    height: 400px;
}
.overlay-dialog {
    bottom: 0;
    left: 0;

    right: 0;
    top: 0;
    z-index: 99999;
}
@keyframes dialog-fade-in {
    0% {
        transform: translate3d(0, -20px, 0);

        opacity: 0;
    }
    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes dialog-fade-out {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    100% {
        transform: translate3d(0, -20px, 0);
        opacity: 0;
    }
}

@keyframes modal-fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes modal-fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
