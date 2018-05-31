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

            // Set local storage
            localStorage.setItem('userIdToken', response.data.idToken);
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userExpireTime', `${new Date().getTime() + Number.parseInt(response.data.expiresIn) * 1000}`);

            // Set cookie
            Cookie.set('userIdToken', response.data.idToken);
            Cookie.set('userEmail', response.data.email);
            Cookie.set('userExpireTime', `${new Date().getTime() + Number.parseInt(response.data.expiresIn) * 1000}`);

            this.$router.push('/');
            this.$toast.show('Logged in as ' + authData.email);
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

        if (req) {
          if (!req.headers.cookie) { return; }

          userIdToken = findCookieValue(req.headers.cookie, 'userIdToken');
          userEmail = findCookieValue(req.headers.cookie, 'userEmail');
          userExpireTime = findCookieValue(req.headers.cookie, 'userExpireTime');
        } else {
          userIdToken = localStorage.getItem('userIdToken');
          userEmail = localStorage.getItem('userEmail');
          userExpireTime = localStorage.getItem('userExpireTime');
        }

        if (new Date().getTime() > Number.parseInt(userExpireTime) || !userIdToken) {
          vuexContext.commit('clearUser');
          this.$toast.error('User Auth Timed Out');
          return;
        }

        vuexContext.commit('setUser', {
          userIdToken: userIdToken,
          userEmail: userEmail
        });
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
