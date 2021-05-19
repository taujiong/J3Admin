<template>
  <q-page padding>
    <q-table :columns="columns"
             :pagination="{rowsPerPage: 10}"
             :rows="rows"
             row-key="userName"
             title="Users"
             title-class="text-h5"
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserManagement',
  setup() {
    const columns = [
      {
        name: 'userName',
        required: true,
        label: 'userName',
        align: 'left',
        field: 'userName'
      },
      {
        name: 'email',
        required: true,
        label: 'email',
        align: 'left',
        field: 'email'
      },
      {
        name: 'phoneNumber',
        required: true,
        label: 'phone',
        align: 'left',
        field: 'phoneNumber'
      },
      {
        name: 'roles',
        required: true,
        label: 'roles',
        align: 'left',
        field: 'roles',
        format: (value: Array<string>) => value.join(',')
      },
      {
        name: 'actions',
        label: 'actions',
        align: 'left'
      }
    ];

    const rows = [
      {
        id: '39fc37cf-203c-4428-04f8-60f6068f29ac',
        userName: 'taujiong',
        email: 'taujiong@outlook.com',
        phoneNumber: '13182933382',
        roles: ['admin', 'member']
      },
      {
        id: '39fc37cf-203c-4428-04f8-60f6068f29ac',
        userName: 'jy',
        email: 'taujiong@outlook.com',
        phoneNumber: '13182933382',
        roles: ['admin', 'member']
      },
      {
        id: '39fc37cf-203c-4428-04f8-60f6068f29ac',
        userName: 'dsd',
        email: 'taujiong@outlook.com',
        phoneNumber: '13182933382',
        roles: ['admin', 'member']
      },
      {
        id: '39fc37cf-203c-4428-04f8-60f6068f29ac',
        userName: 'dr',
        email: 'taujiong@outlook.com',
        phoneNumber: '13182933382',
        roles: ['admin', 'member']
      },
      {
        id: '39fc37cf-203c-4428-04f8-60f6068f29ac',
        userName: 'xt',
        email: 'taujiong@outlook.com',
        phoneNumber: '13182933382',
        roles: ['admin', 'member']
      },
      {
        id: '39fc37cf-203c-4428-04f8-60f6068f29ac',
        userName: 'gd',
        email: 'taujiong@outlook.com',
        phoneNumber: '13182933382',
        roles: ['admin', 'member']
      },
      {
        id: '39fc37cf-203c-4428-04f8-60f6068f29ac',
        userName: 'sjj',
        email: 'taujiong@outlook.com',
        phoneNumber: '13182933382',
        roles: ['admin', 'member']
      },
      {
        id: '39fc37cf-203c-4428-04f8-60f6068f29ac',
        userName: 'gz',
        email: 'taujiong@outlook.com',
        phoneNumber: '13182933382',
        roles: ['admin', 'member']
      },
      {
        id: '39fc37cf-203c-4428-04f8-60f6068f29ac',
        userName: 'wlt',
        email: 'taujiong@outlook.com',
        phoneNumber: '13182933382',
        roles: ['admin', 'member']
      },
      {
        id: '39fc37cf-203c-4428-04f8-60f6068f29ac',
        userName: 'lyh',
        email: 'taujiong@outlook.com',
        phoneNumber: '13182933382',
        roles: ['admin', 'member']
      },
      {
        id: '39fc37cf-203c-4428-04f8-60f6068f29ac',
        userName: 'wsy',
        email: 'taujiong@outlook.com',
        phoneNumber: '13182933382',
        roles: ['admin', 'member']
      }
    ];

    return { columns, rows };
  }
});
</script>
