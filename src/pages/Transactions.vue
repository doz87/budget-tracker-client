<template>
    <div class="min-h-screen bg-gray-100">
        <div class="py-10">
            <header>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold leading-tight text-gray-900">
                        Transactions
                    </h1>
                </div>
            </header>
            <main>
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8">
                    <h1>Filters</h1>
                </div>

                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8">
                    <TransactionList></TransactionList>
                </div>
            </main>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import TransactionList from '../components/TransactionList.vue'

    export default defineComponent({
        name: 'Transactions',
        components: {
            TransactionList,
        },
    })
</script>

<style lang="scss" scoped></style>
