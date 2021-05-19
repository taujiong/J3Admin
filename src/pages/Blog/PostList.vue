<template>
  <q-page padding>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h5">{{ t('Blogging.Post:Count', posts.totalCount) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn :to="{name: 'post-create'}"
                 color="primary"
                 icon="add"
                 round />
        </q-item-section>
      </q-item>

      <template v-for="post of posts.items" :key="post.id">
        <q-separator spaced="sm" />

        <q-item>
          <q-item-section>
            <q-item-label class="text-primary text-h5 q-pb-sm">{{ post.title }}</q-item-label>
            <q-item-label class="text-body1" lines="3" style="line-height: 1.8!important;">
              {{ post.description }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="q-gutter-xs">
              <q-btn :to="{name: 'post-detail', params: {postId: post.id}}"
                     class="gt-xs" dense flat
                     icon="remove_red_eye" round
                     size="16px" />
              <q-btn :to="{name: 'post-edit', params: {postId: post.id}}"
                     class="gt-xs" dense flat
                     icon="mode_edit" round
                     size="16px" />
              <q-btn class="gt-xs"
                     dense flat icon="delete"
                     round size="16px"
                     @click="deletePost(post)" />
            </div>
          </q-item-section>
        </q-item>
      </template>
    </q-list>

    <div class="row justify-center">
      <q-pagination v-if="maxPage > 1"
                    v-model="currentPage"
                    :max="maxPage"
                    :model-value="currentPage"
                    input />
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { BlogPostDto, PagedResultDto } from 'src/models';
import { PostService, PostServiceProvider } from 'src/services';
import { injectFrom } from 'src/utils';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Post',
  setup() {
    const postService = injectFrom<PostService>(PostServiceProvider, true);
    const $q = useQuasar();
    const { t } = useI18n();

    const maxResultCount = 5;
    let posts = ref(<PagedResultDto<BlogPostDto>>{});
    const currentPage = ref(1);
    const maxPage = computed(() => Math.ceil(posts.value.totalCount / maxResultCount));

    const deletePost = (post: BlogPostDto) => {
      $q.dialog({
        title: t('Blogging.Post:Delete'),
        message: t('Blogging.Post:DeleteConfirm', { postName: post.title }),
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await postService.deletePost(post.id);
        posts.value = await postService.getPosts({ maxResultCount });
      });
    };

    watch<number>(currentPage, async newPage => {
      const skipCount = (newPage - 1) * maxResultCount;
      posts.value = await postService.getPosts({ maxResultCount, skipCount });
    });

    onMounted(async () => {
      posts.value = await postService.getPosts({ maxResultCount });
    });

    return { posts, deletePost, t, maxPage, currentPage };
  }
});
</script>
