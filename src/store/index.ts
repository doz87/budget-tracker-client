import { createStore } from 'vuex'
import { state } from '@/store/state'
import { mutations } from '@/store/mutations'
import { getters } from '@/store/getters'
import { actions } from '@/store/actions'
import { StoreType } from '@/store/types'

export const store = createStore({
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    mutations,
    actions,
})

export function useStore() {
    return store as StoreType
}
