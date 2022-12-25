import { Store } from 'vuex'
import {RootState} from "@/store/RootState";

declare module '@vue/runtime-core' {
    interface Vue {
        $store: Store<RootState>
    }
}