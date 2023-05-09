<template>
    <div>
        <h1>Страница с постами</h1>
        <!-- <h1>{{ likes }}</h1>
        <button @click="addLike">add like</button> -->
        <my-input v-model.trim="searchQuery" placeholder="Поиск..." v-focus/>
        <div class="app__btns">
            <my-button>
                Создать пользователя
            </my-button>
            <my-select v-model="selectedSort" :options="sortOptions"/>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <PostForm/>
        </my-dialog>
       <PostList :posts="sortedAndSearchedPosts" v-if="!isPostsLoading"/>
       <div v-else>Идёт загрузка...</div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchPosts";

export default {
    components: {
    PostList,
    PostForm,
},
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'по названию'},
                {value: 'body', name: 'по содержанию'},
            ]
        }
    },
    setup(props) {
        // const likes = ref(2)
        // const addLike = () => {
        //     likes.value += 1
        // }
        const {posts, totalPages, isPostsLoading} = usePosts(10)
        const {selectedSort, sortedPosts} = useSortedPosts(posts)
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

        return {
            posts, totalPages, isPostsLoading, sortedPosts, searchQuery, sortedAndSearchedPosts, selectedSort
        }
    }
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