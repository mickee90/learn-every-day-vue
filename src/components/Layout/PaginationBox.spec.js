import PaginationBox from "@/components/Layout/PaginationBox";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";

describe("@/components/Layout/PaginationBox", () => {
  let wrapper;
  let pageLinks;
  // let defaultPageSize = 15;

  beforeEach(() => {
    let pageLinks = [];
    let defaultCurrentPage = 2;

    for (let i = 1; i <= 3; i++) {
      pageLinks.push({
        url: `/api/v1/posts/${i}`,
        sort: i,
        title: i
      });
    }

    wrapper = shallowMount(PaginationBox, {
      propsData: { pageLinks, currentPage: defaultCurrentPage },
      stubs: { RouterLink: RouterLinkStub }
    });
  });

  it("should not show if the pageLinks is less than one", async () => {
    await wrapper.setProps({ pageLinks: [] });

    expect(wrapper.find("#pagination_box").exists()).toBe(false);
  });

  it("should show if the pageLinks is more than one", () => {
    expect(wrapper.find("#pagination_box").exists()).toBe(true);
  });

  it("should show all the pageLinks in correct order", () => {
    const box = wrapper.find("#pagination_box");
    const links = box.findAll("div.page_link");

    expect(links.length).toBe(3);

    expect(links.at(0).element.innerHTML).toContain("1");
    expect(links.at(1).element.innerHTML).toContain("2");
    expect(links.at(2).element.innerHTML).toContain("3");
  });

  it("highlights the current page link", () => {
    const box = wrapper.find("#pagination_box");
    const links = box.findAll("div.page_link");

    expect(
      links
        .at(1)
        .find("a")
        .classes()
    ).toContain("active");
  });

  it("do not show previous page button if it doesn't exists", () => {
    expect(wrapper.find("#previous_page_link").exists()).toBe(false);
  });

  it("show previous page button if it exists", async () => {
    await wrapper.setProps({ previousPage: "/to/previous/page" });

    expect(wrapper.find("#previous_page_link").exists()).toBe(true);
  });

  it("do not show next page button if it doesn't exists", () => {
    expect(wrapper.find("#next_page_link").exists()).toBe(false);
  });

  it("show next page button if it exists", async () => {
    await wrapper.setProps({ nextPage: "/to/next/page" });

    expect(wrapper.find("#next_page_link").exists()).toBe(true);
  });
});
