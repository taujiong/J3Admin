<template>
  <q-page padding>
    <q-table :columns="columns"
             v-model:pagination="pagination" :loading="loading"
             :rows="rows" row-key="userName"
             :title="t('AbpIdentity.Users')" title-class="text-h5"
             @request="fetchUsers"
    >
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
          <q-td key="userName" :props="props">
            <span class="text-body2">{{ props.row.userName }}</span>
          </q-td>
          <q-td key="email" :props="props">
            <span class="text-body2 q-mr-sm">{{ props.row.email }}</span>
            <q-icon :color="props.row.email_verified ? 'positive' : 'grey-14'"
                    :name="props.row.email_verified ? 'verified' : 'help'"
                    size="sm"
            >
              <q-tooltip anchor="center right" self="center left">
                <span class="text-body2">{{ props.row.email_verified ? 'verified' : 'unverified' }}</span>
              </q-tooltip>
            </q-icon>
          </q-td>
          <q-td key="phoneNumber" :props="props">
            <span class="text-body2 q-mr-sm">{{ props.row.phoneNumber }}</span>
            <q-icon :color="props.row.email_verified ? 'positive' : 'grey-14'"
                    :name="props.row.email_verified ? 'verified' : 'help'"
                    size="sm"
            >
              <q-tooltip anchor="center right" self="center left">
                <span class="text-body2">
                  {{ props.row.email_verified ? 'verified' : 'unverified' }}
                </span>
              </q-tooltip>
            </q-icon>
          </q-td>
          <q-td key="roles" :props="props">
            <div class="q-gutter-x-sm">
              <q-badge v-for="roleName of props.row.roleNames"
                       :key="roleName"
                       :label="roleName"
                       class="text-body2"
              />
            </div>
          </q-td>

          <!-- 操作栏 -->
          <q-td auto-width>
            <q-btn-dropdown :label="t('AbpIdentity.DatatableActionDropdownDefaultText')" icon="settings">
              <q-list>
                <q-item v-close-popup clickable @click="editUser">
                  <q-item-section>
                    <q-item-label>{{ t('AbpIdentity.Edit') }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-close-popup clickable>
                  <q-item-section>
                    <q-item-label>{{ t('AbpIdentity.Permission:ChangePermissions') }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-close-popup clickable @click="deleteUser(props.row)">
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

    <q-dialog v-model="edit" persistent>
      <UserEdition />
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import UserEdition from 'components/UserEdition.vue';
import { QTable, useQuasar } from 'quasar';
import { IdentityUserTableColumn, IdentityUserWithRoleNames, QTablePagination } from 'src/models';
import { UserService, UserServiceProvider } from 'src/services';
import { injectFrom } from 'src/utils';
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'UserManagement',
  components: { UserEdition },
  setup() {
    const userService = injectFrom<UserService>(UserServiceProvider);
    const { t } = useI18n();
    const $q = useQuasar();

    const edit = ref(true);
    const loading = ref(true);
    const columns = IdentityUserTableColumn;
    const rows = ref<Array<IdentityUserWithRoleNames>>([]);
    const pagination = ref<QTablePagination>({
      sortBy: 'userName',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 16
    });

    const fetchUsers = async (props: Partial<QTable>) => {
      loading.value = true;
      let { page, rowsPerPage, sortBy, descending } = props.pagination as QTablePagination;
      if (rowsPerPage === 0) rowsPerPage = 1000;
      const skipCount = (page - 1) * rowsPerPage;

      const users = await userService.getUsers({ skipCount, maxResultCount: rowsPerPage, sorting: sortBy });
      const tempRow = [];
      for (const user of users.items) {
        const roles = await userService.getRolesByUser(user.id);
        const roleNames = roles.items.map(role => role.name);
        tempRow.push({ ...user, roleNames });
      }
      rows.value = tempRow;

      loading.value = false;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      pagination.value.rowsNumber = users.totalCount;
    };

    const deleteUser = (user: IdentityUserWithRoleNames) => {
      $q.dialog({
        title: t('AbpIdentity.User:Delete'),
        message: t('AbpIdentity.UserDeletionConfirmationMessage', [user.userName]),
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await userService.deleteUser(user.id);
        await fetchUsers({ pagination: pagination.value });
      });
    };

    const editUser = () => {
      edit.value = true;
    };

    onMounted(async () => {
      await fetchUsers({ pagination: pagination.value });
    });

    return { columns, rows, pagination, fetchUsers, deleteUser, editUser, loading, t, edit };
  }
});
</script>
