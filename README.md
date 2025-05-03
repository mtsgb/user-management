# Gestão de Usuários

Projeto completo para gerenciamento de usuários com interface moderna em **Vue 3 + Vuetify** e **API RESTful com Laravel**. 

---

## Funcionalidades

### Front-end (Vue 3 + Vuetify)

- Listagem de usuários
- Criação, edição e exclusão de usuários
- Máscara de CPF (`###.###.###-##`)
- Validação de campos obrigatórios e formato de e-mail/CPF
- Modal de cadastro/edit responsivo
- Tema Claro/Escuro com botão flutuante

### Back-end (Laravel)

- API RESTful com CRUD de usuários
- Validação de entrada (nome, e-mail, CPF)
- Retorno em formato JSON

---

## Tecnologias

### Front-end
- [Vue 3](https://vuejs.org/)
- [Vuetify 3](https://next.vuetifyjs.com/)
- [Axios](https://axios-http.com/)
- [VueTheMask](https://vue-the-mask.github.io/)

### Back-end
- [Laravel 10+](https://laravel.com/)

---

## Como rodar o projeto

### Requisitos
- Node.js 18+
- PHP 8.1+
- Composer
- PostgreSQL
- Yarn ou NPM


## Backend (Laravel)
### 1. Clone o repositório e acesse o backend
git clone https://github.com/mtsgb/user-management

### 2. Instale as dependências PHP
composer install

### 3. Copie o .env e edite com os dados do seu PostgreSQL
cp .env.example .env

### 4. Gere a chave da aplicação
php artisan key:generate

### 5. Crie o banco no PostgreSQL (nome deve bater com o .env: DB_DATABASE=users)

### 6. Execute as migrações
php artisan migrate

### 7. Inicie o servidor Laravel
php artisan serve

## Frontend (Vue)
### 1. Acesse a pasta do frontend
cd ../frontend

### 2. Instale as dependências
yarn install
### ou
npm install

### 3. Inicie o servidor de desenvolvimento
yarn dev
### ou
npm run dev
