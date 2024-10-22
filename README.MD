## Autenticação com referesh token

Utilizei essa aula para entender melhor como funciona um fluxo de autenticação com refresh token.

É uma implementação bastante simples, porém, ainda me dá bastante dúvida sobre como desenhar o melhor processo de validação do refresh token.

Nele vamos construir apenas um sistema com foco na criação de um usuário e autenticação.

A ideia é conseguir autenticar um usuário através de um token e utilizar o refresh token como processo de postergação da autenticação.

A única alteração que fiz, foi adicionar à lógica de validação do refresh token que caso ele esteja expirado, o usuário deverá ser enviado de volta para a tela de login.

Apenas o token de autenticação é enviado para o usuário. O refresh token permance o tempo todo no backend e isso é apenas umas das estratégias possíveis.

## Configurando o ambiente

```
npx tsc --init

npx prisma init
npx prisma migrate dev

```

Referência: [Como implementar Refresh Token em uma aplicação com Node? - Code/drops #88
](https://www.youtube.com/watch?v=RaweREhpBX8)
