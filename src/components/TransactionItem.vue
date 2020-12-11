<template>
    <li>
        <a href="#" class="block hover:bg-gray-50">
            <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-indigo-600 truncate">
                        {{ transaction.description }}
                    </p>
                    <div class="ml-2 flex-shrink-0 flex" v-if="hasCategory">
                        <p
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                            @click="$emit('edit-category', transaction)"
                        >
                            {{ transaction.transactionCategory.name }}
                        </p>
                    </div>
                    <button
                        v-else
                        type="button"
                        class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        @click="$emit('edit-category', transaction)"
                    >
                        Add Category
                    </button>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                    <div class="sm:flex">
                        <p
                            class="flex items-center text-sm font-medium"
                            :class="{ 'text-green-600': isCredit, 'text-red-600': !isCredit }"
                        >
                            {{ currency }}
                        </p>
                    </div>
                    <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <!-- Heroicon name: calendar -->
                        <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <p>
                            <time datetime="2020-01-07">{{ transactionDate }}</time>
                        </p>
                    </div>
                </div>
            </div>
        </a>
    </li>
</template>

<script lang="ts">
    import { formatCurrency } from '@/utils/utils'
    import { defineComponent, PropType, computed } from 'vue'
    import moment from 'moment'
    import { useStore } from '@/store'

    export default defineComponent({
        name: 'TransactionItem',
        props: {
            transaction: {
                type: Object as PropType<Transaction>,
                required: true,
            },
        },
        setup(props) {
            const store = useStore()

            const isCredit = computed(() => props.transaction.amount >= 0)

            const currency = formatCurrency((props.transaction.amount / 100) * (isCredit.value ? 1 : -1))

            const transactionDate = computed(() =>
                moment(props.transaction.createdOn, moment.ISO_8601).format('Do MMM YYYY'),
            )

            const hasCategory = computed(() => props.transaction?.transactionCategory !== null)

            const categories = computed(() => store.getters.Categories)

            return { isCredit, currency, transactionDate, categories, hasCategory }
        },
    })
</script>

<style lang="scss" scoped></style>
