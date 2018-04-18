import Veux from 'vuex';
import axios from 'axios';
import config from '~/config/config.js';

const createStore = () => {
  return new Veux.Store({
    state: {
      loadedPosts: [

        ]
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get(config.fireBaseUrl + 'posts.json')
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
