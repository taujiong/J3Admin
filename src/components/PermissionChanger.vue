<template>
  <q-dialog ref="dialogRef" persistent position="top">
    <q-card class="q-mt-xl" style="width: 500px">
      <q-card-section>
        <div class="text-h6">{{ t('AbpIdentity.Permissions') }} - {{ entityDisplayName }}</div>
      </q-card-section>

      <q-separator />

      <div class="row" style="height: 500px">
        <template v-if="loaded">
          <q-scroll-area class="full-height col-4">
            <q-tabs v-model="tab"
                    active-bg-color="white"
                    active-color="primary"
                    indicator-color="primary"
                    no-caps vertical
            >
              <q-tab v-for="permissionGroup of permissionGroups"
                     :key="permissionGroup.name"
                     :label="permissionGroup.displayName"
                     :name="permissionGroup.name"
              />
            </q-tabs>
          </q-scroll-area>

          <q-tab-panels v-model="tab" class="col-8 full-height" vertical>
            <q-tab-panel v-for="permissionGroup of permissionGroups"
                         :key="permissionGroup.name"
                         :name="permissionGroup.name"
            >
              <q-tree v-model:ticked="granted"
                      :nodes="permissionTree(permissionGroup.permissions)"
                      default-expand-all
                      label-key="displayName"
                      no-connectors
                      node-key="name"
                      tick-strategy="leaf"
              >
              </q-tree>
            </q-tab-panel>
          </q-tab-panels>
        </template>

        <q-inner-loading :showing="!loaded" />
      </div>

      <q-card-actions align="right">
        <q-btn :label="t('AbpUi.Cancel')"
               color="primary" flat
               @click="onDialogCancel"
        />
        <q-btn :label="t('AbpUi.Save')"
               color="primary" flat
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { PermissionGrantInfoDto, PermissionGroupDto } from 'src/models';
import { PermissionService, PermissionServiceProvider } from 'src/services';
import { createTreeFromList, injectFrom, toTreeNode, TreeNode } from 'src/utils';
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'PermissionChanger',
  emits: [...useDialogPluginComponent.emits],
  props: {
    providerName: {
      type: String,
      default: ''
    },
    providerKey: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const permissionService = injectFrom<PermissionService>(PermissionServiceProvider);
    const { t } = useI18n();
    const { dialogRef, onDialogCancel } = useDialogPluginComponent();

    const tab = ref('');
    const loaded = ref(false);
    const entityDisplayName = ref('');
    const permissionGroups = ref<Array<PermissionGroupDto>>([]);
    const granted = ref<Array<string>>([]);

    const permissionTree = (permissions: Array<PermissionGrantInfoDto>) => {
      return createTreeFromList<PermissionGrantInfoDto, TreeNode<PermissionGrantInfoDto>>(
        permissions,
        permission => permission.name,
        permission => permission.parentName,
        permission => toTreeNode(permission)
      );
    };

    onMounted(async () => {
      const permissionResult = await permissionService.getPermissions(props);
      entityDisplayName.value = permissionResult.entityDisplayName;
      permissionGroups.value = permissionResult.groups;
      tab.value = permissionGroups.value[0].name;
      loaded.value = true;
    });

    return { entityDisplayName, permissionGroups, permissionTree, granted, loaded, dialogRef, onDialogCancel, t, tab };
  }
});
</script>
