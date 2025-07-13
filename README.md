# Nexus - Aplicativo de Notas

Um aplicativo de notas moderno e minimalista com editor de texto rico (WYSIWYG), desenvolvido com React, TypeScript e Node.js.

## 🚀 Tecnologias

### Frontend
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática
- **Styled Components** - Estilização CSS-in-JS
- **Slate.js** - Editor de texto rico
- **Axios** - Cliente HTTP

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **UUID** - Geração de IDs únicos

## 📁 Estrutura do Projeto

```
Nexus/
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── api/          # Serviços de API
│   │   ├── theme/        # Configurações de tema
│   │   └── App.tsx       # Componente principal
│   └── package.json
├── backend/           # Servidor Node.js
│   ├── src/
│   │   ├── notes/        # Rotas e controladores de notas
│   │   └── index.ts      # Servidor principal
│   └── package.json
└── README.md
```

## 🛠️ Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Backend
```bash
cd backend
npm install
npm start
```
O servidor estará rodando em `http://localhost:3001`

### Frontend
```bash
cd frontend
npm install
npm start
```
A aplicação estará rodando em `http://localhost:3000`

## ✨ Funcionalidades

- **Editor de Texto Rico**: Suporte a negrito, itálico, sublinhado, listas e títulos
- **Interface Minimalista**: Design clean e focado na produtividade
- **Persistência de Dados**: Notas salvas no backend
- **Navegação Intuitiva**: Barra lateral com lista de notas
- **Responsivo**: Interface adaptável a diferentes tamanhos de tela

## 🎨 Design

O projeto segue princípios de design minimalista:
- Paleta de cores neutras e suaves
- Tipografia limpa e legível
- Espaçamento generoso
- Ícones simples e intuitivos
- Foco na usabilidade

## 📝 API Endpoints

- `GET /notes` - Listar todas as notas
- `POST /notes` - Criar nova nota
- `PUT /notes/:id` - Atualizar nota existente
- `DELETE /notes/:id` - Excluir nota

## 🚀 Deploy

Este projeto está configurado para deploy gratuito em várias plataformas:

### Opções Recomendadas:
- **Vercel + MongoDB Atlas** (Mais fácil e gratuito)
- **Netlify + Railway** (Alternativa robusta)
- **Render** (Tudo em um lugar)

### Deploy Rápido:
```bash
# Executar script de preparação
chmod +x deploy.sh
./deploy.sh
```

📖 **Guia completo**: Consulte o arquivo `DEPLOY.md` para instruções detalhadas.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes. 