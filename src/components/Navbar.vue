<template>
  <q-list>
    <template v-for="item of availableItems">
      <q-expansion-item v-if="item.children.length > 0"
                        :key="item.key + item.children.length"
                        :content-inset-level="(item.depth + 1) * 0.25"
                        :icon="item.iconName"
                        :label="t(item.displayNameKey)"
      >
        <Navbar :items="item.children"></Navbar>
      </q-expansion-item>
      <q-item v-else
              :key="item.key"
              :to="item.path"
      >
        <q-item-section avatar>
          <q-icon :name="item.iconName"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label v-t="item.displayNameKey"></q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script lang="ts">
import { NavbarItem } from 'src/models';
import { NavbarService, NavbarServiceProvider } from 'src/services';
import { provideIn, TreeNode } from 'src/utils';
import { defineComponent, PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Navbar',
  props: {
    items: {
      type: Object as PropType<Array<TreeNode<NavbarItem>>>,
      default: [] as Array<TreeNode<NavbarItem>>
    }
  },
  setup(props) {
    const { t } = useI18n();

    let availableItems = ref<Array<TreeNode<NavbarItem>>>(props.items);
    if (availableItems.value.length === 0) {
      const navbarService = provideIn<NavbarService>(NavbarServiceProvider);
      availableItems = navbarService.Items;
    }

    return { availableItems, t };
  }
});
</script>
