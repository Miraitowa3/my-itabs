import { defineComponent } from "vue";

export default defineComponent({
    name: "Setting",
    setup() {
        return () => <el-drawer v-model={true} ></el-drawer>;
    },
});
