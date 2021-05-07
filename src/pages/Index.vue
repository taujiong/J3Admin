<template>
  <q-page class='row items-center justify-evenly'>
    <q-btn @click='login'>login</q-btn>
    <example-component
      :meta='meta'
      :todos='todos'
      active
      title='Example component'
    ></example-component>
  </q-page>
</template>

<script lang='ts'>
import ExampleComponent from 'components/CompositionComponent.vue';
import { Meta, Todo } from 'components/models';
import { useStore } from 'src/store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Index',
  components: { ExampleComponent },
  setup() {
    const $store = useStore();
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      }
    ]);
    const meta = ref<Meta>({
      totalCount: 1200
    });
    const login = () => $store.dispatch('user/signIn');
    return { todos, meta, login };
  }
});
</script>
