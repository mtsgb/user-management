<template>
  <v-dialog v-model="show" max-width="31.25rem">
    <v-card>
      <v-card-title>
        <span>Excluir Usuário</span>
      </v-card-title>

      <v-card-text>
        <p>Você tem certeza que deseja excluir o usuário <strong>{{ user.name }}</strong>?</p>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="cancel">Cancelar</v-btn>
        <v-btn color="red" variant="tonal" @click="deleteUser">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import api from '@/api/api';

  export default {
    name: 'DeleteUserModal',
    props: {
      modelValue: Boolean,
      user: Object,
    },
    emits: ['update:modelValue', 'user-deleted'],
    computed: {
      show: {
        get () {
          return this.modelValue;
        },
        set (val) {
          this.$emit('update:modelValue', val);
        },
      },
    },
    methods: {
      cancel () {
        this.show = false;
      },
      deleteUser () {
        api.delete(`/users/${this.user.id}`)
          .then(() => {
            this.$emit('user-deleted', this.user);
            this.show = false;
          })
          .catch(error => {
            console.error('Erro ao excluir usuário:', error);
          });
      },
    },
  };
</script>
