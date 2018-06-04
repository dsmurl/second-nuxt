import Veux from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';
import { findCookieValue } from '~/util/util.js';

const createStore = () => {
  return new Veux.Store({
    state: {
      loadedPosts: [

        ],
      userIdToken: null,
      userEmail: null
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
      },
      setUser(state, userData) {
        state.userIdToken = userData.userIdToken;
        state.userEmail = userData.userEmail;
      },
      clearUser(state) {
        state.userIdToken = null;
        state.userEmail = null;
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
          process.env.fireBaseUrl + 'posts/' + editedPost.id + '.json?auth=' + vuexContext.state.userIdToken,
          editedPost)
          .then(response => {
            vuexContext.commit('editPost', editedPost);
            this.$toast.show('Post Saved!');
          })
          .catch(e => {
            console.log(e);
            this.$toast.error('Save Post Error: ' + e.toString());
          });
      },
      addPost(vuexContext, postData) {
        const createdPost = {
          ...postData,
          updatedDate: new Date()
        };

        return axios.post(process.env.fireBaseUrl + 'posts.json?auth=' + vuexContext.state.userIdToken, createdPost)
          .then(response => {
            vuexContext.commit('addPost', {
              ...createdPost,
              id: response.data.name
            });
            this.$toast.show('Post Created!');
          })
          .catch(e => {
            console.log(e);
            this.$toast.error('Add Post Error: ' + e.toString());
          });
      },
      authenticateUser(vuexContext, authData) {
        let targetUrl = authData.isLogin
          ? process.env.fireAuthSigninUrl + process.env.fireApiKey
          : process.env.fireAuthSignupUrl + process.env.fireApiKey;

        return axios.post(
          targetUrl,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then(response => {
            vuexContext.commit('setUser', {
              userIdToken: response.data.idToken,
              userEmail: response.data.email
            });

            // Set cookie
            Cookie.set('userIdToken', response.data.idToken);
            Cookie.set('userEmail', response.data.email);
            Cookie.set('userExpireTime', `${new Date().getTime() + Number.parseInt(response.data.expiresIn) * 1000}`);

            this.$router.push('/');
            this.$toast.show('Logged in as ' + authData.email);

            // Example api calls
            // return axios.post('/api/track-data', { data: 'Auth checked'})
            //   .then(() => {
            //     return axios.get('/api/env-data');
            //   });
          })
          .catch(e => {
            console.log(e);
            this.$toast.error('Auth Error: ' + e.toString());
          });
      },
      initAuth(vuexContext, req) {
        let userIdToken = null;
        let userEmail = null;
        let userExpireTime = null;
        let cookies = null;

        if (req) {
          if (!req.headers.cookie) { return; }

          cookies = req.headers.cookie;
        } else {
          if (process.client) {
            cookies = document.cookie;
          }
        }

        if (cookies != null) {
          userIdToken = findCookieValue(cookies, 'userIdToken');
          userEmail = findCookieValue(cookies, 'userEmail');
          userExpireTime = findCookieValue(cookies, 'userExpireTime');
        }

        if (new Date().getTime() > Number.parseInt(userExpireTime) || !userIdToken) {
          vuexContext.dispatch('logout');

          return;
        }

        vuexContext.commit('setUser', {
          userIdToken: userIdToken,
          userEmail: userEmail
        });
      },
      logout(vuexContext) {
          vuexContext.commit('clearUser');

          Cookie.remove('userIdToken');
          Cookie.remove('userEmail');
          Cookie.remove('userExpireTime');
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.userIdToken != null;
      },
      isAdmin(state) {
        return (
          (state.userIdToken != null) &&
          (state.userEmail === process.env.adminEmail)
        );
      }
    }
  });
};

export default createStore;
