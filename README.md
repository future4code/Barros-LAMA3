# ![image](https://user-images.githubusercontent.com/102332717/225949131-54a21145-4272-42ae-bb0d-85aad4b12212.png)Labenu Music Awards-BackEnd-Turma Barros ![image](https://user-images.githubusercontent.com/102332717/225949131-54a21145-4272-42ae-bb0d-85aad4b12212.png)
![image](https://user-images.githubusercontent.com/102332717/226071435-d924044f-3efe-4f14-b054-88cd4b7e2486.png)


Link Render:
<br>
Link Documentação: 
 
 ## 🧩 Proposta do Projeto
Projeto desenvolvido no BootCamp Labenu: O **LAMA**, *Labenu Musical Awards*, é um pequeno projeto com a proposta de gerar funcionalidades de BackEnd 
para festivaais musicais que terão duração fixa de 3 dias (sexta, sábado e domingo), começando sempre as 08h e acabando as 23h, totalizando 15h de show a cada dia. 

As funcionalidades básicas do projeto devem ser:

 1. ### 🎵 Cadastro
> O sistema deve permitir o registro dos usuários que irão usá-lo. Para se cadastrar, é necessário passar um email, um nome e uma senha. Você pode ser um cliente (usuário normal) ou um administrador do sistema (admin). O usuário deve poder se logar automaticamente após o cadastro.

2. ### 🎵 Login
> Para realizar o login, basta informar seu e-mail e a sua senha. O retorno deve conter o token de autenticação do usuário. Caso tenha interesse, tente tornar o código de cadastro mais testável utilizando a inversão de dependência.

3. ### 🎵 Endpoint de registrar banda
> O sistema deve deixar registrado todas as bandas que participarão dos três dias de shows. Para uma banda ser criada, precisamos das informações: nome, gênero musical principal a qual ela se identifica e o nome de um responsável (que pode ser qualquer membro dela). Não podem existir duas bandas com o mesmo nome. Somente administradores podem registrar bandas. Caso tenha interesse, Faça ao menos dois testes para checar se os dados estão corretos, sendo um em caso de erro e outro em caso de acerto.

4. ### 🎵 Endpoint de visualização de detalhes sobre a banda 
> Esse endpoint deve receber o id ou o nome da banda e retornar as todas as informações salvas sobre ela.

5. ### 🎵 Endpoint de adicionar um show a um dia
> Para cadastrar um show, o endpoint precisa do id da banda, o dia (sexta, sábado ou domingo) e o horário em que ela irá se apresentar. Deve haver uma validação para indicar se o horário é válido (ou seja, se está entre 08h e 23h). Além disso os shows só podem ser marcados em horários redondos, ou seja, pode ser 08h - 09h ou 09h - 13h mas não pode ser 09h - 10h30 ou 10h30 - 14h.
>Caso já exista um show marcado para o dia e o horário em questão, o seu endpoint deve retornar um erro.

6. ### 🎵 Endpoint de pegar todos os shows de uma data
> Recebe um dia (sexta, sábado ou domingo) e retorna todos os shows daquela data (ordenados pelo horário), mostrando somente o nome da banda e o gênero musical principal.

### Desafios do projeto
![image](https://user-images.githubusercontent.com/102332717/226071435-d924044f-3efe-4f14-b054-88cd4b7e2486.png)

7. ### 🎵 Endpoint de criar um ingresso
> O caso de uso desse endpoint é o administrador do sistema querendo criar ingressos para serem vendidos. Para criar, precisa indicar: nome do ingresso, valor, o id do evento e a quantidade de ingressos. No banco, deverá ser guardado a quantidade de ingressos totais e criar um campo "quantidade de ingressos vendidos" com o valor 0 para guardar esse registro. Somente administradores podem registrar ingressos.

8. ### 🎵 Comprar ingresso
> Deve receber a quantidade de ingressos e o nome. Deve retornar erros específicos para um nome inválido, ingresso não encontrado e quantidade inválida (ou seja se existem menos ingressos disponíveis do que o usuário quer comprar)

9. ### 🎵 Adicionar foto
> Deverá ser criado um endpoint que adiciona uma foto para a galeria de um evento. Elas devem ser armazenadas como links no banco de dados.

10. ### 🎵 Pegar todas as fotos
> O endpoint receberá o identificador do evento e devolverá todas as fotos deste.

### 🛠️ Tecnologias Utilizadas:
<img Aling="center" height="20" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"/>Node.Js<br/>
<img Aling="center" height="20" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"/>Express<br/>
<img Aling="center" height="20" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"/>TypeScript<br/>
<img Aling="center" height="20" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"/>MySqL<br/>
<img Aling="center" height="20" src="https://knexjs.org/knex-logo.png"/>Knex <br/>
<img Aling="center" height="20" src="https://bcrypt.online/images/bcrypt-esse-tools-logo-square.svg"/>BCrypt<br/>
 
🌪️ Para Rodar o projeto foi utilizado a biblioteca NPM install.





![image](https://user-images.githubusercontent.com/102332717/226074388-1396a6a8-e277-4fc0-98db-bc45366a01ca.png)
### Autores:

[![LinkedIn](https://img.shields.io/badge/Kayo_Ceshar-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
)](https://www.linkedin.com/in/kayo-ceshar/)<br/>
[![LinkedIn](https://img.shields.io/badge/Felipe_Alcantara-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
)](https://www.linkedin.com/in/fmalcantara/)
