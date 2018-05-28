<template>
  <div class="admin-page">
    <h1>This is the admin panel!</h1>
    <section class="new-post">
      <AppButton class="button" @click="$router.push('/admin/new-post')">Create Post</AppButton>
      <AppButton class="button" @click="$router.push('/')">Home</AppButton>
    </section>
    <section class="existing-posts">
      <h2>Existing Posts</h2>
      <PostList
        :posts="loadedPosts"
        isAdmin
      />
    </section>
  </div>
</template>

<script>
  import PostList from '~/components/Posts/PostList';
  import AppButton from '~/components/UI/AppButton';

  export default {
    components: {
      PostList,
      AppButton,
    },
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts;
      }
    },
    // layout: 'admin',
  }
</script>

<style scoped>
  .admin-page {
    padding: 20px;
  }

  .new-post {
    text-align: center;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
  }

  .button {
    margin: 5px;
  }

  .existing-posts h2 {
    text-align: center;
  }
</style>
