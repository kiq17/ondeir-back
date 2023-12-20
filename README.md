<div align="center">
<h1 align="center">OndeIr</h1>
<a href="https://ondeir-projeto.vercel.app/">Frontend da aplicação</a>
</div>

<br>
<br>
<br>
<br>

Api REST criada para enviar e receber dados da aplicação frontend, responsável pela autentificação dos usuários e ligação com o banco de dados.

## Tecnologias

- Node
- Express
- JWT
- Bcrypt
- Yup
- Mongoose

## Estrutura de pastas

```md
📦src
 ┣ 📂controllers
 ┃ ┣ 📂comment
 ┃ ┃ ┣ 📜createComment.controller.ts
 ┃ ┃ ┣ 📜getComments.controller.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜toggleLike.controller.ts
 ┃ ┣ 📂place
 ┃ ┃ ┣ 📜createPlace.controller.ts
 ┃ ┃ ┣ 📜deletePlace.controller.ts
 ┃ ┃ ┣ 📜editPlace.controller.ts
 ┃ ┃ ┣ 📜getAllPlaces.controller.ts
 ┃ ┃ ┣ 📜getAllPlacesByUser.controller.ts
 ┃ ┃ ┣ 📜getOnePlace.controller.ts
 ┃ ┃ ┣ 📜getPlace.controller.ts
 ┃ ┃ ┣ 📜getTags.controller.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜reviewStars.controller.ts
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📜checkTempLink.controller.ts
 ┃ ┃ ┣ 📜createUser.controller.ts
 ┃ ┃ ┣ 📜deleteUser.controller.ts
 ┃ ┃ ┣ 📜editUser.controller.ts
 ┃ ┃ ┣ 📜editUserAvatar.controller.ts
 ┃ ┃ ┣ 📜forgetPass.controller.ts
 ┃ ┃ ┣ 📜getUser.controller.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜login.controller.ts
 ┃ ┃ ┣ 📜newPassword.controller.ts
 ┃ ┃ ┣ 📜redefinePass.controller.ts
 ┃ ┃ ┣ 📜resendEmail.controller.ts
 ┃ ┃ ┗ 📜verificationOtp.controller.ts
 ┃ ┗ 📜index.ts
 ┣ 📂database
 ┃ ┗ 📜connection.ts
 ┣ 📂middlewares
 ┃ ┣ 📜auth.ts
 ┃ ┗ 📜validation.ts
 ┣ 📂models
 ┃ ┣ 📜Comments.ts
 ┃ ┣ 📜Otp.ts
 ┃ ┣ 📜Places.ts
 ┃ ┗ 📜Users.ts
 ┣ 📂routes
 ┃ ┣ 📜commentRoute.ts
 ┃ ┣ 📜placeRoute.ts
 ┃ ┣ 📜postRoute.ts
 ┃ ┗ 📜userRoute.ts
 ┣ 📂services
 ┃ ┣ 📜createComment.service.ts
 ┃ ┣ 📜createOtp.service.ts
 ┃ ┣ 📜createPlace.service.ts
 ┃ ┣ 📜createUser.service.ts
 ┃ ┣ 📜editUser.service.ts
 ┃ ┣ 📜editUserAvatar.service.ts
 ┃ ┣ 📜findPlace.service.ts
 ┃ ┣ 📜findPlaceById.service.ts
 ┃ ┣ 📜findUserById.service.ts
 ┃ ┣ 📜getAllPlaces.service.ts
 ┃ ┣ 📜getAllPlacesByUser.service.ts
 ┃ ┣ 📜getComments.service.ts
 ┃ ┣ 📜getTags.service.ts
 ┃ ┣ 📜login.service.ts
 ┃ ┣ 📜newPassword.service.ts
 ┃ ┣ 📜reviewStars.service.ts
 ┃ ┣ 📜toggleLikes.service.ts
 ┃ ┗ 📜updatePlace.service.ts
 ┣ 📂utils
 ┃ ┣ 📜convert64.ts
 ┃ ┣ 📜fnReturnHtml.ts
 ┃ ┣ 📜loadEnv.ts
 ┃ ┣ 📜mathReview.ts
 ┃ ┣ 📜redefinePassHtml.ts
 ┃ ┗ 📜translateYup.ts
 ┣ 📜app.ts
 ┗ 📜server.ts
```

## Middlewares

- Validação de token
- Validação de dados

## Rotas


