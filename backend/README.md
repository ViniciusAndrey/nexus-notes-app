# Backend Nexus - Sistema de Anotações

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:

```env
# Configurações do Servidor
PORT=3001

# Configurações do MongoDB
MONGODB_URI=mongodb://localhost:27017/nexus

# Configurações do Frontend
FRONTEND_URL=http://localhost:3000

# Chave secreta para JWT (IMPORTANTE: Altere em produção!)
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
```

### 2. Instalação de Dependências

```bash
npm install
```

### 3. Executar em Desenvolvimento

```bash
npm run dev
```

### 4. Executar em Produção

```bash
npm run build
npm start
```

## Funcionalidades

- ✅ Autenticação JWT
- ✅ Registro de usuários
- ✅ Login de usuários
- ✅ CRUD de notas por usuário
- ✅ Isolamento de dados por usuário
- ✅ Validação de dados
- ✅ Hash seguro de senhas

## Endpoints

### Autenticação
- `POST /users/register` - Registrar novo usuário
- `POST /users/login` - Fazer login
- `GET /users/profile` - Obter perfil do usuário (protegido)

### Notas (todos protegidos)
- `GET /notes` - Listar notas do usuário
- `POST /notes` - Criar nova nota
- `PUT /notes/:id` - Atualizar nota
- `DELETE /notes/:id` - Deletar nota

## Segurança

- Todas as senhas são hasheadas com bcrypt
- Tokens JWT com expiração de 7 dias
- Validação de dados de entrada
- Isolamento completo de dados por usuário 