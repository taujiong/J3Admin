<template>
  <q-page padding>
    <q-list padding>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h5">{{ $tc('Blogging.Post:Count', posts.length) }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced="md" />

      <template v-for="post of posts" :key="post.id">
        <q-item>
          <q-item-section>
            <q-item-label class="text-primary text-h5 q-pb-md">{{ post.title }}</q-item-label>
            <q-item-label class="text-body1" lines="2" style="line-height: 1.8!important;">{{ post.description }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="q-gutter-xs">
              <q-btn class="gt-xs" dense flat icon="remove_red_eye" round size="16px"></q-btn>
              <q-btn class="gt-xs" dense flat icon="mode_edit" round size="16px"></q-btn>
              <q-btn class="gt-xs" dense flat icon="delete" round size="16px"></q-btn>
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced="xl" />
      </template>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { BlogPostDto } from 'src/models';
import { PostService, PostServiceProvider } from 'src/services';
import { provideIn } from 'src/utils';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'Post',
  setup() {
    const postService = provideIn<PostService>(PostServiceProvider);

    let posts = ref<Array<BlogPostDto>>([]);
    onMounted(async () => {
      posts.value = (await postService.getPosts()).items ?? [];
    });

    return { posts };
  }
});
</script>
