# Configuração do Login com Google

Este guia explica como configurar o login com Google na aplicação Nexus.

## 1. Configurar o Google Cloud Console

### Passo 1: Criar um projeto no Google Cloud Console
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Selecionar projeto" no topo da página
3. Clique em "Novo projeto"
4. Digite um nome para o projeto (ex: "Nexus App")
5. Clique em "Criar"

### Passo 2: Habilitar a API do Google+ 
1. No menu lateral, vá em "APIs e serviços" > "Biblioteca"
2. Procure por "Google+ API" ou "Google Identity"
3. Clique na API e depois em "Habilitar"

### Passo 3: Configurar credenciais OAuth
1. No menu lateral, vá em "APIs e serviços" > "Credenciais"
2. Clique em "Criar credenciais" > "ID do cliente OAuth"
3. Se solicitado, configure a tela de consentimento OAuth:
   - Tipo de usuário: Externo
   - Nome do app: "Nexus"
   - Email de suporte: seu email
   - Domínio do desenvolvedor: seu domínio (opcional)
4. Clique em "Salvar e continuar" até finalizar

### Passo 4: Criar ID do cliente OAuth
1. Tipo de aplicativo: "Aplicativo da Web"
2. Nome: "Nexus Web App"
3. URIs autorizados de JavaScript:
   - `http://localhost:3000` (desenvolvimento)
   - `https://seu-dominio.com` (produção)
4. URIs de redirecionamento autorizados:
   - `http://localhost:3000` (desenvolvimento)
   - `https://seu-dominio.com` (produção)
5. Clique em "Criar"

### Passo 5: Copiar o Client ID
- Anote o "ID do cliente" que será gerado
- Você precisará dele para as próximas etapas

## 2. Configurar as Variáveis de Ambiente

### Backend (.env)
```env
# Configurações do Banco de Dados
MONGODB_URI=mongodb://localhost:27017/nexus

# JWT Secret
JWT_SECRET=seu_jwt_secret_aqui

# Porta do Servidor
PORT=3001

# Google OAuth
GOOGLE_CLIENT_ID=seu_google_client_id_aqui
```

### Frontend (.env)
```env
# URL da API Backend
REACT_APP_API_URL=http://localhost:3001

# Google OAuth Client ID
REACT_APP_GOOGLE_CLIENT_ID=seu_google_client_id_aqui
```

## 3. Testar a Implementação

### Passo 1: Iniciar o backend
```bash
cd backend
npm install
npm run dev
```

### Passo 2: Iniciar o frontend
```bash
cd frontend
npm install
npm start
```

### Passo 3: Testar o login
1. Acesse `http://localhost:3000`
2. Clique no botão "Entrar com Google"
3. Faça login com sua conta Google
4. Verifique se foi redirecionado para a aplicação

## 4. Funcionalidades Implementadas

### Backend
- ✅ Modelo de usuário atualizado para suportar Google ID
- ✅ Controller para autenticação com Google
- ✅ Rota `/users/google-login`
- ✅ Verificação de token do Google
- ✅ Criação/atualização automática de usuários

### Frontend
- ✅ GoogleOAuthProvider configurado
- ✅ Botão de login com Google no componente Login
- ✅ Integração com a API do backend
- ✅ Tratamento de erros

## 5. Fluxo de Autenticação

1. **Usuário clica no botão "Entrar com Google"**
2. **Google OAuth abre popup/modal**
3. **Usuário faz login no Google**
4. **Google retorna um ID token**
5. **Frontend envia o token para o backend**
6. **Backend verifica o token com Google**
7. **Backend cria/atualiza usuário no banco**
8. **Backend retorna JWT token**
9. **Frontend salva o token e redireciona**

## 6. Tratamento de Usuários Existentes

- Se um usuário já existe com o mesmo email, o sistema:
  - Atualiza o `googleId` se não existir
  - Atualiza o avatar se fornecido pelo Google
  - Mantém os dados existentes

## 7. Segurança

- ✅ Tokens do Google são verificados no backend
- ✅ JWT tokens são usados para sessões
- ✅ Senhas não são obrigatórias para usuários Google
- ✅ Validação de email e dados do Google

## 8. Solução de Problemas

### Erro: "Token do Google inválido"
- Verifique se o `GOOGLE_CLIENT_ID` está correto
- Confirme se o domínio está autorizado no Google Console

### Erro: "CORS"
- Verifique se as URIs estão configuradas corretamente no Google Console
- Confirme se o backend está rodando na porta correta

### Botão do Google não aparece
- Verifique se o `REACT_APP_GOOGLE_CLIENT_ID` está configurado
- Confirme se o GoogleOAuthProvider está envolvendo a aplicação

## 9. Deploy em Produção

### Google Cloud Console
1. Adicione seu domínio de produção nas URIs autorizadas
2. Configure a tela de consentimento OAuth para produção
3. Verifique se a API está habilitada

### Variáveis de Ambiente
1. Configure as variáveis de ambiente no seu servidor
2. Use HTTPS em produção
3. Configure CORS adequadamente

### Banco de Dados
1. Use um banco MongoDB em produção (Atlas, etc.)
2. Configure índices para `googleId` e `email`
3. Configure backup e monitoramento 