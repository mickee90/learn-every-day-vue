const state = {
  pagination: {
    currentPage: 1,
    pageSize: 15,
    currentSortId: 1,
    sortItems: [
      { id: 1, title: "Date - Desc", sortProp: "published_date", sortType: "desc" },
      { id: 2, title: "Date - Asc", sortProp: "published_date", sortType: "asc" },
      { id: 3, title: "Title - Desc", sortProp: "title", sortType: "desc" },
      { id: 4, title: "Title - Asc", sortProp: "title", sortType: "asc" }
    ]
  }
};

const getters = {
  getCurrentPage(state) {
    return state.pagination.currentPage;
  },
  getPageSize(state) {
    return state.pagination.pageSize;
  },
  getCurrentSortId(state) {
    return state.pagination.currentSortId;
  },
  getSortItems(state) {
    return state.pagination.sortItems;
  },
  getCurrentSortItem(state) {
    return state.pagination.sortItems.find(item => item.id === state.pagination.currentSortId);
  }
};

const mutations = {
  setCurrentPage(state, currentPage) {
    state.pagination.currentPage = currentPage;
  },
  setPageSize(state, pageSize) {
    state.pagination.pageSize = pageSize;
  },
  setCurrentSortId(state, currentSortId) {
    state.pagination.currentSortId = currentSortId;
  },
  setPagination(state, paginaiton) {
    state.pagination = { ...paginaiton };
  }
};

const actions = {
  setCurrentPage({ commit }, currentPage) {
    commit("setCurrentPage", currentPage);
  },
  setPageSize({ commit }, pageSize) {
    commit("setPageSize", pageSize);
  },
  setCurrentSortId({ commit }, currentSortId) {
    commit("setCurrentSortId", currentSortId);
  },
  setPagination({ commit }, paginaiton) {
    commit("setPagination", paginaiton);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
