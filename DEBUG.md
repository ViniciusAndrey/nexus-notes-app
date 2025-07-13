# 🐛 Debug - Problema "Failed to fetch"

## 🔍 Passos para Diagnosticar

### 1. **Verificar se o Backend está Rodando**
```bash
# No terminal, na pasta backend
cd backend
npm run dev
```

**Resultado esperado:**
```
🔄 Tentando conectar ao MongoDB...
📍 URI: mongodb://localhost:27017/nexus
✅ Conectado ao MongoDB com sucesso!
🚀 Servidor rodando na porta 3001
📱 Frontend URL: http://localhost:3000
🔗 API URL: http://localhost:3001
🌐 CORS habilitado para desenvolvimento
```

### 2. **Verificar se o Frontend está Rodando**
```bash
# Em outro terminal, na pasta frontend
cd frontend
npm start
```

**Resultado esperado:**
```
Compiled successfully!

You can now view nexus in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### 3. **Testar a API Diretamente**
Abra o navegador e acesse:
- `http://localhost:3001/health` - Deve retornar `{"status":"OK"}`
- `http://localhost:3001/` - Deve retornar mensagem de boas-vindas

### 4. **Verificar o Console do Navegador**
1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Tente fazer login/registro
4. Observe os logs detalhados

## 🔧 Possíveis Soluções

### **Problema 1: CORS**
Se aparecer erro de CORS no console:

**Solução:** O CORS já está configurado corretamente no backend.

### **Problema 2: MongoDB não Conectado**
Se o backend não conseguir conectar ao MongoDB:

**Solução 1 - Instalar MongoDB Local:**
```bash
# Windows (usando Chocolatey)
choco install mongodb

# Ou baixar do site oficial:
# https://www.mongodb.com/try/download/community
```

**Solução 2 - Usar MongoDB Atlas (Recomendado):**
1. Acesse: https://www.mongodb.com/atlas
2. Crie uma conta gratuita
3. Crie um cluster
4. Obtenha a string de conexão
5. Atualize o arquivo `.env`:

```env
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/nexus
```

### **Problema 3: Porta Bloqueada**
Se a porta 3001 estiver sendo usada:

**Solução:**
```bash
# Verificar se há processo na porta 3001
netstat -ano | findstr :3001

# Matar o processo se necessário
taskkill /PID <PID> /F
```

### **Problema 4: Firewall/Antivírus**
Se o firewall estiver bloqueando:

**Solução:**
1. Adicionar exceção no firewall para Node.js
2. Desabilitar temporariamente o antivírus para teste

## 📱 Testando no Frontend

### **1. Abrir o Console do Navegador**
- Pressione F12
- Vá na aba "Console"
- Limpe o console (Ctrl+L)

### **2. Tentar Registrar um Usuário**
1. Preencha o formulário de registro
2. Clique em "Criar conta"
3. Observe os logs no console

**Logs esperados:**
```
📝 Tentando registrar usuário...
📍 URL: http://localhost:3001/users/register
📤 Dados: {name: "Teste", email: "teste@teste.com", password: "***"}
📥 Status da resposta: 201
✅ Registro bem-sucedido: {user: {...}, token: "***"}
```

### **3. Se Aparecer "Failed to fetch"**
Verifique:
- Se o backend está rodando
- Se a URL está correta
- Se não há erro de CORS
- Se o MongoDB está conectado

## 🚨 Logs de Erro Comuns

### **Erro: "MongoServerSelectionError"**
```
❌ Erro ao conectar ao MongoDB: MongoServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solução:** MongoDB não está rodando

### **Erro: "CORS"**
```
Access to fetch at 'http://localhost:3001/users/register' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solução:** CORS já está configurado, verificar se o backend está rodando

### **Erro: "Network Error"**
```
Failed to fetch
```

**Solução:** Backend não está rodando ou porta bloqueada

## 🔄 Reiniciar Tudo

Se nada funcionar, reinicie tudo:

```bash
# 1. Parar todos os processos (Ctrl+C)

# 2. Reiniciar o backend
cd backend
npm run dev

# 3. Em outro terminal, reiniciar o frontend
cd frontend
npm start

# 4. Limpar cache do navegador (Ctrl+Shift+R)
```

## 📞 Suporte

Se o problema persistir:
1. Verifique se MongoDB está instalado e rodando
2. Use MongoDB Atlas como alternativa
3. Verifique se não há firewall bloqueando
4. Teste em outro navegador
5. Verifique os logs detalhados no console 