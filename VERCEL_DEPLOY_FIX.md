# 🔧 Correção do Deploy Vercel - Nexus Notes

## ❌ Problema Atual
O Vercel está retornando 404 porque não consegue encontrar o arquivo principal do servidor.

## ✅ Solução

### Opção 1: Usar API Routes (Recomendado)

1. **Estrutura criada:**
   ```
   Nexus/
   ├── api/
   │   └── index.ts          # Servidor Express para Vercel
   ├── backend/              # Código original
   ├── frontend/             # Código original
   └── vercel.json           # Configuração atualizada
   ```

2. **Configuração do vercel.json:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "api/index.ts",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/api/index.ts"
       }
     ]
   }
   ```

### Opção 2: Configurar Root Directory

1. **No painel do Vercel:**
   - Settings → General
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Output Directory: `(deixar vazio)`

2. **Variáveis de ambiente:**
   ```
   MONGODB_URI=sua_string_mongodb
   FRONTEND_URL=https://seu-frontend.vercel.app
   NODE_ENV=production
   ```

## 🚀 Passos para Corrigir

### Passo 1: Fazer Commit das Mudanças
```bash
git add .
git commit -m "Fix Vercel deployment configuration"
git push origin main
```

### Passo 2: Redeploy no Vercel
1. Acesse o painel do Vercel
2. Vá em Deployments
3. Clique em "Redeploy" no último deploy

### Passo 3: Testar
1. Acesse: `https://seu-backend.vercel.app/`
2. Deve retornar: `{"message": "Nexus API está funcionando!"}`

## 🔍 Verificação

### Teste da API:
```bash
# Teste da rota raiz
curl https://seu-backend.vercel.app/

# Teste do health check
curl https://seu-backend.vercel.app/health

# Teste das notas
curl https://seu-backend.vercel.app/notes
```

### Respostas esperadas:
- **Rota raiz**: `{"message": "Nexus API está funcionando!"}`
- **Health**: `{"status": "OK"}`
- **Notes**: `[]` (array vazio se não há notas)

## 🆘 Se ainda não funcionar

### Verificar Logs:
1. Vercel Dashboard → Deployments
2. Clique no deploy
3. Vá em "Functions" → "api/index.ts"
4. Verifique os logs de erro

### Problemas comuns:
1. **MongoDB não conecta**: Verificar `MONGODB_URI`
2. **CORS error**: Verificar `FRONTEND_URL`
3. **Build fails**: Verificar dependências

## 📞 Suporte

Se ainda tiver problemas:
1. Verifique os logs no Vercel Dashboard
2. Teste localmente primeiro: `npm run dev`
3. Verifique se o MongoDB Atlas está configurado

---

**🎉 Após corrigir, seu backend estará funcionando no Vercel!** 