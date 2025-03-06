export default defineStore(
    "user",
    () => {
        const userInfo = ref<any>(null);


        const setUserInfo = (data: any) => {
            userInfo.value = data;
        };

        return { userInfo, setUserInfo };
    },
    { persist: { key: "user", storage: localStorage } },
);
