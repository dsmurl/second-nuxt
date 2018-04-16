<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">
          Written by {{ loadedPost.author }}
        </div>
        <div class="post-detail">
          Last updated on {{ loadedPost.updatedDate }}
        </div>
      </div>
      <p class="post-content">
        {{ loadedPost.content }}
      </p>
      <div class="post-feedback">
        <p>
          Let me know what you think about the post, send email to <a href="mailto:dsmurl@gmail.com">Dsmurl@gmail.com</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    asyncData(context, callback) {
      setTimeout(
        callback(null, {
          loadedPost: {
              id: "1",
              thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIZ8WPUYMRIXtHZTl9ZoSq3hVjkQug9SD1v_GdrRmI8A7H968",
              title: "Server Stuff from asyncData!!   (ID: " + context.route.params.id + ")",
              author: "Samuel B.",
              updatedDate: new Date(),
              content: 'Some dummy text, which isnt the preveiw text.',
              previewText: "Servers are crazy.  This post is about servers and all the crazy things you can do with them.",
            }
          }
        ), 1000
      );
    }
  }
</script>

<style scoped>
  .single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
  }

  .post {
    width: 100%;
  }

  @media (min-width: 768px) {
    .post {
      width: 600px;
      margin: auto;
    }
  }

  .post-title {
    margin: 0;
  }

  .post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .post-details {
      flex-direction: row;
    }
  }

  .post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
  }

  .post-feedback a {
    color: red;
    text-decoration: none;
  }

  .post-feedback a:hover,
  .post-feedback a:active {
    color: salmon;
  }
</style>
