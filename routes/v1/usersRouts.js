const express = require('express');
//importa o router pelo express
const usersRoutesV1 = express.Router();

//importa o controller
const UsersController = require('../../controllers/exeControllers');

//cria a rota

//rota para o método GET
usersRoutesV1.get('/data', UsersController.listarDatasDoMes);

usersRoutesV1.get('/user' , UsersController.listarUsers)

usersRoutesV1.get('/:id', UsersController.searchUsers);



//rota para o método POST
usersRoutesV1.post('/', UsersController.salvarJson);

usersRoutesV1.post('/convert', UsersController.convertString);

//rota para o método PUT
usersRoutesV1.put('/update/:id', UsersController.updateJson);

//rota para o método DELETE
usersRoutesV1.delete('/delete/:id', UsersController.deleteJson);

// rota para o metoro PATCH
usersRoutesV1.patch('/list/:name', UsersController.retorneUsers);


module.exports = usersRoutesV1;