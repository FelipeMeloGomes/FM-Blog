# 🚀 FM-Blog - Blog de Tecnologia

> Blog moderno de tecnologia desenvolvido com React, focado em performance, qualidade de código e melhores práticas de desenvolvimento.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FelipeMeloGomes/FM-Blog)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://fm-blog.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📋 Descrição do Projeto

FM-Blog é um blog completo de tecnologia desenvolvido para demonstrar habilidades como **desenvolvedor Front-end**, com foco no ecossistema **React** e tecnologias modernas que aumentam produtividade, segurança e qualidade do código.

### Objetivos do Projeto

- Criar uma experiência de leitura moderna e responsiva
- Demonstrar boas práticas de arquitetura de software
- Implementar integração com serviços externos (Firebase, Cloudinary)
- Garantir qualidade com testes e linting
- Configurar deploy automatizado com Vercel

### Público-Alvo

- Desenvolvedores que desejam aprender React e práticas modernas
- Profissionais que buscam referência de arquitetura Front-end
- Projetos de estudo e portfólio

---

## 🚀 Tecnologias Usadas

### Framework & Linguagem

| Tecnologia     | Versão | Descrição                      |
| -------------- | ------ | ------------------------------ |
| **React**     | 18.x   | Biblioteca de UI               |
| **TypeScript** | 5.x    | Tipagem estática               |
| **Vite**      | 5.x    | Build tool e dev server        |

### Estilização & UI

| Tecnologia          | Descrição                              |
| ------------------- | -------------------------------------- |
| **Tailwind CSS**    | Framework de CSS utilitário            |
| **shadcn/ui**       | Componentes acessíveis e customizáveis |
| **Framer Motion**   | Animações declarativas                 |
| **React Icons**     | Ícones                                 |

### Backend-as-a-Service

| Serviço        | Funcionalidade                                |
| -------------- | -------------------------------------------- |
| **Firebase**   | Autenticação e banco de dados (Firestore)   |
| **Cloudinary** | Upload e otimização de imagens              |

### Desenvolvimento & Qualidade

| Ferramenta         | Funcionalidade                 |
| ------------------ | ------------------------------ |
| **Biome**          | Linting e formatação de código |
| **Vite**           | Build e desenvolvimento        |
| **Vercel**         | Deploy e preview deployments   |

### Outras Bibliotecas

- **React Router**: Gerenciamento de rotas
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de esquemas
- **TanStack Query**: Data fetching e caching
- **TipTap**: Editor rich text
- **Sonner**: Notificações toast
- **DOMPurify**: Sanitização de HTML

---

## ✨ Funcionalidades Implementadas

### 📄 Sistema de Posts

- Lista de posts com paginação
- Visualização individual de post
- Editor rich text (TipTap) para criação de posts
- Sistema de tags
- Imagem de capa com upload para Cloudinary
- Contador de visualizações (views)
- Tempo de leitura estimado

### 💬 Sistema de Comentários

- Criar comentários em posts
- Respostas em threads
- Likes em comentários
- Tempo real (onSnapshot do Firebase)
- Paginação com "Carregar mais"
- Validação com React Hook Form + Zod
- Contador de caracteres (máx. 500)
- Auto focus no textarea
- Toast de confirmação para delete
- Empty states e loading skeletons

### 🔐 Sistema de Autenticação

- Login/cadastro com email e senha
- Login com Google
- Recuperação de senha
- Rotas protegidas (PrivateRoute)
- Redirecionamento para logados (PublicRoute)

### 👤 Perfil do Usuário

- Edição de perfil
- Upload de foto de perfil (Cloudinary)
- Gerenciamento de posts publicados

### 📊 Dashboard

- Listagem de posts do usuário
- Busca e filtros nos posts
- Ordenação (recentes, antigos, mais curtidos)
- Sistema de delete com confirmação
- Edição de posts existentes
- Visualização de views e likes por post

### 🔍 Sistema de Busca

- Busca de posts por título
- Resultados com paginação

### 🎨 UI/UX

- Modo escuro/claro com persistência
- Layout responsivo (mobile, tablet, desktop)
- Loading skeletons
- Toast notifications (Sonner)
- Scroll to top
- Empty states
- Animações com Framer Motion
- Página 404 personalizada

### 🔒 Segurança

- Regras de Firestore para proteção de dados
- Validação server-side
- Upload unsigned (sem permissões extras)
- Headers COOP para popup do Google

---

## 🔧 Configurações de Ambiente

### Variáveis Obrigatórias (.env)

```env
# Firebase
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=seu_upload_preset
```

---

## ▶️ Como Rodar o Projeto

### Pré-requisitos

- Node.js 18.x ou superior
- pnpm (ou npm/yarn)
- Conta no Firebase
- Conta no Cloudinary

### Instalação

```bash
# Clone o repositório
git clone https://github.com/FelipeMeloGomes/FM-Blog.git
cd FM-Blog

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais
```

### Executar Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Acesse http://localhost:5173
```

### Comandos Disponíveis

| Comando         | Descrição                            |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Iniciar servidor de desenvolvimento  |
| `pnpm build`   | Build de produção                    |
| `pnpm preview` | Iniciar servidor de produção         |
| `pnpm lint`    | Verificar lint                       |

---

## 📁 Estrutura de Pastas

```
FM-Blog/
├── src/
│   ├── components/           # Componentes React
│   │   ├── ui/              # Componentes shadcn/ui
│   │   ├── Comments/         # Sistema de comentários
│   │   ├── CommentItem/     # Item de comentário
│   │   └── ...
│   ├── contexts/            # Contextos React
│   ├── hooks/               # Hooks customizados
│   │   ├── useComments.ts  # Hook de comentários
│   │   └── ...
│   ├── lib/                 # Utilitários e clientes
│   │   └── hooks/          # Queries do TanStack Query
│   ├── pages/               # Páginas da aplicação
│   ├── schemas/             # Schemas de validação Zod
│   ├── utils/               # Utilitários
│   └── firebase/            # Configuração Firebase
├── public/                   # Arquivos estáticos
├── firestore.rules          # Regras de segurança do Firestore
├── vercel.json              # Configuração Vercel
└── ...
```

### Descrição dos Diretórios

- **`src/components/`** - Componentes React reutilizáveis
- **`src/components/ui/`** - Componentes shadcn/ui base (Button, Input, Avatar, etc.)
- **`src/components/Comments/`** - Container de comentários com paginação
- **`src/components/CommentItem/`** - Item individual de comentário
- **`src/contexts/`** - Contextos React (Auth, ColorMode)
- **`src/hooks/`** - Hooks customizados (useAuth, useDelete, useComments, etc.)
- **`src/lib/`** - Utilitários, clientes e configurações
- **`src/pages/`** - Páginas da aplicação
- **`src/schemas/`** - Schemas de validação Zod
- **`src/utils/`** - Funções utilitárias
- **`src/firebase/`** - Configuração e inicialização do Firebase

---

## 🤝 Como Contribuir

1. **Fork** o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das alterações (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

### Padrão de Commits

Este projeto segue o padrão [Conventional Commits](https://conventionalcommits.org/):

```
feat: adiciona nova funcionalidade
fix: corrige um bug
refactor: refatora código
chore: atualiza configurações
test: adiciona ou corrige testes
docs: atualiza documentação
```

### Boas Práticas

- Sempre rode `pnpm lint` antes de commit
- Execute o build antes de abrir PR
- Use TypeScript para novas implementações
- Mantenha o código limpo e organizado

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 🙏 Agradecimentos

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel](https://vercel.com/)
