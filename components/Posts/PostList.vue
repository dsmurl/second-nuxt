<template>
    <section class="post-list">
      <PostPreview
        id="1"
        :is-admin="isAdmin"
        thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIZ8WPUYMRIXtHZTl9ZoSq3hVjkQug9SD1v_GdrRmI8A7H968"
        title="Server Stuff!!"
        previewText="Servers are crazy.  This post is about servers and all the crazy things you can do with them."
      />
      <PostPreview
        id="2"
        :is-admin="isAdmin"
        thumbnail="https://img.etimg.com/thumb/msid-62427644,width-300,imgsize-172533,resizemode-4/tech-thinkstock.jpg"
        title="Data Stuff!!"
        previewText="Data is crazy stuff.  This post is about data and all the crazy things you can do with data."
      />
      <PostPreview
        id="3"
        :is-admin="isAdmin"
        thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIZ8WPUYMRIXtHZTl9ZoSq3hVjkQug9SD1v_GdrRmI8A7H968"
        title="Server Stuff!!"
        previewText="Servers are crazy.  This post is about servers and all the crazy things you can do with them."
      />
    </section>
</template>

<script>
  import PostPreview from '~/components/Posts/PostPreview'

  export default {
    components: {
      PostPreview,
    },
    props: {
      isAdmin: {
        type: Boolean,
        required: false,
      }
    }
  }
</script>

<style scoped>
  .post-list {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>
