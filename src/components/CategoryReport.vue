<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul v-if="recentTransactions.length > 0" class="divide-y divide-gray-200">
            <template v-for="transaction in recentTransactions" :key="transaction.id">
                <TransactionItem :transaction="transaction" @edit-category="displayModal(transaction)" />
            </template>
        </ul>
    </div>
    <category-modal
        v-show="showModal"
        :transaction="selectedTransaction"
        @close="showModal = false"
        @updated-transaction="replaceTransaction"
    ></category-modal>
</template>

<script lang="ts">
    import { defineComponent, ref, computed } from 'vue'
    import { fetchTransactions } from '@/api/transaction'

    import TransactionItem from './TransactionItem.vue'
    import CategoryModal from '@/components/CategoryModal.vue'

    import { useStore } from '@/store'
    import { ActionTypes } from '@/store/action-types'

    export default defineComponent({
        name: 'TransactionList',
        components: {
            TransactionItem,
            CategoryModal,
        },
        setup() {
            const store = useStore()

            const transactions = ref([] as Transaction[])

            const getTransactions = async () => {
                transactions.value = await fetchTransactions()
            }

            const recentTransactions = computed(() => transactions.value.slice(0, 20))

            getTransactions()

            store.dispatch(ActionTypes.FETCH_CATEGORIES)

            const showModal = ref(false)
            const selectedTransaction = ref({} as Transaction)

            const displayModal = (transaction: Transaction) => {
                selectedTransaction.value = transaction
                showModal.value = true
            }

            const replaceTransaction = (transaction: Transaction) => {
                transactions.value.splice(
                    transactions.value.findIndex(t => t.id === transaction.id),
                    1,
                    transaction,
                )
                selectedTransaction.value = transaction
            }

            return {
                getTransactions,
                transactions,
                recentTransactions,
                showModal,
                displayModal,
                selectedTransaction,
                replaceTransaction,
            }
        },
    })
</script>

<style lang="scss" scoped></style>
