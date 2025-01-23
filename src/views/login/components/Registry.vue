<template>
    <div class="registry">
        <div class="bird-logo relative mt-[10px]">
            <div class="brid-body"></div>
            <span class="brid-claw left"></span>
            <span class="brid-claw right"></span>
        </div>
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules" label-width="auto" class="demo-ruleForm">
            <el-form-item :label="item.label" :prop="item.prop" v-for="item in colums" :key="item.prop"></el-form-item>
            <el-form-item label="Password" prop="pass"> </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
                <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Age" prop="age">
                <el-input v-model.number="ruleForm.age" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)"> Submit </el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
const password = ref<HTMLInputElement>();
import type { FormInstance, FormRules } from "element-plus";
const colums = [
    {
        prop: "emil",
        label: "",
    },
    {
        prop: "code",
        label: "",
    },
    {
        prop: "name",
        label: "",
    },
    {
        prop: "password",
        label: "",
    },
];
const ruleFormRef = ref<FormInstance>();

const checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error("Please input the age"));
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error("Please input digits"));
        } else {
            if (value < 18) {
                callback(new Error("Age must be greater than 18"));
            } else {
                callback();
            }
        }
    }, 1000);
};

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error("Please input the password"));
    } else {
        if (ruleForm.checkPass !== "") {
            if (!ruleFormRef.value) return;
            ruleFormRef.value.validateField("checkPass");
        }
        callback();
    }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error("Please input the password again"));
    } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
    } else {
        callback();
    }
};

const ruleForm = reactive({
    pass: "",
    checkPass: "",
    age: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{ validator: validatePass, trigger: "blur" }],
    checkPass: [{ validator: validatePass2, trigger: "blur" }],
    age: [{ validator: checkAge, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            console.log("submit!");
        } else {
            console.log("error submit!");
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
onMounted(() => {
    const birdLogo = document.querySelector(".bird-logo");
    password.value?.addEventListener("focus", () => {
        birdLogo!.classList.add("password");
    });
    password.value?.addEventListener("blur", () => {
        birdLogo!.classList.remove("password");
    });
});
</script>
<style scoped>
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
.brid-claw::before {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    /* opacity: 0; */
    transition: 0.3s ease-out;
    background-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='39.54309999999998'%20height='42.504880000000014'%20viewBox='0%200%2039.54309999999998%2042.504880000000014'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='linear_0'%20x1='85.2613983223369%25'%20y1='4.589073066433789%25'%20x2='10.164352314310205%25'%20y2='27.141777602948192%25'%20gradientUnits='objectBoundingBox'%3e%3cstop%20offset='0'%20stop-color='%234091F7'%20stop-opacity='1'%20/%3e%3cstop%20offset='1'%20stop-color='%233BAAFB'%20stop-opacity='1'%20/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20id='%E8%B7%AF%E5%BE%84%203'%20fill-rule='evenodd'%20fill='url(%23linear_0)'%20transform='translate(0%200)%20rotate(0%2019.77155%2021.25244)'%20opacity='1'%20d='M22.75,0C2.76,0%200,27.8%200,42.5L28.54,42.5C28.74,35.83%2028.79,29.79%2030.44,24.5C33,16.33%2035.6,10.26%2039.54,6C35.54,4%2030.44,7%2028.54,8.5C28.54,6%2030.04,3%2033.04,1.5C25.54,-0.5%2021.25,4.5%2019.25,7C19.25,4.5%2020.54,2%2022.75,0Z%20'%20/%3e%3cpath%20id='%E8%B7%AF%E5%BE%84%203'%20fill-rule='evenodd'%20style='fill:%23000000'%20transform='translate(0%200)%20rotate(0%2019.77155%2021.25244)'%20opacity='0.1'%20d='M22.75,0C2.76,0%200,27.8%200,42.5L28.54,42.5C28.74,35.83%2028.79,29.79%2030.44,24.5C33,16.33%2035.6,10.26%2039.54,6C35.54,4%2030.44,7%2028.54,8.5C28.54,6%2030.04,3%2033.04,1.5C25.54,-0.5%2021.25,4.5%2019.25,7C19.25,4.5%2020.54,2%2022.75,0Z%20'%20/%3e%3c/svg%3e");
    background-size: contain;
    background-repeat: no-repeat;
}

.bird-logo.password .brid-claw.left {
    left: 50%;
    margin-left: -33px;
}

.bird-logo.password .brid-claw {
    bottom: -2px;
    height: 32px;
    width: 28px;
    transform: scale(1);
    background-color: transparent;
}
.bird-logo.password .brid-claw.right {
    right: 50%;
    margin-right: -33px;
}
.bird-logo.password .brid-claw::before {
    opacity: 1;
}
.bird-logo.password .brid-claw.right::before {
    transform: rotateY(180deg);
}
</style>
