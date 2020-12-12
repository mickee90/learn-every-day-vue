<template>
  <div id="pagination_box" class="flex justify-between" v-if="pageLinks.length > 1">
    <div class="link_btn" id="previous_page">
      <a
        href="#"
        id="previous_page_link"
        v-if="previousPage"
        @click.prevent="goToPage(currentPage - 1)"
        >Previous</a
      >
    </div>
    <div class="page_link_wrapper flex items-center">
      <div
        class="page_link link_btn"
        v-for="pageLink in sortedPageLinks"
        :key="pageLink.url"
        :class="pageLink.sort === currentPage ? 'active' : ''"
      >
        <a
          href="#"
          @click.prevent="goToPage(pageLink.sort)"
          v-text="pageLink.title"
          :class="parseInt(currentPage) === parseInt(pageLink.sort) ? 'active' : ''"
        ></a>
      </div>
    </div>
    <div class="link_btn" id="next_page">
      <a href="#" id="next_page_link" v-if="nextPage" @click.prevent="goToPage(currentPage + 1)"
        >Next</a
      >
    </div>
  </div>
</template>

<script>
import { getQueryStringParams } from "@/utils/Urls";

export default {
  props: {
    currentPage: {
      type: Number
    },
    pageSize: {
      type: Number
    },
    pageLinks: {
      type: Array,
      default: function() {
        return [];
      }
    },
    previousPage: {
      type: String,
      default: ""
    },
    nextPage: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      sortedPageLinks: []
    };
  },
  methods: {
    goToPage(page) {
      const params = getQueryStringParams(window.location.search);
      this.$router.replace({
        name: "Posts",
        query: { ...params, page }
      });
    }
  },
  created() {
    if (this.pageLinks.length > 0) {
      this.sortedPageLinks = this.pageLinks.sort((a, b) =>
        a.sort > b.sort ? 1 : b.sort > a.sort ? -1 : 0
      );
    }
  }
};
</script>

<style scoped>
#pagination_box {
  line-height: 40px;
  border-top: 3px solid #e2e2e2;
  margin: 10px 10px 30px 10px;
}

#pagination_box a {
  text-decoration: none;
  display: block;
}

.page_link_wrapper .page_link {
  width: 30px;
  text-align: center;
}

.link_btn.active,
.link_btn:hover {
  border-top: 3px solid #3181ce;
  margin-top: -3px;
}

#previous_page,
#next_page {
  width: 10%;
}
#next_page {
  text-align: right;
}
</style>
