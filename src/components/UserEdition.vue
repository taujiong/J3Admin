<template>
  <q-card style="width: 600px">
    <q-card-section>
      <div class="text-h6">{{ t('AbpIdentity.User:Edit') }}</div>
    </q-card-section>

    <q-separator />

    <q-tabs
      v-model="tab"
      active-bg-color="white"
      active-color="primary"
      align="left"
      breakpoint="500"
      class="bg-grey-2"
      indicator-color="primary"
      narrow-indicator
      no-caps
    >
      <q-tab :label="t('AbpIdentity.UserInformations')" name="information" />
      <q-tab :label="t('AbpIdentity.Roles')" name="role" />
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="information">
        <div class="text-h6">Mails</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="role">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>

    <q-card-actions align="right">
      <q-btn v-close-popup :label="t('AbpUi.Cancel')" color="primary" flat />
      <q-btn v-close-popup :label="t('AbpUi.Save')" color="primary" flat />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'UserEdition',
  setup() {
    const { t } = useI18n();
    const tab = ref('information');

    return { tab, t };
  }
});
</script>
