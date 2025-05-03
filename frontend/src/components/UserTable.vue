<template>
  <v-card class="border mb-4">
    <v-card-title class="d-flex">
      <v-btn append-icon="mdi-account-plus" class="ml-auto" color="green" @click="showCreateModal = true">
        Criar usuário
      </v-btn>
    </v-card-title>

    <div class="table-scroll-wrapper">
      <v-skeleton-loader
        v-if="loading"
        class="ma-4"
        type="table"
      />

      <v-responsive v-else>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left">Email</th>
              <th class="text-left">CPF</th>
              <th class="text-left" style="width: 11.25rem;">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ formatCpf(user.cpf) }}</td>
              <td>
                <v-btn class="mr-2" color="yellow" @click="editUser(user)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="red" @click="deleteUser(user)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-responsive>
    </div>

    <CreateUserModal v-model="showCreateModal" @user-created="handleUserCreated" />
  </v-card>

  <EditUserModal v-model="showEditModal" :user="selectedUser" @user-updated="handleUserUpdated" />
  <DeleteUserModal v-model="showDeleteModal" :user="selectedUser" @user-deleted="handleUserDeleted" />
  <v-snackbar v-model="snackbar" :color="snackbarColor" location="bottom center" timeout="3000">
    <div class="text-center w-100">
      {{ snackbarText }}
    </div>
  </v-snackbar>
</template>

<script>
  import api from '@/api/api';
  import CreateUserModal from './CreateUserModal.vue';
  import EditUserModal from './EditUserModal.vue';
  import DeleteUserModal from './DeleteUserModal.vue';

  export default {
    name: 'UserList',
    components: {
      CreateUserModal,
      EditUserModal,
      DeleteUserModal,
    },
    data () {
      return {
        users: [],
        showCreateModal: false,
        showEditModal: false,
        showDeleteModal: false,
        selectedUser: null,
        loading: true,
        snackbar: false,
        snackbarText: '',
        snackbarColor: '',
      };
    },
    mounted () {
      this.fetchUsers();
    },
    methods: {
      fetchUsers () {
        this.loading = true;
        api.get('/users')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error('Erro ao buscar usuários:', error);
            this.showSnackbar('Erro ao buscar usuários', 'error');
          })
          .finally(() => {
            this.loading = false;
          });
      },
      handleUserCreated () {
        this.fetchUsers();
        this.showSnackbar('Usuário criado com sucesso', 'success');
      },
      handleUserUpdated (updatedUser) {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.showSnackbar('Usuário atualizado com sucesso','success');
        }
      },
      editUser (user) {
        this.selectedUser = { ...user };
        this.showEditModal = true;
      },
      handleUserDeleted (user) {
        this.users = this.users.filter(u => u.id !== user.id);
        this.showSnackbar('Usuário excluído com sucesso','warning');
      },
      deleteUser (user) {
        this.selectedUser = user;
        this.showDeleteModal = true;
      },
      showSnackbar (message, color = 'success') {
        this.snackbarText = message;
        this.snackbarColor = color;
        this.snackbar = true;
      },
      formatCpf (cpf) {
        if (!cpf) return '';
        const cleaned = cpf.replace(/\D/g, '');
        return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      },
    },
  };
</script>

<style>
.table-scroll-wrapper {
  overflow-y: auto;
  display: block;
  max-height: 70vh;
}

@media (max-width: 1439px) {
  .table-scroll-wrapper {
    max-height: 55vh;
  }
}

@media (max-width: 1024px) {
  .table-scroll-wrapper {
    max-height: 50vh;
  }
}
</style>
