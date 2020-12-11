import { StoreType } from '@/store/types'

declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>
    export default component
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: StoreType
    }
}
