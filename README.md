# Nexus - Sistema de Anotações

Um micro SaaS de anotações com sistema completo de autenticação, isolamento de dados por usuário e interface responsiva.

## 🚀 Tecnologias

### Backend
- **Node.js** com Express
- **TypeScript**
- **MongoDB** com Mongoose
- **JWT** para autenticação
- **bcryptjs** para criptografia de senhas

### Frontend
- **React** com TypeScript
- **Styled Components** para estilização
- **Slate.js** para editor de texto rico
- **Axios** para requisições HTTP
- **Design responsivo** para mobile

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd Nexus
```

2. **Instale todas as dependências:**
```bash
npm run install:all
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na pasta `backend/`:
```env
MONGODB_URI=mongodb://localhost:27017/nexus
JWT_SECRET=sua_chave_secreta_aqui
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 🚀 Executando o Projeto

### Opção 1: Executar tudo de uma vez (Recomendado)
```bash
npm run dev
```

### Opção 2: Executar separadamente

**Backend:**
```bash
npm run dev:backend
```

**Frontend:**
```bash
npm run dev:frontend
```

## 📱 Acessando a Aplicação

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa backend e frontend simultaneamente
- `npm run dev:backend` - Executa apenas o backend
- `npm run dev:frontend` - Executa apenas o frontend
- `npm run install:all` - Instala todas as dependências

## 🗄️ Estrutura do Banco de Dados

### Usuários
- `_id`: ID único do usuário
- `name`: Nome completo
- `email`: Email único
- `password`: Senha criptografada
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

### Notas
- `_id`: ID único da nota
- `title`: Título da nota
- `content`: Conteúdo da nota
- `userId`: ID do usuário proprietário
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação:

1. **Registro:** Cria uma nova conta
2. **Login:** Autentica com email e senha
3. **Token:** Armazenado no localStorage
4. **Middleware:** Protege rotas privadas

## 📱 Funcionalidades

### Para Usuários
- ✅ Registro e login
- ✅ Criação de notas privadas
- ✅ Editor de texto rico
- ✅ Interface responsiva
- ✅ Logout seguro

### Para Desenvolvedores
- ✅ API RESTful documentada
- ✅ CORS configurado
- ✅ Logs limpos (apenas erros)
- ✅ TypeScript em todo o projeto
- ✅ Estrutura modular

## 🐛 Debug

Se encontrar problemas:

1. **Verifique se o MongoDB está rodando**
2. **Confirme as variáveis de ambiente**
3. **Verifique os logs no console do navegador**
4. **Teste a API diretamente:** http://localhost:3001/health

## 📄 Licença

Este projeto está sob a licença ISC. 