<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost"/>
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
    asyncData(context) {
      return axios.get(config.fireBaseUrl + 'posts/' + context.params.id + '.json')
        .then(response => {
          return {
            loadedPost: response.data
          };
        })
        .catch(e => context.error(e));
    },
    layout: 'admin',
  }
</script>

<style scoped>
  .update-form {
    width: 90%;
    margin: 20px auto;
  }
  @media (min-width: 768px) {
    .update-form {
      width: 500px;
    }
  }
</style>
