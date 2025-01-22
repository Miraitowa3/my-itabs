<template>
    <div class="registry">
        <div class="bird-logo relative">
            <div class="brid-body"></div>
            <span class="brid-claw left"></span>
            <span class="brid-claw right"></span>
        </div>
        <div class="form-item">
            <div class="form-item__content">
                <div class="input flex">
                    <div class="input__wrapper flex-1">
                        <input type="password" class="input__inner" placeholder="请输入邮箱" />
                    </div>
                    <button class="input__suffix is-disabled"><span>获取验证码</span></button>
                </div>
                <div class="form-item__error">验证码错误</div>
            </div>
        </div>

        <div class="form-item">
            <div class="form-item__content">
                <div class="input">
                    <div class="input__wrapper">
                        <input type="password" class="input__inner" placeholder="请输入6位邮箱验证码" />
                    </div>
                </div>
                <div class="form-item__error">验证码错误</div>
            </div>
        </div>
        <div class="form-item">
            <div class="form-item__content">
                <div class="input">
                    <div class="input__wrapper">
                        <input type="password" class="input__inner" placeholder="请输入用户名" />
                    </div>
                </div>
            </div>
        </div>
        <div class="form-item">
            <div class="form-item__content">
                <div class="input">
                    <div class="input__wrapper">
                        <input type="password" class="input__inner" placeholder="请输入8-18密码" />
                    </div>
                </div>
            </div>
        </div>
        <button id="registry-btn" class="d-button w-full">立即注册</button>
    </div>
</template>

<script lang="ts" setup></script>
<style scoped>
.d-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    height: 40px;
    white-space: nowrap;
    cursor: pointer;
    padding: 12px 19px;
    border-radius: 20px;
    background: #1890ff;
    color: #fff;
    font-size: 14px;
    overflow: hidden;
}
.form-item {
    margin-bottom: 18px;
}
.form-item__content {
    position: relative;
}
.input__wrapper {
    border-radius: 8px;
    box-shadow: 0 0 0 1px #dcdfe6 inset;
    padding: 1px 11px;

    background-color: #f0f1f4;
}
.input__inner {
    background: none;
    color: #606266;
    height: 30px;
    line-height: 30px;
    width: 100%;
    font-size: 14px;
}
.form-item__error {
    color: #f56c6c;
    font-size: 12px;
    left: 0;
    line-height: 1;
    padding-top: 2px;
    position: absolute;
    top: 100%;
}
.input__suffix {
    display: block;
    padding: 8px 10px;
    height: 32px;
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1890ff;
    color: #fff;
    border-radius: 8px;
    border: 1px solid #1890ff;
    box-sizing: border-box;
}
.input__suffix span {
    font-size: 14px;
    white-space: nowrap;
    line-height: 1;
}
.input__suffix.is-disabled,
.input__suffix.is-disabled:hover {
    background-color: rgb(159.5, 206.5, 255);
    border-color: rgb(159.5, 206.5, 255);
    color: #fff;
    cursor: not-allowed;
}
.bird-logo {
    height: 76px;
}

.brid-body {
    position: absolute;

    left: 50%;
    background-image: url(@/assets/img/bird-body.svg);
    width: 90px;
    height: 95px;
    margin-left: -45px;

    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
}
.brid-claw {
    position: absolute;
    height: 24px;
    width: 24px;
    background-color: #3292dc;
    transform: scaleY(0.6);
    border-radius: 50%;
    bottom: -12px;
    z-index: 1;
    transition: 0.3s ease-in-out;
}
.brid-claw.left {
    left: 20%;
}
.brid-claw.right {
    right: 20%;
}
.brid-claw:before {
    content: "";
    width: 100%;
    height: 100%;
    opacity: 0;
    display: block;
    transition: 0.3s ease-out;
    background-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='39.54309999999998'%20height='42.504880000000014'%20viewBox='0%200%2039.54309999999998%2042.504880000000014'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='linear_0'%20x1='85.2613983223369%25'%20y1='4.589073066433789%25'%20x2='10.164352314310205%25'%20y2='27.141777602948192%25'%20gradientUnits='objectBoundingBox'%3e%3cstop%20offset='0'%20stop-color='%234091F7'%20stop-opacity='1'%20/%3e%3cstop%20offset='1'%20stop-color='%233BAAFB'%20stop-opacity='1'%20/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20id='路径%203'%20fill-rule='evenodd'%20fill='url(%23linear_0)'%20transform='translate(0%200)%20rotate(0%2019.77155%2021.25244)'%20opacity='1'%20d='M22.75,0C2.76,0%200,27.8%200,42.5L28.54,42.5C28.74,35.83%2028.79,29.79%2030.44,24.5C33,16.33%2035.6,10.26%2039.54,6C35.54,4%2030.44,7%2028.54,8.5C28.54,6%2030.04,3%2033.04,1.5C25.54,-0.5%2021.25,4.5%2019.25,7C19.25,4.5%2020.54,2%2022.75,0Z%20'%20/%3e%3cpath%20id='路径%203'%20fill-rule='evenodd'%20style='fill:%23000000'%20transform='translate(0%200)%20rotate(0%2019.77155%2021.25244)'%20opacity='0.1'%20d='M22.75,0C2.76,0%200,27.8%200,42.5L28.54,42.5C28.74,35.83%2028.79,29.79%2030.44,24.5C33,16.33%2035.6,10.26%2039.54,6C35.54,4%2030.44,7%2028.54,8.5C28.54,6%2030.04,3%2033.04,1.5C25.54,-0.5%2021.25,4.5%2019.25,7C19.25,4.5%2020.54,2%2022.75,0Z%20'%20/%3e%3c/svg%3e");
    background-size: contain;
    background-repeat: no-repeat;
}
</style>
