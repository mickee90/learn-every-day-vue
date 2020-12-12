import axios from "@/axios";
import router from "@/router";
import { baseMessage } from "@/utils/FlashMessage";

const getters = {
  getPosts(state) {
    return state.posts;
  },
  getPost(state) {
    return state.post;
  }
};

const state = {
  posts: null,
  post: null
};

const actions = {
  async init({ commit }) {
    const response = await axios.get("/posts", { params: router.history.current.query });

    if (!response) {
      this.flashMessage.error(
        baseMessage({
          title: "Error",
          message: "Ops! Something went wrong. Please try again"
        })
      );
      return false;
    }

    commit("setPosts", response.data.data);
    commit("pagination/setPagination", response.data, { root: true });
  },

  /* eslint-disable-next-line */
  async createPost({ commit }, payload) {
    const response = await axios.post("/posts", {
      title: payload.title,
      published_date: payload.published_date,
      content: payload.content
    });

    if (!response) {
      this.flashMessage.error(
        baseMessage({
          title: "Error",
          message: "Ops! Something went wrong. Please try again"
        })
      );
      return false;
    }

    commit("addPost", response.data.data);

    router.push({
      name: "PostShow",
      params: { id: response.data.data.id }
    });
  },

  async fetchPost({ commit }) {
    const { id } = router.history.current.params;

    const response = await axios.get(`/posts/${id}`);

    if (!response) {
      this.flashMessage.error(
        baseMessage({
          title: "Error",
          message: "Ops! Something went wrong. Please try again"
        })
      );
      return false;
    }

    commit("setPost", response.data.data);
  },

  async deletePost({ commit, state }) {
    const response = await axios.delete(`/posts/${state.post.id}`);

    if (!response) {
      this.flashMessage.error(
        baseMessage({
          title: "Error",
          message: "Ops! Something went wrong. Please try again"
        })
      );
      return false;
    }

    commit("setPost", null);

    router.push({ name: "Posts" });
  },

  async editPost({ commit }, payload) {
    const response = await axios.put(`/posts/${payload.id}`, {
      title: payload.title,
      published_date: payload.published_date,
      content: payload.content
    });

    if (!response) {
      this.flashMessage.error(
        baseMessage({
          title: "Error",
          message: "Ops! Something went wrong. Please try again"
        })
      );
      return false;
    }

    commit("setPost", response.data.data);

    router.push({ name: "PostShow", params: { id: response.data.data.id } });
  }
};

const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setPost(state, post) {
    state.post = post;
  },
  addPost(state, post) {
    state.posts.push(post);
  },
  setPagination(state, paginationObject) {
    state.pagination = paginationObject;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
