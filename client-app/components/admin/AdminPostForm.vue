<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="postData.author">Author Name</AppControlInput>

    <AppControlInput v-model="postData.title">Title</AppControlInput>

    <AppControlInput v-model="postData.imageName">Thumbnail FileName</AppControlInput>

    <AppControlInput
      control-type="textarea"
      v-model="postData.content">Content
    </AppControlInput>

    <AppControlInput
      control-type="textarea"
      v-model="postData.previewText">Preview
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

  export default {
    props: {
      post: {
        type: Object,
        required: false,
      }
    },
    data() {
      return {
        postData: this.post
          ? {...this.post}
          : {
            author: '',
            title: '',
            imageName: '',
            previewText: '',
            content: '',
          }
      }
    },
    methods: {
      onSave() {
        // Save the post
        this.$emit('submit', this.postData);
      },
      onCancel() {
        // Cancel the post
        this.$router.push('/admin');
      },
    },
  }
</script>

