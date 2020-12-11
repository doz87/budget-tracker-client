<template>
    <div class="min-h-screen bg-gray-100">
        <div class="py-10">
            <header>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold leading-tight text-gray-900">
                        Categories
                    </h1>
                </div>
            </header>
            <main>
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
                        <div v-for="tag in tags" :key="tag" class="tag-input__tag">
                            <span @click="removeTag(tag)" class="cursor-pointer">x</span>
                            {{ tag.name }}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import { fetchCategories, createCategory, deleteCategory } from '@/api/transactionCategory'

    export default defineComponent({
        name: 'Categories',
        setup() {
            const tagInputValue = ref('')
            const tags = ref([] as Tag[])

            const addTag = async (event: Event) => {
                const target = event.target as HTMLInputElement

                if (target && target.value) {
                    const category = await createCategory({ name: target.value })
                    console.log(category)
                    tags.value.push(category)
                    tagInputValue.value = ''
                }
            }

            const removeTag = async (tag: Tag) => {
                await deleteCategory(tag.id).then(() => {
                    tags.value.splice(
                        tags.value.findIndex(t => t.name === tag.name),
                        1,
                    )
                })
            }

            const getCategories = async () => {
                tags.value = await fetchCategories()
            }

            getCategories()
            return { tagInputValue, tags, addTag, removeTag }
        },
    })
</script>

<style lang="scss" scoped>
    .tag-input {
        @apply shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-4 py-1;
    }
</style>
