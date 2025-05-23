# Angular Frontend - Falaê

Este é o frontend da aplicação de chat desenvolvida em Angular, que se comunica com uma API Node.js utilizando JWT para autenticação. O projeto conta com três componentes principais: **Login**, **Registro** e **Chat**.

## 🛠 Tecnologias Utilizadas

- [Angular](https://angular.io/) 16+
- RxJS
- Angular Router
- Angular Forms
- Angular Standalone Components
- HTTP Interceptor (para autenticação JWT)
- TypeScript

## 📁 Estrutura de Componentes

- `login.component.ts/html/scss`: Tela de login de usuário.
- `register.component.ts/html/scss`: Tela de registro de novo usuário.
- `chat.component.ts/html/scss`: Tela principal de conversa (chat em tempo real via polling).
- `services/backend.service.ts`: Serviço que faz a comunicação HTTP com o backend.
- `interceptors/auth.interceptor.ts`: Interceptador para envio automático do token JWT e redirecionamento em erros.

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/luizgustavogg/falae
cd falae
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode a aplicação

```bash
ng serve
```

Acesse no navegador: `http://localhost:4200`

## ⚙️ Configurações adicionais

- Certifique-se de que o backend Node.js está rodando em `http://localhost:3000`
- O token JWT é armazenado em `localStorage` após o login
- As requisições protegidas são automaticamente interceptadas e enviadas com o token pelo `auth.interceptor.ts`

## 🔒 Segurança

- Autenticação baseada em JWT
- Senhas são validadas no backend com SHA256
- O interceptor redireciona o usuário para a página de login se o token for inválido

## 📬 Contato

Caso tenha dúvidas ou queira contribuir, sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.visua
