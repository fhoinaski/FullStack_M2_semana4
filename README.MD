
## Endpoints

### Listar Datas do Mês

Retorna uma lista de datas do mês informado.

- **URL:** `/data`
- **Método:** GET
- **Parâmetros de Consulta:**
  - `mes` (obrigatório): Número do mês desejado.
  - `ano` (opcional): Ano desejado. Se não fornecido, assume o ano atual.
- **Resposta de Sucesso:** Status 200 com a lista de datas do mês.

<hr>
Exemplo buscando dias do mes somente neste caso de 2023 que esta como valor default

```js
http://localhost:3000/data?mes=5
```
Exemplo buscando dias do mes e ano especifico
```js
http://localhost:3000/data?mes=5&ano=2022
```
<hr>
### Listar Usuários

Retorna uma lista de usuários filtrada de acordo com os parâmetros informados.

- **URL:** `/user`
- **Método:** GET
- **Parâmetros de Consulta (todos opcionais):**
  - `ageMin`: Idade mínima dos usuários.
  - `ageMax`: Idade máxima dos usuários.
  - `state`: Estado dos usuários.
  - `job`: Profissão dos usuários.
- **Resposta de Sucesso:** Status 200 com a lista de usuários filtrada.
<hr>

***Exemplos*** 

Ex: Buscar por idade mínima 20 anos
```js
http://localhost:3000/user?ageMin=20
```
Ex: Buscar por idade máxima 30 anos
```js
http://localhost:3000/user?ageMax=30
```
Ex: Buscar por estado (Santa Catarina)
```js
http://localhost:3000/user?state=Santa Catarina
```
Ex: Buscar por profissão (Developer)
```js
http://localhost:3000/user?job=Developer
```
<hr>

### Pesquisar Usuário por ID

Retorna as informações de um usuário com o ID fornecido.

- **URL:** `/:id`
- **Método:** GET
- **Parâmetros de Rota:**
  - `id` (obrigatório): ID do usuário desejado.
- **Resposta de Sucesso:** Status 200 com as informações do usuário.
<hr>

***Exemplo***

Busca informações do id 4
```js
http://localhost:3000/4
```
<hr>

### Salvar Usuário

Salva um novo usuário.

- **URL:** `/`
- **Método:** POST
- **Corpo da Requisição:** Objeto JSON contendo as informações do usuário.
- **Resposta de Sucesso:** Status 200 com uma mensagem de confirmação.
<hr>

***Exemplo***
```js
http://localhost:3000/
```
compor da requisição
```js
{
  "name": "Danilo",
  "age": 21,
  "job": "Developer",
  "state": "Santa Catarina"
}
```
<hr>

### Converter String

Converte as letras maiúsculas para minúsculas e vice-versa em um objeto JSON.

- **URL:** `/convert`
- **Método:** POST
- **Corpo da Requisição:** Objeto JSON contendo as strings a serem convertidas.
- **Resposta de Sucesso:** Status 200 com o objeto JSON convertido.

<hr>

***Exemplo***
```js
http://localhost:3000/convert
```
Corpo da requisição vai converter os as letras minusculas por maiusculas e vice versa
```json
{
  "name": "Dabilo",
  "job": "Developer",
  "state": "Santa Catarina"
}
```
<hr>

### Atualizar Usuário

Atualiza as informações de um usuário com o ID fornecido.

- **URL:** `/update/:id`
- **Método:** PUT
- **Parâmetros de Rota:**
  - `id` (obrigatório): ID do usuário a ser atualizado.
- **Corpo da Requisição:** Objeto JSON contendo as novas informações do usuário.
- **Resposta de Sucesso:** Status 200 com uma mensagem de confirmação.

<hr>

***Exemplo***

Alterar o nome do id 4
```js
http://localhost:3000/update/4
```
Corpo da requisição
```json 
{
  "name": "Dabilo"
}
```
<hr>
### Excluir Usuário

Exclui um usuário com o ID fornecido.

- **URL:** `/delete/:id`
- **Método:** DELETE
- **Parâmetros de Rota:**
  - `id` (obrigatório): ID do usuário a ser excluído.
- **Resposta de Sucesso:** Status 200 com uma mensagem de confirmação.

<hr>

***Exemplo***

Excluir id 4
```js
http://localhost:3000/delete/4
```
<hr>

## Configuração do Projeto

Este projeto foi desenvolvido usando Node.js e Express. Para executá-lo localmente, siga as etapas abaixo:

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório.
3. Instale as dependências do projeto executando o comando `npm install`.
4. Execute o projeto usando o comando `npm start`.
5. A API estará disponível em `http://localhost:3000`.

## Autor

Fernando
