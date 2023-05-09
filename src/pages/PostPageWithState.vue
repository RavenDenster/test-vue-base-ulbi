<template>
    <div>
        <!-- <h1>{{ $store.state.isAuth ? 'Пользователь авторизован' : 'Авторизуйтесь, чтобы использовать сервис'}}</h1>
        <h1>{{ $store.state.likes }}, дабл {{ $store.getters.doubleLikes }}</h1>
        <div>
            <MyButton @click="$store.commit('incrementLikes')">Лайк</MyButton>
            <MyButton @click="$store.commit('decrementLikes')">Дизлайк</MyButton>
        </div> -->

        <h1>Страница с постами</h1>
        <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..." v-focus/>
        <div class="app__btns">
            <my-button @click="showDialog">
                Создать пользователя
            </my-button>
            <my-select :model-value="selectedSort" @update:model-value="setSelectSort" :options="sortOptions"/>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <PostForm @create="createPost"/>
        </my-dialog>
       <PostList :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading"/>
       <div v-else>Идёт загрузка...</div>
       <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import MyButton from "@/components/UI/MyButton.vue"
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    components: {
    PostList,
    PostForm,
    MyButton
},
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        createPost(post) {
            this.posts.push(post)
            this.dialogVisible = false
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true
        },
       
    },
    mounted() {
        this.fetchPosts()
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
        }),
    },
}
</script>

<style>
.app__btns {
    display: flex;
    margin: 15px 0;
    justify-content: space-between;
}

.page__wrapper{
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}

.current-page {
    border: 2px solid teal;
}

.observer {
    height: 30px;
}

</style>