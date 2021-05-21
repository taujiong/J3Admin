<template>
  <q-dialog ref="dialogRef" persistent position="top">
    <q-card class="q-mt-xl" style="width: 560px">
      <q-card-section>
        <div class="text-h6">{{ t(`AbpIdentity.User:${mode}`) }}</div>
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
        <q-tab-panel class="q-gutter-y-md" name="information">
          <q-input v-model="userDto.userName"
                   :label="t('AbpIdentity.DisplayName:UserName')"
                   dense outlined
          />
          <q-input v-if="mode === 'Create'"
                   v-model="userDto.password"
                   :label="t('AbpIdentity.DisplayName:Password')"
                   dense
                   outlined type="password"
          />
          <q-input v-model="userDto.name"
                   :label="t('AbpIdentity.DisplayName:Name')"
                   dense outlined
          />
          <q-input v-model="userDto.surname"
                   :label="t('AbpIdentity.DisplayName:Surname')"
                   dense outlined
          />
          <q-input v-model="userDto.email"
                   :label="t('AbpIdentity.DisplayName:Email')"
                   dense outlined
          />
          <q-input v-model="userDto.phoneNumber"
                   :label="t('AbpIdentity.DisplayName:PhoneNumber')"
                   dense outlined
          />
          <div class="q-gutter-sm">
            <q-checkbox v-model="userDto.lockoutEnabled" :label="t('AbpIdentity.DisplayName:LockoutEnabled')" />
          </div>
        </q-tab-panel>

        <q-tab-panel name="role">
          <q-option-group v-model="userDto.roleNames"
                          :options="assignableRoles"
                          type="checkbox"
          />
        </q-tab-panel>
      </q-tab-panels>

      <q-card-actions align="right">
        <q-btn :label="t('AbpUi.Cancel')"
               color="primary"
               flat @click="onDialogCancel" />
        <q-btn :label="t('AbpUi.Save')"
               color="primary"
               flat @click="save(userDto)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { IdentityUserCreateDto, IdentityUserUpdateDto, IdentityUserWithRoleNames } from 'src/models';
import { UserService, UserServiceProvider } from 'src/services';
import { injectFrom } from 'src/utils';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'UserEdition',
  emits: [...useDialogPluginComponent.emits],
  props: {
    user: {
      type: Object as PropType<IdentityUserWithRoleNames>,
      default: undefined
    }
  },
  setup(props) {
    const userService = injectFrom<UserService>(UserServiceProvider);
    const $q = useQuasar();
    const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const { t } = useI18n();

    const mode = ref(props.user ? 'Edit' : 'Create');
    const userDto = ref(<IdentityUserUpdateDto | IdentityUserCreateDto>{ roleNames: [] as Array<string> });
    const assignableRoles = ref<Array<{ label: string, value: string }>>([]);
    const tab = ref('information');

    onMounted(async () => {
      const roles = await userService.getAssignableRoles();
      assignableRoles.value = roles.items.map(role => {
        return { label: role.name, value: role.name };
      });
    });

    const save = async (user: IdentityUserUpdateDto | IdentityUserCreateDto) => {
      $q.loading.show();
      if (mode.value === 'Edit') await userService.updateUser(props.user.id, user as IdentityUserUpdateDto);
      else await userService.createUser(user as IdentityUserCreateDto);
      $q.loading.hide();
      onDialogOK();
    };

    if (mode.value === 'Edit') {
      userDto.value = {
        concurrencyStamp: props.user.concurrencyStamp,
        email: props.user.email,
        lockoutEnabled: props.user.lockoutEnabled,
        name: props.user.name,
        password: '',
        phoneNumber: props.user.phoneNumber,
        roleNames: props.user.roleNames,
        surname: props.user.surname,
        userName: props.user.userName
      };
    }

    return { mode, userDto, assignableRoles, tab, t, dialogRef, save, onDialogCancel };
  }
});
</script>
