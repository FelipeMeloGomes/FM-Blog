# 🚀 FM Blog

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://fm-blog.vercel.app/)
[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FelipeMeloGomes/FM-Blog)

Um blog moderno de tecnologia construído com React e Firebase.

---

## 📸 Screenshots

<div align="center">
  <img src="https://placehold.co/1200x600/1a1a2e/FFF?text=FM+Blog+Screenshot" alt="FM Blog Preview" width="100%">
</div>

---

## 📖 Descrição

FM Blog é uma aplicação web moderna para publicação de artigos de tecnologia. O projeto foi desenvolvido com foco em performance, usabilidade e uma experiência de usuário fluida, utilizando as melhores práticas e tecnologias atuais do mercado.

---

## ✨ Funcionalidades

- **Home** - Lista de posts com paginação infinita
- **Posts** - Visualização individual com likes e compartilhamento
- **Editor Rich Text** - Criar posts com TipTap editor
- **CRUD Completo** - Criar, editar e deletar posts
- **Dashboard** - Gerenciar seus posts publicados
- **Perfil** - Upload de foto de perfil via Cloudinary
- **Busca** - Pesquisar posts por título
- **Autenticação** - Login/registro com email/senha ou Google
- **Recuperação de Senha** - Sistema completo de reset de senha
- **Página 404** - Personalizada para rotas inválidas
- **Modo Escuro** - Toggle entre tema claro/escuro
- **Responsivo** - Layout adaptável para todos dispositivos
- **Loading States** - Skeletons durante carregamento
- **Notificações** - Toast messages com Sonner
- **Scroll to Top** - Botão para retornar ao topo
- **Empty States** - Mensagens quando não há conteúdo

---

## 🛠️ Tech Stack

| Categoria | Tecnologia |
|-----------|------------|
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) |
| **Routing** | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) |
| **Backend** | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=white) |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwind-css&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=shadcnui&logoColor=white) |
| **Editor** | ![TipTap](https://img.shields.io/badge/TipTap-2D3748?style=flat&logo=tinymce&logoColor=white) |
| **Forms** | ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5995?style=flat&logo=react-hook-form&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-3E67B8?style=flat&logo=zod&logoColor=white) |
| **Data Fetching** | ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=react-query&logoColor=white) |
| **Imagens** | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) |
| **Deploy** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) |

---

## 🚀 Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/FelipeMeloGomes/FM-Blog.git
cd FM-Blog
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 4. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

Acesse: `http://localhost:5173`

---

## 📝 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `VITE_FIREBASE_API_KEY` | Chave da API do Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Domínio de autenticação |
| `VITE_FIREBASE_PROJECT_ID` | ID do projeto Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | Bucket de armazenamento |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Sender ID do Firebase Messaging |
| `VITE_FIREBASE_APP_ID` | ID do app no Firebase |
| `VITE_CLOUDINARY_CLOUD_NAME` | Nome da sua conta Cloudinary |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Upload preset unsigned do Cloudinary |

---

## 🌐 Deploy

O projeto está deployed na Vercel: **https://fm-blog.vercel.app/**

---

## 🤝 Contribuição

1. Fork este repositório
2. Crie sua branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>Desenvolvido com ❤️ por <a href="https://github.com/FelipeMeloGomes">Felipe Melo</a></p>
</div>
