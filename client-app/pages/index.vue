<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <PostList
      :posts="loadedPosts"
    />
  </div>
</template>

<script>
  import PostList from '~/components/Posts/PostList'

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
  .intro {
    height: 300px;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-position: center;
    background-image: url('~/assets/images/main-page-background.jpg');
    background-size: cover;
  }

  .intro h1 {
    position: absolute;
    font-size: 2rem;
    top: 10%;
    left: 5%;
    width: 90%;
    text-align: center;
  }

  @media (min-width: 768px) {
    .intro h1 {
      font-size: 4rem;
    }
  }
</style>
