# DevGram — Rede Social da Sala

<img width="262" height="577" alt="image" src="https://github.com/user-attachments/assets/a3fc2514-3734-4790-bd15-6df750407d53" />


Projeto base em React Native com Expo para uma atividade em grupo.

## Como rodar

```bash
npm install
npm start
```

Depois pressione:

```txt
a
```

para abrir no emulador Android.

## Objetivo

Construir uma mini rede social local usando apenas:

- React Native
- React Navigation
- useState
- useEffect
- AsyncStorage
- Componentes
- Props
- Arrays e objetos

## Chaves oficiais do AsyncStorage

```txt
usuarioLogado
posts
```

## Estrutura oficial do usuário

```js
{
  nome: "Maria",
  turma: "Mobile",
  bio: "Estudante de React Native"
}
```

## Estrutura oficial do post

```js
{
  id: Date.now(),
  usuario: "Maria",
  texto: "Hoje a aula foi top!",
  likes: 0,
  comentarios: [],
  criadoEm: new Date().toISOString()
}
```

## Estrutura oficial do comentário

```js
{
  id: Date.now(),
  usuario: "Maria",
  texto: "Muito bom kkk"
}
```

## Divisão por equipes

### Equipe 1 — Estrutura, Login e Navegação

Arquivos principais:

```txt
src/screens/LoginScreen.js
src/screens/HomeScreen.js
src/routes/AppRoutes.js
```

Responsável por:

- Login fake
- Salvar usuário
- Tela inicial
- Navegação geral

### Equipe 2 — Feed, Posts e Curtidas

Arquivos principais:

```txt
src/screens/FeedScreen.js
src/components/PostCard.js
```

Responsável por:

- Listar posts
- Exibir cards
- Curtidas
- Atualizar posts no AsyncStorage

### Equipe 3 — Novo Post, Comentários e Perfil

Arquivos principais:

```txt
src/screens/NovoPostScreen.js
src/screens/PerfilScreen.js
src/components/ComentarioBox.js
```

Responsável por:

- Criar novo post
- Comentar
- Exibir perfil
- Exibir estatísticas

## Desafio final

A sala precisa entregar um app onde o aluno:

1. Faz login
2. Cria posts
3. Visualiza o feed
4. Curte posts
5. Comenta posts
6. Vê seu perfil com estatísticas
