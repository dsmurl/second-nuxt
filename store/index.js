import Veux from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Veux.Store({
    state: {
      loadedPosts: [

        ]
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
        state.loadedPosts[postIndex] = editedPost;
      },
      addPost(state, newPost) {
        state.loadedPosts.push(newPost);
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get(process.env.fireBaseUrl + 'posts.json')
          .then(response => {
            const postArray = [];
            for (const key in response.data) {
              postArray.push({ ...response.data[key], id: key});
            }

            vuexContext.commit('setPosts', postArray);
          })
          .catch(e => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      },
      editPost(vuexContext, postData) {
        const editedPost = {
          ...postData,
          updatedDate: new Date()
        };

        return axios.put(
          process.env.fireBaseUrl + 'posts/' + editedPost.id + '.json',
          editedPost)
          .then(response => {
            vuexContext.commit('editPost', editedPost);
            this.$toast.show('Post Saved!');
          })
          .catch(e => {
            this.$toast.error('Save Error: ' + e.toString());
          });
      },
      addPost(vuexContext, postData) {
        const createdPost = {
          ...postData,
          updatedDate: new Date()
        };

        return axios.post(process.env.fireBaseUrl + 'posts.json', createdPost)
          .then(response => {
            vuexContext.commit('addPost', {
              ...createdPost,
              id: response.data.name
            });
            this.$toast.show('Post Created!');
          })
          .catch(e => console.log(e));
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    },
  });
};

export default createStore;
