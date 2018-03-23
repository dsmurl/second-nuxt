<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <section class="featured-posts">
      <PostPreview
        id="1"
        thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIZ8WPUYMRIXtHZTl9ZoSq3hVjkQug9SD1v_GdrRmI8A7H968"
        title="Server Stuff!!"
        previewText="Servers are crazy.  This post is about servers and all the crazy things you can do with them."
      />
      <PostPreview
        id="2"
        thumbnail="https://img.etimg.com/thumb/msid-62427644,width-300,imgsize-172533,resizemode-4/tech-thinkstock.jpg"
        title="Data Stuff!!"
        previewText="Data is crazy stuff.  This post is about data and all the crazy things you can do with data."
      />
      <PostPreview
        id="3"
        thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIZ8WPUYMRIXtHZTl9ZoSq3hVjkQug9SD1v_GdrRmI8A7H968"
        title="Server Stuff!!"
        previewText="Servers are crazy.  This post is about servers and all the crazy things you can do with them."
      />
    </section>
  </div>
</template>

<script>
  import PostPreview from '~/components/posts/PostPreview'

  export default {
    components: {
      PostPreview
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
    top: 10%;
    left: 5%;
    width: 90%;
    font-size: 1.5rem;
    color: black;
    background-color: rgb(211, 211, 211);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px black;
    box-sizing: border-box;
    border: 1px solid black;
  }

  @media (min-width: 768px) {
    .intro h1 {
      font-size: 2rem;
    }
  }

  .featured-posts {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>
