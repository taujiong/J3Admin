<template>
  <q-card flat tag="article">
    <q-card-section class="q-pt-none">
      <div>
        <router-link :to="{name: 'home'}" class="text-h6">
          {{ post.title }}
        </router-link>
      </div>

      <div class="text-subtitle2 text-grey">
        {{ creatorName }} {{ updateTime }}
      </div>
    </q-card-section>

    <q-card-section class="q-py-none q-mb-none" tag="p">
      <div v-html="post.description"></div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { date } from 'quasar';
import { BlogPostDto } from 'src/models';
import { UserService, UserServiceProvider } from 'src/services';
import { injectFrom } from 'src/utils';
import { defineComponent, onMounted, PropType, ref } from 'vue';

export default defineComponent({
  name: 'PostAbstract',
  props: {
    post: {
      type: Object as PropType<BlogPostDto>,
      default: {} as BlogPostDto
    }
  },
  setup(props) {
    const updateTime = ref('');
    const creatorName = ref('');
    const userService = injectFrom<UserService>(UserServiceProvider.token);

    onMounted(async () => {
      const time = props.post.lastModificationTime ?? props.post.creationTime;
      updateTime.value = date.formatDate(time, 'YYYY年MM月D日');
      const creator = await userService.getUserById(props.post.creatorId ?? '');
      creatorName.value = creator.userName;
    });

    return { updateTime, creatorName };
  }
});
</script>
