export default defineStore(
    "user",
    () => {
        const userInfo = ref<any>(null);
        const token = ref<string>("");

        const setUserInfo = (data: any) => {
            userInfo.value = data;
        };
        const setToken = (data: any) => {
            token.value = data;
        };
        const outLogin = () => {
        userInfo.value = null;
        token.value = "";
        };
        return { userInfo, setUserInfo, token, setToken,outLogin };
    },
    {
        persist: [
            {
                storage: localStorage,
                pick: ["token",'userInfo'],
                key: "user",
            },

        ],
    },
);
