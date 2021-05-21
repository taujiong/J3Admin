<template>
  <q-dialog ref="dialogRef" persistent position="top">
    <q-card class="q-mt-xl" style="width: 500px">
      <q-card-section>
        <div class="text-h6">{{ t(`AbpIdentity.Role:${mode}`) }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-input v-model="roleDto.name"
                 :label="t('AbpIdentity.DisplayName:RoleName')"
                 dense outlined
        />
        <div class="q-gutter-md">
          <q-checkbox v-model="roleDto.isDefault"
                      :label="t('AbpIdentity.DisplayName:IsDefault')"
          />
        </div>
        <div class="q-gutter-md">
          <q-checkbox v-model="roleDto.isPublic"
                      :label="t('AbpIdentity.DisplayName:IsPublic')"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="t('AbpUi.Cancel')"
               color="primary"
               flat @click="onDialogCancel" />
        <q-btn :label="t('AbpUi.Save')"
               color="primary"
               flat @click="save(roleDto)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { IdentityRoleCreateDto, IdentityRoleDto, IdentityRoleUpdateDto } from 'src/models';
import { RoleService, RoleServiceProvider } from 'src/services';
import { injectFrom } from 'src/utils';
import { defineComponent, PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'RoleEdit',
  emits: [...useDialogPluginComponent.emits],
  props: {
    role: {
      type: Object as PropType<IdentityRoleDto>,
      default: undefined
    }
  },
  setup(props) {
    const roleService = injectFrom<RoleService>(RoleServiceProvider);
    const $q = useQuasar();
    const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const { t } = useI18n();

    const mode = ref(props.role ? 'Edit' : 'Create');
    const roleDto = ref(<IdentityRoleCreateDto | IdentityRoleUpdateDto>{});

    const save = async (role: IdentityRoleUpdateDto | IdentityRoleCreateDto) => {
      $q.loading.show();
      if (mode.value === 'Edit') await roleService.updateRole(props.role.id, role as IdentityRoleUpdateDto);
      else await roleService.createRole(role as IdentityRoleCreateDto);
      $q.loading.hide();
      onDialogOK();
    };

    if (mode.value === 'Edit') {
      roleDto.value = {
        concurrencyStamp: props.role.concurrencyStamp,
        isDefault: props.role.isDefault,
        isPublic: props.role.isPublic,
        name: props.role.name
      };
    }

    return { mode, roleDto, t, dialogRef, save, onDialogCancel };
  }
});
</script>
