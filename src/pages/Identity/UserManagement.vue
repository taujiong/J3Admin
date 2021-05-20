<template>
  <q-page padding>
    <q-table :columns="columns"
             v-model:pagination="pagination" :loading="loading"
             :rows="rows" row-key="userName"
             title="Users" title-class="text-h5"
             @request="fetchUsers"
    >
      <template #body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn-dropdown label="Actions">
            <q-list>
              <q-item v-close-popup clickable>
                <q-item-section>
                  <q-item-label>Edit</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-close-popup clickable>
                <q-item-section>
                  <q-item-label>Permissions</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-close-popup clickable>
                <q-item-section>
                  <q-item-label>Delete</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { QTable } from 'quasar';
import { IdentityUserDto, IdentityUserTableColumn, IdentityUserUpdateRolesDto, QTablePagination } from 'src/models';
import { UserService, UserServiceProvider } from 'src/services';
import { injectFrom } from 'src/utils';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'UserManagement',
  setup() {
    const userService = injectFrom<UserService>(UserServiceProvider);

    const loading = ref(true);
    const columns = IdentityUserTableColumn;
    const rows = ref<Array<IdentityUserDto & IdentityUserUpdateRolesDto>>([]);
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

    onMounted(async () => {
      await fetchUsers({ pagination: pagination.value });
    });

    return { columns, rows, pagination, fetchUsers, loading };
  }
});
</script>
