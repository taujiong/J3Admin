<template>
  <q-page class="q-gutter-y-md" padding>
    <q-input v-model="title" :label="t('Blogging.Post:Title')" filled model-value="">
      <template #after>
        <q-btn :label="t('Blogging.Submit')" @click="submit" />
      </template>
    </q-input>
    <q-input v-model="description" :label="t('Blogging.Post:Description')" filled model-value="" type="textarea" />
    <div id="post"></div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { BlogPostWithDetailDto } from 'src/models';
import { defaultVditorOptions } from 'src/presets';
import { PostService, PostServiceProvider } from 'src/services';
import { injectFrom } from 'src/utils';
import Vditor from 'vditor';
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'PostEdit',
  props: {
    postId: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    const postService = injectFrom<PostService>(PostServiceProvider, true);
    const $q = useQuasar();
    const { t } = useI18n();

    let editor: Vditor;
    const title = ref('');
    const description = ref('');
    let post: BlogPostWithDetailDto;

    onMounted(async () => {
      editor = new Vditor('post', defaultVditorOptions);
      if (props.postId) {
        post = await postService.getPostById(props.postId);
        title.value = post.title;
        description.value = post.description;
        editor.setValue(post.content);
      }
    });

    async function submit() {
      try {
        $q.loading.show();
        const modifiedPost = {
          title: title.value,
          content: editor.getValue(),
          description: description.value,
          tags: ''
        };
        if (props.postId) {
          modifiedPost.tags = post.tags.join(',');
          await postService.updatePost(props.postId, modifiedPost);
          $q.notify({
            type: 'positive',
            message: '更新成功'
          });
        } else {
          modifiedPost.tags = 'test';
          await postService.createPost(modifiedPost);
          $q.notify({
            type: 'positive',
            message: '创建成功'
          });
        }
      } catch (e) {
        $q.notify({
          type: 'negative',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          message: `操作失败。${ e.message }`
        });
      } finally {
        $q.loading.hide();
      }
    }

    return { title, description, submit, t };
  }
});
</script>
