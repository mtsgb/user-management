<template>
  <v-dialog v-model="show" max-width="43.75rem">
    <v-card>
      <v-card-title>
        <span>Editar Usuário</span>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="formUser.name" label="Nome" :rules="[requiredRule]" />
        <v-text-field v-model="formUser.email" label="Email" :rules="[requiredRule, emailRule]" />
        <v-text-field v-model="formUser.cpf" v-mask="'###.###.###-##'" label="CPF" :rules="[requiredRule, cpfRule]" />
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="cancel">Cancelar</v-btn>
        <v-btn color="blue" variant="tonal" @click="updateUser">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import api from '@/api/api';

  export default {
    name: 'EditUserModal',
    props: {
      modelValue: Boolean,
      user: Object,
    },
    emits: ['update:modelValue', 'user-updated'],
    data () {
      return {
        formUser: {
          name: '',
          email: '',
          cpf: '',
        },
        requiredRule: v => !!v || 'Campo obrigatório',
        emailRule: v => /.+@.+\..+/.test(v) || 'Email inválido',
        cpfRule: v => {
          const cleaned = v.replace(/\D/g, '');
          return cleaned.length === 11 || 'O CPF deve conter 11 números'
        },
      };
    },
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
    watch: {
      modelValue (val) {
        if (val && this.user) {
          this.formUser = { ...this.user };
        }
      },
    },
    methods: {
      cancel () {
        this.show = false;
      },
      updateUser () {
        api.put(`/users/${this.user.id}`, this.formUser)
          .then(() => {
            this.$emit('user-updated', this.formUser);
            this.show = false;
          })
          .catch(error => {
            console.error('Erro ao atualizar usuário:', error);
          });
      },
    },
  };
</script>
