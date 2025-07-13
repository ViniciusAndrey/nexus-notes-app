# 🚀 Guia de Deploy - Nexus

## Problema Resolvido ✅

**Antes**: Todas as notas eram compartilhadas globalmente entre todos os usuários
**Depois**: Cada usuário tem acesso apenas às suas próprias notas com autenticação completa

## 🔧 Configuração para Deploy

### 1. Backend (Node.js + MongoDB)

#### Variáveis de Ambiente
Crie um arquivo `.env` na pasta `backend`:

```env
# Configurações do Servidor
PORT=3001

# MongoDB (use MongoDB Atlas para produção)
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/nexus

# Frontend URL (altere para seu domínio)
FRONTEND_URL=https://seu-dominio.com

# JWT Secret (IMPORTANTE: Use uma chave segura em produção!)
JWT_SECRET=sua_chave_super_secreta_muito_longa_e_complexa_aqui
```

#### Dependências Instaladas
```bash
cd backend
npm install
```

#### Build para Produção
```bash
npm run build
npm start
```

### 2. Frontend (React)

#### Variáveis de Ambiente
Crie um arquivo `.env` na pasta `frontend`:

```env
REACT_APP_API_URL=https://seu-backend.com
```

#### Build para Produção
```bash
cd frontend
npm install
npm run build
```

## 🌐 Opções de Deploy

### Opção 1: Vercel + MongoDB Atlas (Recomendado)

#### Backend no Vercel:
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no dashboard do Vercel
3. Deploy automático a cada push

#### Frontend no Vercel:
1. Conecte o repositório
2. Configure `REACT_APP_API_URL` para a URL do backend
3. Deploy automático

### Opção 2: Railway (Tudo em um lugar)

1. Conecte seu repositório ao Railway
2. Configure as variáveis de ambiente
3. Deploy automático

### Opção 3: Render

1. Conecte seu repositório ao Render
2. Configure as variáveis de ambiente
3. Deploy automático

## 🔐 Segurança Implementada

### Autenticação JWT
- ✅ Tokens com expiração de 7 dias
- ✅ Middleware de autenticação em todas as rotas protegidas
- ✅ Validação de tokens em cada requisição

### Hash de Senhas
- ✅ Senhas hasheadas com bcrypt (salt rounds: 10)
- ✅ Comparação segura de senhas

### Isolamento de Dados
- ✅ Cada usuário vê apenas suas próprias notas
- ✅ Filtros por `userId` em todas as consultas
- ✅ Validação de propriedade antes de operações

### Validação de Dados
- ✅ Validação de email único
- ✅ Validação de senha mínima (6 caracteres)
- ✅ Validação de nome obrigatório

## 📊 Estrutura do Banco de Dados

### Coleção: users
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Coleção: notes
```javascript
{
  _id: ObjectId,
  title: String (required),
  content: Mixed (required),
  userId: ObjectId (required, ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Endpoints da API

### Autenticação
- `POST /users/register` - Registrar usuário
- `POST /users/login` - Fazer login
- `GET /users/profile` - Perfil do usuário (protegido)

### Notas (todos protegidos)
- `GET /notes` - Listar notas do usuário
- `POST /notes` - Criar nota
- `PUT /notes/:id` - Atualizar nota
- `DELETE /notes/:id` - Deletar nota

## 🚨 Checklist de Deploy

### Backend
- [ ] MongoDB Atlas configurado
- [ ] Variáveis de ambiente definidas
- [ ] JWT_SECRET alterado para chave segura
- [ ] CORS configurado para o domínio do frontend
- [ ] Build executado com sucesso

### Frontend
- [ ] REACT_APP_API_URL configurado
- [ ] Build executado com sucesso
- [ ] Domínio configurado

### Testes
- [ ] Registro de usuário funcionando
- [ ] Login funcionando
- [ ] Criação de notas funcionando
- [ ] Isolamento de dados funcionando
- [ ] Logout funcionando

## 🐛 Troubleshooting

### Erro de CORS
- Verifique se `FRONTEND_URL` está correto no backend
- Certifique-se de que o domínio do frontend está na lista de CORS

### Erro de Conexão com MongoDB
- Verifique se a string de conexão está correta
- Certifique-se de que o IP está liberado no MongoDB Atlas

### Erro de Autenticação
- Verifique se o `JWT_SECRET` está configurado
- Certifique-se de que o token está sendo enviado no header `Authorization`

## 📞 Suporte

Se encontrar problemas durante o deploy, verifique:
1. Logs do servidor
2. Console do navegador
3. Network tab do DevTools
4. Configuração das variáveis de ambiente 