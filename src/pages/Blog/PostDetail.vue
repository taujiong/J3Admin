<template>
  <q-page padding>
    <div class="vditor-reset">
      <div id="preview"></div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defaultPreviewOptions } from 'src/presets/vditor';
import { PostService, PostServiceProvider } from 'src/services';
import { provideIn } from 'src/utils';
import Vditor from 'vditor';
import { defineComponent, onMounted } from 'vue';


export default defineComponent({
  name: 'PostPreview',
  props: {
    postId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const postService = provideIn<PostService>(PostServiceProvider);

    onMounted(async () => {
      const post = await postService.getPostById(props.postId);
      const md = `# ${ post.title }\n\n${ post.description }\n\n${ post.content }`;
      const previewEle = document.getElementById('preview') as HTMLDivElement;
      await Vditor.preview(previewEle, md, defaultPreviewOptions);
    });

    return;
  }
});
</script>
