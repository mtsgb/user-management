import api from './api';

export default {

  // retorna todos os usuarios
  getUsers () {
    return api.get('/users');
  },
  // retorna usuario especifico
  getUser (id) {
    return api.get(`/users/${id}`);
  },
  // cria usuario
  createUser (userData) {
    return api.post('/users', userData);
  },
  // atualiza usuario
  updateUser (id, userData) {
    return api.put(`/users/${id}`, userData);
  },
  // deleta usuario
  deleteUser (id) {
    return api.delete(`/users/${id}`);
  },
};
