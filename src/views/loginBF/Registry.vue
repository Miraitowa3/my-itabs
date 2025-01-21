<template>
    <div class="registry absolute top-0 h-full">
        <div class="form-item">
            <input type="text" id="emil" required />
            <span class="bar"></span>
            <label for="emil">邮箱</label>
        </div>
        <div class="form-item">
            <input type="text" id="emil" required />
            <span class="bar"></span>
            <label for="emil">验证码</label>
        </div>
        <div class="form-item">
            <input type="text" id="emil" required />
            <span class="bar"></span>
            <label for="emil">昵称</label>
        </div>
        <div class="form-item">
            <input type="text" id="password" required />
            <span class="bar"></span>
            <label for="password">密码</label>
        </div>
        <button>注册</button>
    </div>
</template>

<script lang="ts" setup>
const form = ref<any>({
    emil: "",
    password: "",
});
const props = defineProps<{
    show: boolean;
}>();
</script>
<style scoped>
.registry {
    width: 50%;
    transform: translateX(100%);
    transition: all 0.6s ease-in-out;
    background: #fff;
}
.form-item {
    box-sizing: border-box;
    position: relative;
    width: 240px;
    height: 41px;
    border-bottom: 1px solid #757575;
    margin-bottom: 20px;
}
.form-item > .bar {
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #5264ae;
    transition: 0.4s ease;
}
.form-item input {
    outline: none;
    width: 100%;
    height: 20px;
    margin-top: 20px;
    font-size: 14px;
}
.form-item input:focus ~ .bar {
    width: 100%;
}
.form-item input:focus ~ label,
.form-item input:valid ~ label {
    color: #5264ae;
    transform: translateY(-20px);
}
.form-item label {
    color: #ccc;
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translateY(-50%);
    transition: 0.4s ease;
    font-size: 14px;
}
</style>
