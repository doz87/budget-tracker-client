import { ActionTypes } from '@/store/action-types'
import { StoreActionContext } from '@/store/types'
import { fetchCategories } from '@/api/transactionCategory'
import { MutationTypes } from '@/store/mutation-types'

export type Actions = {
    [ActionTypes.FETCH_CATEGORIES]({ commit }: StoreActionContext): void
}

export const actions: Actions = {
    [ActionTypes.FETCH_CATEGORIES]({ commit }) {
        fetchCategories().then(tags => {
            commit(MutationTypes.SET_CATEGORIES, tags)
        })
    },
}
