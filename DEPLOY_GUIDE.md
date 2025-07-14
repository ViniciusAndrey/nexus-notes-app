# 🚀 Guia de Deploy - Nexus

## ❌ Problema: "Failed to fetch"

O erro "Failed to fetch" indica que o frontend não consegue se comunicar com o backend no deploy. Este guia vai ajudar você a resolver esse problema.

## 🔧 Solução Passo a Passo

### 1. **Configurar Variáveis de Ambiente**

#### Frontend (.env)
```bash
# Copie o arquivo de exemplo
cp frontend/env.example frontend/.env

# Edite o arquivo .env e configure a URL do seu backend
REACT_APP_API_URL=https://seu-backend-deployado.com
```

#### Backend (.env)
```bash
# Copie o arquivo de exemplo
cp backend/.env.example backend/.env

# Configure as variáveis
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/nexus
JWT_SECRET=sua_chave_secreta_muito_segura
PORT=3001
FRONTEND_URL=https://seu-frontend-deployado.com
```

### 2. **Deploy do Backend**

#### Opção A: Vercel
```bash
# 1. Instale o Vercel CLI
npm i -g vercel

# 2. Configure o projeto
cd backend
vercel

# 3. Configure as variáveis de ambiente no dashboard do Vercel
```

#### Opção B: Railway
```bash
# 1. Conecte seu repositório ao Railway
# 2. Configure as variáveis de ambiente no dashboard
# 3. Deploy automático
```

#### Opção C: Render
```bash
# 1. Conecte seu repositório ao Render
# 2. Configure como Web Service
# 3. Configure as variáveis de ambiente
```

#### Opção D: Heroku
```bash
# 1. Instale o Heroku CLI
# 2. Login e configure
heroku login
heroku create seu-backend-nexus

# 3. Configure as variáveis
heroku config:set MONGODB_URI="sua_uri_mongodb"
heroku config:set JWT_SECRET="sua_chave_secreta"
heroku config:set FRONTEND_URL="https://seu-frontend.com"

# 4. Deploy
git push heroku main
```

### 3. **Deploy do Frontend**

#### Opção A: Vercel (Recomendado)
```bash
# 1. Conecte seu repositório ao Vercel
# 2. Configure as variáveis de ambiente:
REACT_APP_API_URL=https://seu-backend.vercel.app

# 3. Deploy automático
```

#### Opção B: Netlify
```bash
# 1. Conecte seu repositório ao Netlify
# 2. Configure as variáveis de ambiente no dashboard
# 3. Build command: cd frontend && npm run build
# 4. Publish directory: frontend/build
```

### 4. **Configurar CORS no Backend**

Certifique-se de que o CORS está configurado corretamente:

```typescript
// backend/src/index.ts
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://seu-frontend.vercel.app',
      'https://seu-frontend.netlify.app',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
```

### 5. **Testar a Conexão**

#### Usando o Debugger
1. Acesse o frontend deployado
2. Pressione `Ctrl+Shift+D` para abrir o debugger
3. Clique em "Testar Conexão"
4. Verifique se a API está respondendo

#### Teste Manual
```bash
# Teste o endpoint de health
curl https://seu-backend.vercel.app/health

# Deve retornar: {"status":"OK","timestamp":"..."}
```

## 🔍 Diagnóstico de Problemas

### 1. **Verificar URLs**
- ✅ Backend está acessível?
- ✅ Frontend está usando a URL correta?
- ✅ CORS está configurado?

### 2. **Verificar Variáveis de Ambiente**
```bash
# No frontend, verifique se a variável está definida
console.log('API URL:', process.env.REACT_APP_API_URL);

# No backend, verifique as variáveis
console.log('Frontend URL:', process.env.FRONTEND_URL);
```

### 3. **Verificar Logs**
- Backend: Verifique os logs no dashboard da plataforma
- Frontend: Abra o DevTools e verifique a aba Network

### 4. **Testar Endpoints**
```bash
# Health check
curl https://seu-backend.com/health

# Teste de registro (deve retornar erro de CORS se não configurado)
curl -X POST https://seu-backend.com/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"test","email":"test@test.com","password":"123456"}'
```

## 🛠️ Soluções Comuns

### Problema: CORS Error
```typescript
// Solução: Configurar CORS corretamente
const allowedOrigins = [
  'http://localhost:3000',
  'https://seu-frontend.vercel.app',
  'https://seu-frontend.netlify.app'
];
```

### Problema: Timeout
```typescript
// Solução: Aumentar timeout
const timeout = process.env.NODE_ENV === 'production' ? 15000 : 10000;
```

### Problema: MongoDB Connection
```bash
# Verifique se a URI do MongoDB está correta
# Teste a conexão localmente primeiro
```

### Problema: Variáveis de Ambiente
```bash
# Verifique se as variáveis estão definidas
# Reinicie o deploy após alterar variáveis
```

## 📋 Checklist de Deploy

### Backend
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado para o domínio do frontend
- [ ] MongoDB conectado
- [ ] Endpoint `/health` funcionando
- [ ] Logs sem erros

### Frontend
- [ ] `REACT_APP_API_URL` configurada
- [ ] Build sem erros
- [ ] Debugger funcionando (Ctrl+Shift+D)
- [ ] Teste de conexão passando

### Testes
- [ ] Registro de usuário funcionando
- [ ] Login funcionando
- [ ] Criação de notas funcionando
- [ ] Responsividade mantida

## 🚨 Troubleshooting

### Se ainda não funcionar:

1. **Verifique os logs do backend**
2. **Teste a API diretamente** (Postman/Insomnia)
3. **Verifique se o MongoDB está acessível**
4. **Confirme se as URLs estão corretas**
5. **Teste localmente primeiro**

### Comandos úteis:
```bash
# Verificar se o backend está rodando
curl https://seu-backend.com/health

# Verificar variáveis de ambiente (Vercel)
vercel env ls

# Verificar logs (Vercel)
vercel logs

# Rebuild do frontend
cd frontend && npm run build
```

## 📞 Suporte

Se ainda tiver problemas:
1. Verifique os logs completos
2. Teste cada endpoint individualmente
3. Confirme se o MongoDB está funcionando
4. Verifique se as URLs estão corretas
5. Use o debugger do frontend (Ctrl+Shift+D) 