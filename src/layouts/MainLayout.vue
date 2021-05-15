<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          aria-label="Menu"
          dense
          flat
          icon="menu"
          round
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          J3Admin
        </q-toolbar-title>

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- 全屏 -->
          <q-btn
            v-if="$q.screen.gt.sm"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            color="white"
            dense
            flat
            round
            @click="$q.fullscreen.toggle()"
          >
          </q-btn>

          <LanguageSwitcher />
          <UserMenu />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      class="bg-grey-1"
      show-if-above
    >
      <Navbar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import LanguageSwitcher from 'components/LanguageSwitcher.vue';
import Navbar from 'components/Navbar.vue';
import UserMenu from 'components/UserMenu.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: { Navbar, LanguageSwitcher, UserMenu },
  setup() {
    const leftDrawerOpen = ref(false);
    const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value;

    return { leftDrawerOpen, toggleLeftDrawer };
  }
});
</script>
