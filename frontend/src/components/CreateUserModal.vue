<template>
  <v-dialog v-model="show" max-width="43.75rem">
    <v-card>
      <v-card-title>
        <span>Criar Usuário</span>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="user.name" label="Nome" :rules="[requiredRule]" />
        <v-text-field v-model="user.email" label="Email" :rules="[requiredRule, emailRule]" />
        <v-text-field
          v-model="user.cpf"
          v-mask="'###.###.###-##'"
          label="CPF"
          required
          :rules="[requiredRule, cpfRule]"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="cancel">Cancelar</v-btn>
        <v-btn color="green" variant="tonal" @click="createUser">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import api from '@/api/api';

  export default {
    name: 'CreateUserModal',
    props: {
      modelValue: Boolean,
    },
    emits: ['update:modelValue', 'user-created'],
    data () {
      return {
        user: {
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
    methods: {
      cancel () {
        this.resetForm();
        this.show = false;
      },
      createUser () {
        api.post('/users', this.user)
          .then(response => {
            this.$emit('user-created', response.data);
            this.resetForm();
            this.show = false
          })
          .catch(error => {
            console.error('Erro ao criar usuário:', error);
          });
      },
      resetForm () {
        this.user = { name: '', email: '', cpf: '' };
      },
    },
  }
</script>
