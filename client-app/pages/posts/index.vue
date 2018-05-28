<template>
  <div class="posts-page">
    <h1>These are the posts!</h1>
    <PostList
      :posts="loadedPosts"
    />  </div>
</template>

<script>
  import PostList from '~/components/Posts/PostList';

  export default {
    components: {
      PostList
    },
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts;
      }
    }
  }
</script>

<style scoped>
  .posts-page {
    text-align: center;
    padding: 30px;
  }
</style>