| URL         | Tipo      | Validação  |  Autentificação | Descrição                                   |
| :---------- | :---------| :--------: |   :--------:    | :------------------------------------------ |
| `/users/`   | `POST`     |     ✔️     |      ❌         | Criação de usuário|
| `/users/login`| `POST`     |     ✔️     |      ❌         | Criação do token para o usuário|
| `/users/:userId`| `DELETE`     |   ❌      |      ✔️  | Exclusão de usuário|
| `/users/avatar`| `PATCH`     |   ✔️     |      ✔️  | Editar foto do perfil do usuário|
| `/users/profile`| `PATCH`     |   ✔️     |      ✔️  | Editar nome e descrição do perfil|
| `/users/password`| `PATCH`     |   ✔️     |      ✔️  | Editar senha|
| `/users/profile/:userId`| `GET`     |   ✔️     |     ❌  | Retorna um usuário especifico|
| `/users/check/:temp`| `GET`     |   ✔️     |      ✔️  | Verificação de código|
| `/users/check/code`| `POST`     |   ✔️     |      ✔️  | Validação do código enviado|
| `/users/resend`| `POST`     |   ✔️     |      ✔️  | Envio de email para mudança de senha|
| `/users/resendEmail/:userId`| `POST`     |   ✔️     |      ✔️  | Enviar novamente email caso o tempo expire|
| `/places/`   | `POST`     |     ✔️     |      ✔️         | Criação de postagem|
| `/places/:placeId`| `GET`     |   ✔️     |      ❌  | Retorna uma postagem específico|
| `/places/user/:userId`| `GET`     |   ✔️     |      ❌  | Retorna todas as postagens de um usuário específico|
| `/places/review/:star/:placeId`| `POST`     |   ✔️     |      ✔️  | Criar avaliação de uma postagem|
| `/places/edit/:placeId`| `PUT`     |   ✔️     |      ✔️  | Editar uma postagem|
| `/places/delete/:placeId`| `DELETE`     |   ❌     |      ✔️  | Deletar uma postagem|
| `/comments/:placeId`| `GET`     |   ❌     |      ❌  | Retorna todos os comentários de uma postagem|
| `/comments/:placeId`| `POST`     |   ✔️     |      ✔️  | Cria um comentário em uma postagem|
| `/comments/toggle/:commentId`| `POST`     |   ✔️     |      ✔️  | Incrementa ou decrementa o like/dislike|

## Detalhamento de rotas

```
/users/login
```

Verifica se o e-mail está presente no banco de dados e checa se o hash da senha guardada é igual ao valor da requisição, após estas etapas é criado um token JWT utilizando um payload e tempo de expiração.

```
/users/check/code
```

O código é vinculado a um usuário para verificar se o mesmo confirmou o e-mail ou não. Os códigos de verificação são enviados por e-mail e possuem um tempo de expiração sendo assim após certo período ele é excluído do banco de dados, nesse caso o usuário precisa logar novamente pra ser enviado um novo código.

```
/comments/toggle/:commentId
```

Realiza a função de toggle para like e dislike. Um usuário ao avaliar o comentário com um like ou dislike e clicar novamente nele faz com que o valor seja zerado, para isso é salvo o usuário que realizou a ação e qual o tipo (like ou dislike). No caso de um usuário avaliar um comentário com like e após isso avaliar o mesmo comentário com um dislike o like é retirado e o dislike incrementado, se por ventura ele clicar novamente no dislike o valor é zerado como explicado anteriormente.


## Aprendizados

Uns dos principais foram a criação dos middlewares tanto de autentificarão quanto o de validação dos dados, durante o processe pude aprender mais sobre tokens JWT e sobre o yup, ferramenta utilizada para ajudar na validação dos dados. A organização em controllers e services foi uma maneira nova de lidar com construção de api comparadas as que eu construí anteriormente.


## Melhorias

O projeto ainda pode melhorar bastante, por isso ainda vou realizar certas atualizações como:

- [ ] Refatorações

- [ ] Testes

- [ ] Arquitetura

Durante o projeto fui aprendendo sobre algunas tópicos que são interessantes para manter uma boa perfomance e agora vou poder focar neles.


## Feedback

Se você tiver algum feedback, por favor entre em contato pelo meu [Linkedin](https://www.linkedin.com/in/caique-de-castro-silva/)

Obrigado pela sua atenção. <a href="#top">Voltar ao topo</a>
