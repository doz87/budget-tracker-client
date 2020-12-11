import { GetterTree } from 'vuex'
import { State } from '@/store/state'
import { GetterTypes } from '@/store/getter-types'

export type Getters = {
    [GetterTypes.CATEGORIES](state: State): Tag[]
}

export const getters: GetterTree<State, State> & Getters = {
    [GetterTypes.CATEGORIES]: state => state.categories,
}
