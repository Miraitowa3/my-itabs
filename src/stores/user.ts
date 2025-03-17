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
        return { userInfo, setUserInfo, token, setToken };
    },
    {
        persist: [
            {
                storage: localStorage,
                pick: ["navConfig"],
                key: "navConfig",
            },
        ],
    },
);
