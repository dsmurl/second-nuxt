import Veux from 'vuex'

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
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              loadedPosts: [
                {
                  id: "1",
                  thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIZ8WPUYMRIXtHZTl9ZoSq3hVjkQug9SD1v_GdrRmI8A7H968",
                  title: "Server Stuff!!",
                  previewText: "Servers are crazy.  This post is about servers and all the crazy things you can do with them.",
                },
                {
                  id: "2",
                  thumbnail: "https://img.etimg.com/thumb/msid-62427644,width-300,imgsize-172533,resizemode-4/tech-thinkstock.jpg",
                  title: "Data Stuff!!",
                  previewText: "Data is crazy stuff.  This post is about data and all the crazy things you can do with data.",
                },
                {
                  id: "3",
                  thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIZ8WPUYMRIXtHZTl9ZoSq3hVjkQug9SD1v_GdrRmI8A7H968",
                  title: "Server Stuff!!",
                  previewText: "Servers are crazy.  This post is about servers and all the crazy things you can do with them.",
                },
              ]
            });
          }, 1500);

          // reject(new Error());
        })
          .then(data => {
            vuexContext.commit('setPosts', data.loadedPosts);
          })
          .catch(e => {
            context.error(e);
          });
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
