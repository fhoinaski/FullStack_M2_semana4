const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
// metodo usado para verificaros dias do mes ex_2
const listarDiasDoMes = require("../utils/verificarDiaMes");

module.exports = class UsersConroller {

  //? metodo PATH (exercio 2 semana 4)

  static async retorneUsers(req, res) {
    let list = ["Pedro", "José", "Aderbal", "Danilo", "Luisa", "Vitoria"];

    //salva o nome que vem na requisição
    const { name } = req.params;
    const moverNome = name;

    //verifica se o nome está na lista usando o includes
    if (!list.includes(moverNome)) {
      return res.status(400).send(`O nome ${moverNome} não está na lista`);
    }

    //verifica se o nome está na primeira posição da lista
    if (list.indexOf(moverNome) === 0) {
      return res.status(200).send(list);
    }
    //se não estiver na primeira posição da lista entra no else
    else {
      //salva a posição do nome na lista em uma variavel
      let posicao = list.indexOf(moverNome);

      //remove o nome da lista usando o splice informando a posiçao e a quantidade de itens a serem removidos
      list.splice(posicao, 1);

      //adiciona o nome removido na primeira posição da lista
      list.unshift(moverNome);

      //retorna a lista com o nome na primeira posição
      return res.status(200).send(list);
    }
  }

  //? metodo GET (exercio 3 semana 4)

  static async listarDatasDoMes(req, res) {
    //salva o mes e o ano que vem na requisição
    const { mes, ano } = req.query;

    //verifica se o mês foi informado
    if (mes === undefined) {
      return res.status(400).send("Mês não informado");
    }
    //verifica se o mês é válido
    if (mes < 1 || mes > 12) {
      return res.status(400).send("Mês inválido");
    }

    //cria um array com os dias do mês informado
    let diasDoMes = [];
    listarDiasDoMes(mes, ano).forEach((dia) => {
      diasDoMes.push(dia);
    });

    //retorna o array com os dias do mês informado
    return res.status(200).send(diasDoMes);
  }
  //? metodo GET (exercio 5 semana 4)

  static async listarUsers(req, res) {
    const { ageMin, ageMax, state, job } = req.query;
    const filePath = "./database/user.json";

    //le o arquivo
    const fileContent = fs.readFileSync(filePath);
    //converte o arquivo para json
    const jsonDados = JSON.parse(fileContent);

    //filtra os usuarios de acordo com os parametros informados
    const users = jsonDados.filter((user) => {
      if (ageMin && user.age < ageMin) {
        return false;
      }
      if (ageMax && user.age > ageMax) {
        return false;
      }
      if (state && user.state !== state) {
        return false;
      }
      if (job && user.job !== job) {
        return false;
      }
      return true;
    });
    //retorna os usuarios filtrados
    return res.status(200).send(users);
  }

  //? metodo GET (exercio 8 semana 4)
  static async searchUsers(req, res) {
    // Pega o id que vem na requisição e converte para número
    const id = Number(req.params.id);

    // cria uma variavel com o caminho do arquivo
    const filePath = "./database/user.json";

    // Lê o conteúdo do arquivo
    const fileContent = fs.readFileSync(filePath);
    // Converte o fileContent para json
    const jsonDados = JSON.parse(fileContent);

    // Procura pelo item com o id informado
    const userIndex = jsonDados.findIndex((user) => user.id === id);

    // Verifica se o id foi encontrado
    if (userIndex === -1) {
      return res.status(400).send("Usuário não encontrado");
    }

    // Retorna o item encontrado
    return res.status(200).send(jsonDados[userIndex]);
  }

  //? metodo post (exercio 4 semana 4)

  static async salvarJson(req, res) {
    //salva os dados que vem na requisição
    const dados = req.body;

    const filePath = "./dados.json";

    //verifica se foi enviado chaves na requisição
    if (Object.keys(dados).length === 0) {
      return res.status(400).send("Dados não informados");
    }

    // Verifica se o arquivo existe
    if (fs.existsSync(filePath)) {
      // Lê o arquivo e salva o conteúdo na variável
      const fileContent = fs.readFileSync(filePath);
      // Converte o arquivo para JSON e salva na variável
      const jsonDados = JSON.parse(fileContent);

      // Adiciona o novo conteúdo ao arquivo
      jsonDados.push(dados);

      // Salva o arquivo
      fs.writeFileSync(filePath, JSON.stringify(jsonDados));
    } else {
      // Cria um novo arquivo com os dados informados
      fs.writeFileSync(filePath, JSON.stringify([dados]));
    }

    res.status(200).send("Dados salvos com sucesso");
  }

  //? metodo POST (exercio 9 semana 4)
  static async convertString(req, res) {
    //salva os dados que vem na requisição
    const dados = req.body;
    
    //verifica se foi enviado chaves na requisição
    if (Object.keys(dados).length === 0) {
      return res.status(400).send("Dados não informados");
    }
    
    //percorre o objeto e verifica se os valores são strings que podem ser convertidas em números
    for (let key in dados) {
      if (!isNaN(dados[key])) {
        return res.status(400).send(`O campo ${key} não deve ser um número`);
      }
    }
    
    //percorre o objeto e verifica se os valores são strings
    for (let key in dados) {
      if (typeof dados[key] !== "string") {
        return res
          .status(400)
          .json({ error: `O campo ${key} deve ser uma string` });
      }
    }
    
    //converte os letras maiusculas para minusculas e vice versa
    const objetoConvertido = Object.entries(dados).reduce((acc, [key, value]) => {
      acc[key] = value
        //converte a string em um array de letras e faz um map para converter as letras
        .split("")
        .map((letra) => {
          //verifica se a letra é maiuscula ou minuscula e converte
          if (letra === letra.toUpperCase()) {
            return letra.toLowerCase();
          } else {
            return letra.toUpperCase();
          }
        })
        //converte o array de letras em uma string novamente
        .join("");
      return acc;
    }, {});

    //retorna o objeto convertido
    return res.status(200).json(objetoConvertido);
  }

  
  //? metodo PUT (exercio 6 semana 4)

  static async updateJson(req, res) {
    // Pega o id que vem na requisição e converte para número
    const id = Number(req.params.id);
    // Pega os dados que vem na requisição
    const newDados = req.body;
    const filePath = "./database/user.json";

    // Lê o conteúdo do arquivo
    const fileContent = fs.readFileSync(filePath);
    // Converte o arquivo para json
    const jsonDados = JSON.parse(fileContent);

    // Procura pelo item com o id informado
    const userIndex = jsonDados.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(400).send("Usuário não encontrado");
    }
    // Verifica se há algo para alterar
    let alterou = false;
    for (let key in newDados) {
      // não permite alterar o id
      if (key === "id") {
        return res.status(400).send("Não é possível alterar o campo id");
      }

      // Verifica se o valor da chave 'key' no objeto jsonDados[userIndex] é diferente do valor da mesma chave no objeto newDados
      if (jsonDados[userIndex][key] !== newDados[key]) {
        // Se for diferente, atualiza o valor da chave 'key' no objeto jsonDados[userIndex] com o valor da mesma chave no objeto newDados
        jsonDados[userIndex][key] = newDados[key];
        // Define a variável 'alterou' como verdadeira para indicar que houve alteração
        alterou = true;
      }
    }
    // Verifica se foi alterado algo
    if (!alterou) {
      return res.status(400).send("Nada para alterar");
    }
    // Salva o novo conteúdo no arquivo
    fs.writeFileSync(filePath, JSON.stringify(jsonDados));
    // Informa os dados que foram alterados
    res.status(200).send("Dados alterados com sucesso");
  }

  //? metodo DELETE (exercio 7 semana 4)
  
  static async deleteJson(req, res) {
    // Pega o id que vem na requisição e converte para número
    const id = Number(req.params.id);

    // cria uma variavel com o caminho do arquivo
    const filePath = "./database/user.json";
    const filePatchDelete = "./database/userDelet.json";

    // Lê o conteúdo do arquivo
    const fileContent = fs.readFileSync(filePath);

    // Converte o fileContent para json
    const jsonDados = JSON.parse(fileContent);

    // Procura pelo item com o id informado
    const userIndex = jsonDados.findIndex((user) => user.id === id);

    // Verifica se o id foi encontrado
    if (userIndex === -1) {
      return res.status(400).send("Usuário não encontrado");
    }

    //guarda o item que sera deletado no arquivo userDelet.json
    fs.writeFileSync(filePatchDelete, JSON.stringify(jsonDados[userIndex]));

    // Remove o item do array usando o fs
    jsonDados.splice(userIndex, 1);
    // Salva o novo conteúdo no arquivo
    fs.writeFileSync(filePath, JSON.stringify(jsonDados));
    // Informa que o item foi removido
    res.status(200).send("Usuário removido com sucesso");
  }
};
