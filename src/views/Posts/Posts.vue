<template>
  <div class="h-screen relative">
    <div class="loading-spinner" v-if="posts === null">
      <bounce-loader></bounce-loader>
    </div>
    <div v-else-if="posts.length === 0">You have not created any posts yet.</div>
    <div v-else>
      <FilterBox :posts="posts" @postListSorted="onSortedPosts" />
      <PostItem v-for="post in sortedPosts" :key="post.id" :post="post"></PostItem>
      <PaginationBox
        :currentPage="pagination.currentPage"
        :pageLinks="pagination.pageLinks"
        :pageSize="pagination.pageSize"
        :previousPage="pagination.previousPage"
        :nextPage="pagination.nextPage"
      />
    </div>
    <div class="flex justify-end">
      <router-link
        id="create_post_btn"
        class="bg-blue-400 flex h-16 hover:bg-blue-600 items-center justify-center no-underline p-5 right-0 rounded-full sticky text-white w-16"
        :to="{ name: 'PostCreate' }"
        >New</router-link
      >
    </div>
  </div>
</template>
<script>
import PostItem from "./PostItem";
import FilterBox from "../../components/Layout/FilterBox";
import PaginationBox from "../../components/Layout/PaginationBox";
import { mapState, mapActions } from "vuex";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";

export default {
  components: { PostItem, BounceLoader, FilterBox, PaginationBox },
  data() {
    return {
      sortedPosts: []
    };
  },
  computed: {
    ...mapState("auth", ["user", "isLoggedIn"]),
    ...mapState("posts", ["posts"]),
    ...mapState("pagination", ["pagination"])
  },
  methods: {
    ...mapActions("posts", ["init"]),
    onSortedPosts(value) {
      this.sortedPosts = value;
    }
  },
  async created() {
    await this.init();
    this.sortedPosts = this.posts;
  }
};
</script>
