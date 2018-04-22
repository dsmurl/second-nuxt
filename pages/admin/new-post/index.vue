<template>
  <div class="admin-new-post">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
  import AdminPostForm from '~/components/admin/AdminPostForm';
  import axios from 'axios';
  import config from '~/config/config.js';

  export default {
    components: {
      AdminPostForm,
    },
    methods: {
      onSubmitted(postData) {
        axios.post(config.fireBaseUrl + 'posts.json', postData)
          .then(result => {
            console.log(result);
            this.$toast.show('Post Created!');
          })
          .catch(e => console.log(e));
      }
    },
    layout: 'admin',
  }
</script>

<style scoped>
  .new-post-form {
    width: 90%;
    margin: 20px auto;
  }

  @media (min-width: 768px) {
    .new-post-form {
      width: 500px;
    }
  }
</style>
