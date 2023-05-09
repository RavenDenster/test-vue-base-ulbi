<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <!-- @input="inputTitle"
        v-bind:value="post.title"  -->
        <my-input 
            v-model.trim="post.title"
            v-focus
            placeholder="Название"
            style="max-width: 270px;"
            />
        <!-- @input="post.body = $event.target.value"
        v-bind:value="post.body"  -->
        <my-input 
            v-model.trim="post.body"
            placeholder="Описание"
            style="max-width: 270px;"
            />
        <my-button 
            style="align-self: flex-end; margin-top: 15px;"
            @click="createPost"
        >
        Создать
        </my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: '',
            }
        }
    },
    methods: {
        // inputTitle(event) {
        //     this.post.title = event.target.value
        // },
        createPost() {
            this.post.id = Date.now()
            this.$emit('create', this.post)
            this.post = {
                title: '',
                body: ''
            }
        },
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>