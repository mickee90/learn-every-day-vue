<template>
  <div class="bg-white shadow p-3 rounded w-5/6 content-width m-auto" v-if="post !== null">
    <!-- <div>
      <div style="background-image: url('')" class="bg-cover bg-center bg-gray-300 h-32 rounded"></div>
    </div>-->
    <div>
      <div class="mb-4">
        <BaseLabel id="title" required>Title</BaseLabel>
        <BaseInput
          id="title"
          :class="{ 'border-red-500 mb-3': $v.post.title.$error }"
          required
          placeholder="Title"
          autocomplete="title"
          autofocus
          v-model="post.title"
        />
        <p v-if="$v.post.title.$error" class="text-red-500 text-xs italic">Enter a title.</p>
      </div>

      <div class="mb-4">
        <BaseLabel id="published_date" required>Date</BaseLabel>
        <input
          id="published_date"
          type="date"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500 mb-3': $v.post.published_date.$error }"
          required
          placeholder="Date"
          autocomplete="date"
          autofocus
          :value="formatPublishedDate()"
          @change="event => (post.published_date = event.target.value)"
        />
        <p v-if="$v.post.published_date.$error" class="text-red-500 text-xs italic">
          Enter a date.
        </p>
      </div>

      <div class="mb-4">
        <BaseLabel id="content" required>Content</BaseLabel>
        <textarea
          id="content"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500 mb-3': $v.post.content.$error }"
          required
          v-model="post.content"
          rows="10"
        ></textarea>
        <p v-if="$v.post.content.$error" class="text-red-500 text-xs italic">Enter content.</p>
      </div>
    </div>
    <div class="mt-6 text-right border-t pt-3">
      <BaseButton id="saveBtn" class="btn-green" @click.prevent="onSave">Save</BaseButton>
      <BaseButton id="cancelBtn" class="btn-yellow" @click.prevent="onCancel">Cancel</BaseButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { fullDate } from "../../utils/DateTimes";
import { required } from "vuelidate/lib/validators";

export default {
  computed: {
    ...mapState("posts", ["post"])
  },
  methods: {
    ...mapActions("posts", ["editPost", "fetchPost"]),
    formatPublishedDate() {
      return fullDate(this.post.published_date);
    },
    async onSave() {
      // @TODO validation
      this.$v.$touch();

      if (
        this.$v.post.title.$error ||
        this.$v.post.published_date.$error ||
        this.$v.post.content.$error
      )
        return;

      this.editPost({
        id: this.post.id,
        title: this.post.title,
        published_date: this.post.published_date,
        content: this.post.content
      });
    },
    onCancel() {
      this.$router.back();
    }
  },
  async created() {
    this.fetchPost();
  },
  validations: {
    post: {
      title: {
        required
      },
      published_date: {
        required
      },
      content: {
        required
      }
    }
  }
};
</script>
<style scoped>
.content-width {
  max-width: 600px;
}
</style>
