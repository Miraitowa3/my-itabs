<template>
    <div class="container flex w-96 flex-col items-center justify-center">
        <div class="item mb-3 flex h-16 w-full items-center justify-center rounded-3xl bg-indigo-500 text-center text-4xl font-bold text-white" draggable="true">1</div>
        <div class="item mb-3 flex h-16 w-full items-center justify-center rounded-3xl bg-indigo-500 text-center text-4xl font-bold text-white" draggable="true">2</div>
        <div class="item mb-3 flex h-16 w-full items-center justify-center rounded-3xl bg-indigo-500 text-center text-4xl font-bold text-white" draggable="true">3</div>
        <div class="item mb-3 flex h-16 w-full items-center justify-center rounded-3xl bg-indigo-500 text-center text-4xl font-bold text-white" draggable="true">4</div>
        <div class="item mb-3 flex h-16 w-full items-center justify-center rounded-3xl bg-indigo-500 text-center text-4xl font-bold text-white" draggable="true">5</div>
        <div class="item mb-3 flex h-16 w-full items-center justify-center rounded-3xl bg-indigo-500 text-center text-4xl font-bold text-white" draggable="true">6</div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";

onMounted(() => {
    class Filp {
        constructor({ el }) {
            this.el = el;

            this.elements = Array.from(this.getElement(el)[0].children);

            this.startLocation = this.getLoacton(this.elements);
            this.lastLocation = [];
        }
        getElement(el) {
            return Array.from(document.querySelectorAll(el));
        }
        start() {
            this.elements = Array.from(this.getElement(this.el)[0].children);
            this.startLocation = this.getLoacton(this.elements);
        }
        last() {
            this.lastLocation = this.getLoacton(this.elements);
        }
        play() {
            this.last();
            this.invert();
        }
        invert() {
            const diff = this.startLocation.map((first, index) => {
                const last = this.lastLocation[index];
                return {
                    left: first.left - last.left,
                    top: first.top - last.top,
                };
            });
            this.elements.forEach((element, index) => {
                const { left, top } = diff[index];
                element.animate(
                    [
                        {
                            transform: `translate(${left}px, ${top}px)`,
                        },
                        {
                            transform: "none",
                        },
                    ],
                    {
                        duration: 600,
                        easing: `cubic-bezier(0.33, 1, 0.68, 1)`,
                    },
                );
            });
        }
        getLoacton(elements) {
            return elements.map((el) => el.getBoundingClientRect());
        }
    }
    let souceNode;
    var container = document.querySelector(".container");
    let Fliap = new Filp({ el: ".container" });
    container.ondragstart = (e) => {
        setTimeout(() => {
            e.target.classList.add("moving");
        }, 0);

        souceNode = e.target;
        e.dataTransfer.effectAllowed = "move";
    };
    container.ondragover = (e) => {
        e.preventDefault();
    };
    container.ondragenter = (e) => {
        e.preventDefault();
        if (e.target === container || e.target === souceNode) {
            return;
        }
        const children = Array.from(container.children);
        const souceNodeIndex = children.indexOf(souceNode);
        const targetNodeIndex = children.indexOf(e.target);
        Fliap.start();
        if (souceNodeIndex < targetNodeIndex) {
            container.insertBefore(souceNode, e.target.nextElementSibling);
            console.log("向下拖动");
        } else {
            container.insertBefore(souceNode, e.target);

            console.log("向上拖动");
        }
        Fliap.play();
    };
    container.ondragend = (e) => {
        e.target.classList.remove("moving");
    };
});
</script>
<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body {
    background-color: #dcdcdc;
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.item.moving {
    background: transparent;
    color: transparent;
    border: 1px dashed #ccc;
}
</style>
