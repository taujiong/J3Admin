<template>
  <div v-for="post of posts" :key="post.id">{{ post.title }}</div>
</template>

<script lang="ts">
import { BlogPostDto } from 'src/models';
import { PostService, PostServiceProvider } from 'src/services';
import { provideIn } from 'src/utils';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'Post',
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
