<template>
    <div>
        <budget-header></budget-header>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import BudgetHeader from '@/components/BudgetHeader.vue'

    export default defineComponent({
        name: 'App',
        components: {
            BudgetHeader,
        },
    })
</script>

<style></style>
