<template>
  <nuxt-link :to="postLink" class="post-preview">
    <div
      class="post-thumbnail"
      :style="{backgroundImage: 'url(\'' + imageLink +'\')'}"
    ></div>
    <div class="post-content">
      <h1>{{ title }}</h1>
      <p>{{ previewText }}</p>
    </div>
  </nuxt-link>
</template>

<script>
  import path from 'path';

  export default {
    name: 'PostPreview',
    props: {
      id: {
        type: String,
        required: true
      },
      isAdmin: {
        type: Boolean,
        required: false,
      },
      title: {
        type: String,
        required: true,
      },
      previewText: {
        type: String,
        required: true,
      },
      imageName: {
        type: String,
        required: true,
      }
    },
    computed: {
      postLink() {
        return this.isAdmin ? '/admin/' + this.id : '/posts/' + this.id;
      },
      imageLink() {
        return 'http://' + path.join(process.env.imageServerBaseUrl, this.imageName);
      }
    }
  }
</script>

<style scoped>
  .post-preview {
    border: 1px solid #ccc;
    box-shadow: 0 2px 2px #ccc;
    background-color: white;
    width: 90%;
    margin: 10px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  @media (min-width: 850px) {
    .post-preview {
      width: 400px;
      margin: 10px;
    }
  }

  .post-thumbnail {
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: cover;
  }

  .post-content {
    padding: 10px;
    text-align: center;
  }

  a:hover .post-content,
  a:active .post-content {
    background-color: #ccc;
  }

  h1 {
    font-size: 1.5em;
    line-height: 1.5em;
    -webkit-margin-before: 0.83em;
    -webkit-margin-after: 0.83em;
  }
</style>

