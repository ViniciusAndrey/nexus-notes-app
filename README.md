# Nexus - Sistema de Anotações

Um micro SaaS de anotações com autenticação completa e isolamento de dados por usuário.

## 🚀 Funcionalidades

- ✅ **Autenticação Completa**: Registro e login de usuários
- ✅ **Isolamento de Dados**: Cada usuário vê apenas suas próprias notas
- ✅ **Editor Rico**: Interface moderna para criar e editar notas
- ✅ **Interface Responsiva**: Design adaptável para diferentes dispositivos
- ✅ **Tema Escuro**: Interface elegante com tema escuro
- ✅ **Persistência**: Dados salvos no MongoDB
- ✅ **Segurança**: Senhas hasheadas e tokens JWT

## 🛠️ Tecnologias

### Backend
- **Node.js** com TypeScript
- **Express.js** para API REST
- **MongoDB** com Mongoose
- **JWT** para autenticação
- **bcrypt** para hash de senhas

### Frontend
- **React** com TypeScript
- **Styled Components** para estilização
- **Slate.js** para editor de texto rico

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- MongoDB (local ou Atlas)

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd Nexus
```

### 2. Configure o Backend
```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend` com:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/nexus
FRONTEND_URL=http://localhost:3000
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
```

### 3. Configure o Frontend
```bash
cd ../frontend
npm install
```

### 4. Execute o Projeto

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

## 🔐 Segurança Implementada

### Problema Resolvido
- **Antes**: Todas as notas eram compartilhadas globalmente
- **Depois**: Cada usuário tem acesso apenas às suas próprias notas

### Medidas de Segurança
- ✅ Autenticação JWT obrigatória
- ✅ Senhas hasheadas com bcrypt
- ✅ Validação de dados de entrada
- ✅ Isolamento completo de dados por usuário
- ✅ Tokens com expiração automática
- ✅ Middleware de autenticação em todas as rotas protegidas

## 📱 Como Usar

1. **Registre-se** ou **faça login** na aplicação
2. **Crie notas** usando o botão "+ Nova Nota"
3. **Edite** suas notas no editor rico
4. **Organize** suas notas na sidebar
5. **Suas notas são privadas** - apenas você pode vê-las

## 🚀 Deploy

### Backend
- Configure as variáveis de ambiente para produção
- Use um MongoDB Atlas ou servidor MongoDB
- Altere a `JWT_SECRET` para uma chave segura
- Configure CORS para o domínio do frontend

### Frontend
- Configure a variável `REACT_APP_API_URL` para a URL do backend
- Build para produção: `npm run build`

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request. 