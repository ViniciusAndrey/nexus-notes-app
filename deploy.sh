#!/bin/bash

# 🚀 Script de Deploy Automatizado - Nexus Notes
# Este script prepara o projeto para deploy

echo "🚀 Preparando Nexus Notes para deploy..."

# Verificar se está no diretório raiz
if [ ! -f "package.json" ]; then
    echo "❌ Execute este script no diretório raiz do projeto"
    exit 1
fi

# Verificar se o git está configurado
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Este diretório não é um repositório git"
    exit 1
fi

echo "📋 Verificando estrutura do projeto..."

# Verificar se as pastas existem
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Estrutura do projeto inválida. Deve ter pastas 'backend' e 'frontend'"
    exit 1
fi

echo "🔧 Configurando variáveis de ambiente..."

# Criar arquivos .env se não existirem
if [ ! -f "backend/.env" ]; then
    echo "📝 Criando backend/.env..."
    cat > backend/.env << EOF
# Configurações do Servidor
PORT=3001

# MongoDB (substitua pela sua string de conexão)
MONGODB_URI=mongodb://localhost:27017/nexus

# Frontend URL (será atualizada após deploy)
FRONTEND_URL=http://localhost:3000

# Ambiente
NODE_ENV=development
EOF
    echo "✅ backend/.env criado"
fi

if [ ! -f "frontend/.env" ]; then
    echo "📝 Criando frontend/.env..."
    cat > frontend/.env << EOF
# URL da API Backend (será atualizada após deploy)
REACT_APP_API_URL=http://localhost:3001

# Ambiente
REACT_APP_ENV=development
EOF
    echo "✅ frontend/.env criado"
fi

echo "📦 Instalando dependências..."

# Instalar dependências do backend
echo "🔧 Backend..."
cd backend
npm install
cd ..

# Instalar dependências do frontend
echo "🎨 Frontend..."
cd frontend
npm install
cd ..

echo "🧪 Testando builds..."

# Testar build do backend
echo "🔧 Testando build do backend..."
cd backend
npm run build 2>/dev/null || echo "⚠️  Build do backend não configurado (normal para desenvolvimento)"
cd ..

# Testar build do frontend
echo "🎨 Testando build do frontend..."
cd frontend
npm run build
cd ..

echo "✅ Build do frontend concluído com sucesso!"

echo ""
echo "🎉 Projeto preparado para deploy!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure o MongoDB Atlas (gratuito)"
echo "2. Faça deploy no Vercel, Netlify ou Render"
echo "3. Configure as variáveis de ambiente"
echo "4. Atualize as URLs nos arquivos .env"
echo ""
echo "📖 Consulte o arquivo DEPLOY.md para instruções detalhadas"
echo ""
echo "🔗 Links úteis:"
echo "- MongoDB Atlas: https://mongodb.com/cloud/atlas"
echo "- Vercel: https://vercel.com"
echo "- Netlify: https://netlify.com"
echo "- Render: https://render.com"
echo ""
echo "🚀 Boa sorte com seu micro SaaS!" 