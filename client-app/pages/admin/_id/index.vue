<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
  import AdminPostForm from '~/components/admin/AdminPostForm';
  import axios from 'axios';

  export default {
    components: {
      AdminPostForm,
    },
    asyncData(context) {
      return axios.get(process.env.fireBaseUrl + 'posts/' + context.params.id + '.json')
        .then(response => {
          const loadedPost = {
            ...response.data,
            id: context.params.id
          };

          return {
            loadedPost: loadedPost
          };
        })
        .catch(e => context.error(e));
    },
    methods: {
      onSubmitted(editedPost) {
        this.$store.dispatch('editPost', editedPost)
        .then(() => {
          this.$router.push('/admin');
        });
      }
    },
    // layout: 'admin',
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
