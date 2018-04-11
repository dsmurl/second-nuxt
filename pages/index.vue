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
    data() {
      return {
        loadedPosts: []
      }
    },
    asyncData(context, callback) {
      setTimeout(() => {
        callback(null,
          {
            loadedPosts: [
              {
                id: "1",
                thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIZ8WPUYMRIXtHZTl9ZoSq3hVjkQug9SD1v_GdrRmI8A7H968",
                title: "Server Stuff!!",
                previewText: "Servers are crazy.  This post is about servers and all the crazy things you can do with them.",
              },
              {
                id: "2",
                thumbnail: "https://img.etimg.com/thumb/msid-62427644,width-300,imgsize-172533,resizemode-4/tech-thinkstock.jpg",
                title: "Data Stuff!!",
                previewText: "Data is crazy stuff.  This post is about data and all the crazy things you can do with data.",
              },
              {
                id: "3",
                thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIZ8WPUYMRIXtHZTl9ZoSq3hVjkQug9SD1v_GdrRmI8A7H968",
                title: "Server Stuff!!",
                previewText: "Servers are crazy.  This post is about servers and all the crazy things you can do with them.",
              },
            ]
          }
        );
      }, 1500);
    },
    created() {

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
