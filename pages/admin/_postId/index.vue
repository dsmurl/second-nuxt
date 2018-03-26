<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost"/>
    </section>
  </div>
</template>

<script>
  import AdminPostForm from '~/components/admin/AdminPostForm';

  export default {
    components: {
      AdminPostForm,
    },
    data() {
      return {
        loadedPost: {
          author: 'Samuel Bagot',
          title: 'My awesome post!',
          content: 'Super amazing content, you should donate!',
          thumbnailLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIZ8WPUYMRIXtHZTl9ZoSq3hVjkQug9SD1v_GdrRmI8A7H968',
        }
      }
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
