import {Ref} from "vue"

interface  OptionType{
    sentinelRef:Ref<HTMLElement | null>
}

function initObserver() {

}

export default function useInfiniteScroll(option: OptionType) {
    function loadMore() {

    }
    return {
        loadMore
    }
}
