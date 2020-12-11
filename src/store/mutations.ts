import { MutationTypes } from '@/store/mutation-types'
import { State } from '@/store/state'
import { MutationTree } from 'vuex'

export type Mutations<S = State> = {
    [MutationTypes.ADD_CATEGORY](state: S, payload: Tag): void
    [MutationTypes.SET_CATEGORIES](state: S, payload: Tag[]): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.ADD_CATEGORY](state, payload) {
        state.categories.push(payload)
    },
    [MutationTypes.SET_CATEGORIES](state, payload) {
        state.categories = payload
    },
}
