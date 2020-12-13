<template>
  <router-link
    :to="{ name: 'PostShow', params: { id: post.id } }"
    class="w-full p-1 m-auto block post-item no-underline"
    v-if="post"
  >
    <div class="bg-white border rounded shadow p-2">
      <div class="flex flex-row items-center">
        <div class="flex-1 text-right px-1">
          <div class="flex justify-between">
            <div>
              <div class="flex" v-if="hasTags">
                <font-awesome-icon :icon="getTagIcon" class="tag-icon text-6xl" />
                <div class="leading-5 ml- ml-2 text-xs">
                  <span v-text="getTagNames"></span>
                  <span
                    v-if="exceededTagNumber"
                    class="exceeded-tags-counter"
                    v-text="`(+${exceededTagNumber})`"
                  ></span>
                </div>
              </div>
            </div>
            <h5 class="font-bold uppercase text-gray-500" v-text="formatPublishedDate(post)"></h5>
          </div>
          <h3 class="font-bold text-3xl" v-text="formatTitle(post)"></h3>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
import { fullDate } from "@/utils/DateTimes";

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      maxVisibleTagNames: 3
    };
  },
  computed: {
    exceededTagNumber() {
      if (!this.hasTags) return null;

      const exceededTagNumber = this.post.tags.length - this.maxVisibleTagNames;
      return exceededTagNumber > 0 ? exceededTagNumber : null;
    },
    getTagNames() {
      let tagNames = "";

      if (!this.hasTags) return tagNames;

      const tags = [];
      for (let i = 0; i < this.maxVisibleTagNames; i++) {
        if (this.post.tags[i]) {
          tags.push(this.post.tags[i].title);
        }
      }

      tagNames = tags.join(",");

      return tagNames;
    },
    getTagIcon() {
      return this.post.tags && this.post.tags.length > 1 ? "tags" : "tag";
    },
    hasTags() {
      return this.post.tags && this.post.tags.length > 0;
    }
  },
  methods: {
    formatTitle(post) {
      return post.title;
    },
    formatPublishedDate(post) {
      const published_date = fullDate(post.published_date);
      const current_date = fullDate(new Date());
      return published_date === current_date ? "Today" : published_date;
    }
  }
};
</script>
<style scoped>
.tag-icon {
  width: 20px;
  height: 20px;
}
.tag-text-container {
  margin-left: 10px;
  font-size: 0.75rem;
  line-height: 1.25rem;
}
</style>
