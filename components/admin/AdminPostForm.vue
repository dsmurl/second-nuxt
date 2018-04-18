<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

    <AppControlInput v-model="editedPost.title">Title</AppControlInput>

    <AppControlInput v-model="editedPost.thumbnailLink">Thumbnail Link</AppControlInput>

    <AppControlInput
      control-type="textarea"
      v-model="editedPost.content">Content
    </AppControlInput>

    <AppControlInput
      control-type="textarea"
      v-model="editedPost.previewText">Preview
    </AppControlInput>

    <AppButton type="submit">Save</AppButton>

    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel">Cancel
    </AppButton>
  </form>
</template>

<script>
  import AppControlInput from '~/components/UI/AppControlInput';
  import AppButton from '~/components/UI/AppButton';

  export default {
    props: {
      post: {
        type: Object,
        required: false,
      }
    },
    data() {
      return {
        editedPost: this.post
          ? {...this.post}
          : {
            author: '',
            title: '',
            thumbnailLink: '',
            previewText: '',
            content: '',
          }
      }
    },
    methods: {
      onSave() {
        // Save the post
        this.$emit('submit', {
          ...this.editedPost,
          updatedDate: new Date(),
        });
        this.$router.push('/admin');
      },
      onCancel() {
        // Cancel the post
        this.$router.push('/admin');
      },
    },
    components: {
      AppControlInput,
      AppButton,
    }
  }
</script>

