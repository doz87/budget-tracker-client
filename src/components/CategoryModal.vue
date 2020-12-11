<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!--
              Background overlay, show/hide based on modal state.

              Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
            -->
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <!--
              Modal panel, show/hide based on modal state.

              Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            -->
            <div
                class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
            >
                <div>
                    <div class="mt-3 text-center sm:mt-5">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                            Add/Edit Transaction Category
                        </h3>
                        <div class="mt-2">
                            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8">
                                <div class="w-48 mx-auto mb-12 text-left">
                                    <label class="block text-sm font-medium text-gray-700">Tag</label>
                                    <div class="mt-1">
                                        <input
                                            v-model="tagInputValue"
                                            type="text"
                                            placeholder="Add a Tag"
                                            @keydown.enter="addTag"
                                            class="tag-input"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div v-for="tag in categories" :key="tag" class="tag-input__tag mb-2">
                                        <span
                                            class="cursor-pointer inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
                                            :class="{
                                                'bg-green-100 text-green-800': tag.id === activeCategory,
                                                'bg-blue-100 text-blue-800': tag.id !== activeCategory,
                                            }"
                                            @click="assignTag(tag.id)"
                                        >
                                            {{ tag.name }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                        type="button"
                        @click="$emit('close')"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, computed } from 'vue'
    import { useStore } from '@/store'
    import { createCategory } from '@/api/transactionCategory'
    import { MutationTypes } from '@/store/mutation-types'
    import { assignTagToTransaction } from '@/api/transaction'

    export default defineComponent({
        name: 'CategoryModal',
        props: {
            transaction: {
                type: Object as () => Transaction,
                required: true,
            },
        },
        setup(props, context) {
            const store = useStore()

            const tagInputValue = ref('')

            const addTag = async (event: Event) => {
                const target = event.target as HTMLInputElement

                if (target && target.value) {
                    createCategory({ name: target.value })
                        .then(category => {
                            store.commit(MutationTypes.ADD_CATEGORY, category)
                        })
                        .finally(() => (tagInputValue.value = ''))
                }
            }

            const categories = computed(() => store.getters.Categories)

            const assignTag = (categoryId: number) => {
                assignTagToTransaction(categoryId, props.transaction.id)
                    .then(transaction => {
                        context.emit('updated-transaction', transaction)
                    })
                    .catch(err => console.error(err))
            }

            const activeCategory = computed((): number => {
                if (props.transaction && props.transaction.transactionCategory) {
                    return props.transaction.transactionCategory.id
                }

                return 0
            })

            return { tagInputValue, addTag, categories, assignTag, activeCategory }
        },
    })
</script>

<style lang="scss" scoped>
    .tag-input {
        @apply shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-700 bg-gray-100 rounded-md px-4 py-1;
    }
</style>
