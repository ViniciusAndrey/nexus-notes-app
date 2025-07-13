# 🚀 Guia de Deploy - Nexus Notes

Este guia mostra como fazer deploy gratuito do seu micro SaaS Nexus Notes.

## 📋 Pré-requisitos

- ✅ Conta no GitHub
- ✅ Código subido para o GitHub
- ✅ MongoDB Atlas (gratuito)

## 🎯 Opção 1: Vercel + MongoDB Atlas (Recomendado)

### Passo 1: Configurar MongoDB Atlas

1. **Criar conta**: [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. **Criar cluster gratuito**:
   - Escolher "FREE" tier
   - Região: mais próxima do Brasil
   - Nome: `nexus-cluster`
3. **Configurar acesso**:
   - Database Access → Add New Database User
   - Username: `nexus-user`
   - Password: gerar senha forte
   - Role: `Read and write to any database`
4. **Configurar rede**:
   - Network Access → Add IP Address
   - Allow Access from Anywhere: `0.0.0.0/0`
5. **Obter string de conexão**:
   - Clusters → Connect → Connect your application
   - Copiar a string de conexão

### Passo 2: Deploy do Backend no Vercel

1. **Criar conta**: [vercel.com](https://vercel.com)
2. **Conectar GitHub**:
   - Import Project → Import Git Repository
   - Selecionar seu repositório
3. **Configurar projeto**:
   - Framework Preset: `Node.js`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Output Directory: `(deixar vazio)`
4. **Configurar variáveis de ambiente**:
   ```
   MONGODB_URI=sua_string_de_conexao_mongodb
   FRONTEND_URL=https://seu-frontend.vercel.app
   NODE_ENV=production
   ```
5. **Deploy**: Clicar em "Deploy"

### Passo 3: Deploy do Frontend no Vercel

1. **Novo projeto**:
   - Import Project → Import Git Repository
   - Mesmo repositório
2. **Configurar projeto**:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
3. **Configurar variáveis de ambiente**:
   ```
   REACT_APP_API_URL=https://seu-backend.vercel.app
   ```
4. **Deploy**: Clicar em "Deploy"

### Passo 4: Atualizar URLs

1. **Backend**: Atualizar `FRONTEND_URL` com a URL do frontend
2. **Frontend**: Atualizar `REACT_APP_API_URL` com a URL do backend
3. **Redeploy**: Fazer commit para redeploy automático

## 🎯 Opção 2: Netlify + Railway

### Frontend (Netlify)

1. **Criar conta**: [netlify.com](https://netlify.com)
2. **Deploy**:
   - New site from Git → GitHub
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/build`
3. **Variáveis de ambiente**:
   ```
   REACT_APP_API_URL=https://seu-backend.railway.app
   ```

### Backend (Railway)

1. **Criar conta**: [railway.app](https://railway.app)
2. **Deploy**:
   - New Project → Deploy from GitHub repo
   - Selecionar pasta `backend`
3. **Variáveis de ambiente**:
   ```
   MONGODB_URI=sua_string_mongodb
   FRONTEND_URL=https://seu-site.netlify.app
   ```

## 🎯 Opção 3: Render (Tudo em um lugar)

### Passo 1: Backend

1. **Criar conta**: [render.com](https://render.com)
2. **Novo Web Service**:
   - Connect repository
   - Name: `nexus-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. **Variáveis de ambiente**:
   ```
   MONGODB_URI=sua_string_mongodb
   FRONTEND_URL=https://seu-frontend.onrender.com
   ```

### Passo 2: Frontend

1. **Novo Static Site**:
   - Connect repository
   - Name: `nexus-frontend`
   - Build Command: `cd frontend && npm run build`
   - Publish Directory: `frontend/build`
2. **Variáveis de ambiente**:
   ```
   REACT_APP_API_URL=https://seu-backend.onrender.com
   ```

## 🔧 Configurações Adicionais

### Domínio Personalizado

1. **Vercel**: Settings → Domains → Add Domain
2. **Netlify**: Site settings → Domain management
3. **Render**: Settings → Custom Domains

### SSL/HTTPS

- ✅ Automático em todas as plataformas
- ✅ Certificados Let's Encrypt gratuitos

### Monitoramento

1. **Vercel Analytics**: Gratuito incluído
2. **Uptime Robot**: Monitoramento gratuito
3. **Google Analytics**: Rastreamento de usuários

## 💰 Custos

### Vercel + MongoDB Atlas
- ✅ **Vercel**: 100% gratuito
- ✅ **MongoDB Atlas**: 512MB gratuito
- ✅ **Domínio**: Gratuito (vercel.app)

### Netlify + Railway
- ✅ **Netlify**: 100GB/mês gratuito
- ⚠️ **Railway**: $5 crédito mensal (suficiente para micro SaaS)

### Render
- ✅ **Render**: 750 horas/mês gratuito
- ✅ **PostgreSQL**: 1GB gratuito

## 🚀 Próximos Passos

1. **Monitoramento**: Configurar alertas
2. **Backup**: Configurar backup automático do MongoDB
3. **CDN**: Configurar Cloudflare (gratuito)
4. **Analytics**: Google Analytics ou Vercel Analytics
5. **SEO**: Meta tags e sitemap

## 🆘 Troubleshooting

### Erro de CORS
- Verificar se `FRONTEND_URL` está correto
- Verificar se o domínio está na whitelist

### Erro de Conexão MongoDB
- Verificar string de conexão
- Verificar IP whitelist no MongoDB Atlas

### Build Fails
- Verificar dependências no `package.json`
- Verificar scripts de build

## 📞 Suporte

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **MongoDB**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Netlify**: [netlify.com/support](https://netlify.com/support)
- **Railway**: [railway.app/docs](https://railway.app/docs)
- **Render**: [render.com/docs](https://render.com/docs)

---

**🎉 Parabéns! Seu micro SaaS está no ar!** 