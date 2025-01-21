import s from './styles/Tabs.module.css'
export default defineComponent({
    setup(props, ctx) {
        const item = ref([
            {
                title: "微信登录",
            },
            {
                title: "其它方式登录",
            },
        ]);
        const renderItem = () => {
            return item.value.map((item, index) => <div class={s['tabs-header-item']}>{item.title}</div>);
        };
        return () => (
            <div class="tabs">
                <div class="tabs-header flex">{renderItem()}</div>
                <div class={s.line}></div>
            </div>
        );
    },
});
