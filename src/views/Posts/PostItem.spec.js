import Vue from "vue";
import PostItem from "@/views/Posts/PostItem.vue";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.component("font-awesome-icon", FontAwesomeIcon);

describe("@/views/Posts/PostItem.vue", () => {
  let post = {
    id: 1,
    title: "One post",
    published_date: "2020-08-20 20:20:20",
    content: "Lorem etc",
    tags: [
      { id: 1, title: "Programing", user_id: 1 },
      { id: 3, title: "Javascript", user_id: 1 },
      { id: 4, title: "Vue", user_id: 1 },
      { id: 5, title: "Vuex", user_id: 1 },
      { id: 6, title: "Vue 2.0", user_id: 1 }
    ]
  };
  const display_date_format = "2020-08-20";
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PostItem, {
      propsData: { post },
      stubs: { RouterLink: RouterLinkStub, "font-awesome-icon": true }
    });
  });

  it("Shows title and publish date", () => {
    expect(wrapper.text()).toContain(post.title);
    expect(wrapper.text()).toContain(display_date_format);
  });

  it("Adds correct url", () => {
    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: "PostShow",
      params: { id: post.id }
    });
  });
  it("should not show inactive tag icon if the post has tags connected", async () => {
    await wrapper.setProps({ post: { ...post, tags: [] } });

    expect(wrapper.find(".tag-icon").exists()).toBe(false);
  });
  it("should only show the first 3 names of the tags if they exists", () => {
    expect(wrapper.text()).toContain("Programing");
    expect(wrapper.text()).toContain("Javascript");
    expect(wrapper.text()).toContain("Vue");
  });
  it("should show the number tags if exceeded 3", () => {
    expect(wrapper.text()).toContain("Programing");
    expect(wrapper.text()).toContain("Javascript");
    expect(wrapper.text()).toContain("Vue");
    expect(wrapper.text()).toContain("(+2)");
    expect(wrapper.find(".exceeded-tags-counter").exists()).toBe(true);
  });
  it("should not show the number tags if less than 3", async () => {
    await wrapper.setProps({
      post: { ...post, tags: [{ id: 1, title: "Programing", user_id: 1 }] }
    });

    expect(wrapper.find(".exceeded-tags-counter").exists()).toBe(false);
  });
});
