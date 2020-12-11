import { Getters } from '@/store/getters'
import { Mutations } from '@/store/mutations'
import { State } from '@/store/state'
import { Actions } from '@/store/actions'
import { ActionContext, CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex'

export type StoreActionContext = {
    commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
    getters: { [K in keyof Getters]: ReturnType<Getters[K]> }
    dispatch<K extends keyof Actions>(key: K, payload?: Parameters<Actions[K]>[1]): ReturnType<Actions[K]>
} & Omit<ActionContext<State, State>, 'commit' | 'getters' | 'dispatch'>

export type StoreType = Omit<VuexStore<State>, 'getters' | 'commit' | 'dispatch'> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions,
    ): ReturnType<Mutations[K]>
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload?: Parameters<Actions[K]>[1],
        options?: DispatchOptions,
    ): ReturnType<Actions[K]>
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    }
}
