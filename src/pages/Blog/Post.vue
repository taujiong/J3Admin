<template>
  <q-page class="column" padding>
    <div class="text-h4">You have <span class="">{{ posts?.length }}</span> posts</div>
    <div class="q-mt-xl">
      <div v-for="post of posts" :key="post.id">
        <PostAbstract :post="post" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import PostAbstract from 'components/PostAbstract.vue';
import { BlogPostDto } from 'src/models';
import { PostService, PostServiceProvider } from 'src/services';
import { provideIn } from 'src/utils';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'Post',
  components: { PostAbstract },
  setup() {
    let posts = ref<Array<BlogPostDto>>();
    const postService = provideIn<PostService>(PostServiceProvider);
    onMounted(async () => {
      posts.value = (await postService.getPosts()).items;
    });

    return { posts };
  }
});
</script>
