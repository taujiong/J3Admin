<template>
  <q-page padding>
    <q-table v-model:pagination="pagination"
             :columns="columns" :loading="loading"
             :rows="rows" row-key="name"
             @request="fetchRoles"
    >
      <!-- 表头部区域 -->
      <template #top>
        <span v-t="'AbpIdentity.Roles'" class="text-h5" />
        <q-space />
        <q-btn :label="t('AbpIdentity.Role:Create')"
               color="primary"
               @click="createRole"
        />
      </template>

      <!-- 表头 -->
      <template #header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-size: 16px"
          >
            <span v-t="col.label" />
          </q-th>
          <q-th />
        </q-tr>
      </template>

      <!-- 表主体 -->
      <template #body="props">
        <q-tr :props="props">
          <q-td key="roleName" :props="props">
            <span class="text-body2">{{ props.row.name }}</span>
          </q-td>

          <q-td auto-width>
            <q-btn-dropdown :label="t('AbpIdentity.DatatableActionDropdownDefaultText')" icon="settings">
              <q-list>
                <q-item v-close-popup clickable @click="editRole(props.row)">
                  <q-item-section>
                    <q-item-label>{{ t('AbpIdentity.Edit') }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-close-popup clickable @click="changePermission(props.row)">
                  <q-item-section>
                    <q-item-label>{{ t('AbpIdentity.Permission:ChangePermissions') }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-close-popup clickable @click="deleteRole(props.row)">
                  <q-item-section>
                    <q-item-label>{{ t('AbpIdentity.Delete') }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import PermissionChanger from 'components/PermissionChanger.vue';
import RoleEdit from 'components/RoleEdition.vue';
import { QTable, useQuasar } from 'quasar';
import { IdentityRoleDto, IdentityRoleTableColumn, IdentityRoleUpdateDto, QTablePagination } from 'src/models';
import { RoleService, RoleServiceProvider } from 'src/services';
import { injectFrom } from 'src/utils';
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'RoleManagement',
  setup() {
    const roleService = injectFrom<RoleService>(RoleServiceProvider, true);
    const { t } = useI18n();
    const $q = useQuasar();

    const loading = ref(true);
    const columns = IdentityRoleTableColumn;
    const rows = ref<Array<IdentityRoleDto>>([]);
    const pagination = ref<QTablePagination>({
      sortBy: 'name',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });

    const fetchRoles = async (props: Partial<QTable> = { pagination: pagination.value }) => {
      loading.value = true;
      let { page, rowsPerPage, sortBy, descending } = props.pagination as QTablePagination;
      if (rowsPerPage === 0) rowsPerPage = 1000;
      const skipCount = (page - 1) * rowsPerPage;

      const roles = await roleService.getRoles({ skipCount, maxResultCount: rowsPerPage, sorting: sortBy });
      rows.value = roles.items;

      loading.value = false;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      pagination.value.rowsNumber = roles.totalCount;
    };

    const changePermission = (role: IdentityRoleDto) => {
      $q.dialog({
        component: PermissionChanger,
        componentProps: { providerName: 'R', providerKey: role.name }
      });
    };

    const deleteRole = (role: IdentityRoleDto) => {
      $q.dialog({
        title: t('AbpIdentity.Role:Delete'),
        message: t('AbpIdentity.RoleDeletionConfirmationMessage', [role.name]),
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await roleService.deleteRole(role.id);
        await fetchRoles();
      });
    };

    const editRole = (role: IdentityRoleUpdateDto) => {
      $q.dialog({
        component: RoleEdit,
        componentProps: { role }
      }).onOk(fetchRoles);
    };

    const createRole = () => {
      $q.dialog({
        component: RoleEdit
      }).onOk(fetchRoles);
    };

    onMounted(async () => {
      await fetchRoles();
    });

    return { columns, rows, pagination, fetchRoles, changePermission, deleteRole, createRole, editRole, loading, t };
  }
});
</script>
