import Posts from "@/views/Posts/Posts.vue";
import PostItem from "@/views/Posts/PostItem.vue";
import PaginationBox from "@/components/Layout/Paginationbox";
import { shallowMount } from "@vue/test-utils";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";

describe("@/views/Posts/Posts.vue", () => {
  let wrapper;
  let authState;
  let state;
  let posts;
  let paginationState;

  beforeEach(() => {
    posts = [
      {
        id: 1,
        user_id: 1,
        title: "First post",
        tags: [
          { id: 1, title: "USA", user_id: 1 },
          { id: 2, title: "Travel", user_id: 2 }
        ]
      },
      { id: 2, user_id: 1, title: "Second post", tags: [] },
      {
        id: 3,
        user_id: 1,
        title: "Third post",
        tags: [
          { id: 1, title: "Programming", user_id: 1 },
          { id: 3, title: "Javascript", user_id: 1 },
          { id: 4, title: "Vue", user_id: 1 },
          { id: 5, title: "Vuex", user_id: 1 },
          { id: 6, title: "Vue 2.0", user_id: 1 }
        ]
      },
      {
        id: 4,
        user_id: 2,
        title: "Fouth post",
        tags: [{ id: 7, title: "Programming", user_id: 2 }]
      }
    ];

    authState = {
      user: {
        id: 1,
        username: "johndoe@gmail.com"
      },
      isLoggedIn: true
    };
    state = {
      posts: null
    };
    paginationState = {
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

    wrapper = mountWithStore(authState, state, paginationState);
  });

  it("Lists correct number of posts", async () => {
    state.posts = posts;
    wrapper.vm.sortedPosts = posts;
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(".post-item").length).toBe(4);
  });
  // @TODO: Requires axios + backend api mock
  // it("Only lists the posts made by the user", async () => {});

  // @TODO: Check if the loader disappears after the fetch is done
  it("It shows a loader before the posts is fetched", async () => {
    expect(wrapper.findComponent(BounceLoader).exists()).toBe(true);

    state.posts = posts;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(BounceLoader).exists()).toBe(false);
  });
  it("Shows text to explain if the user does not have any posts", async () => {
    state.posts = [];
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("You have not created any posts yet.");
  });
  it("Includes a 'create new post'-button", async () => {
    expect(wrapper.find("#create_post_btn").text()).toContain("New");
  });
});

function mountWithStore(authState, state, paginationState) {
  const actions = {
    init: jest.fn()
  };

  return shallowMount(Posts, {
    ...createComponentMocks({
      store: {
        auth: {
          state: authState
        },
        posts: {
          state,
          actions
        },
        pagination: {
          state: paginationState
        }
      },
      stubs: {
        PostItem,
        BounceLoader,
        PaginationBox
      },
      router: true
    })
  });
}
