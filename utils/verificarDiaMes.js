const {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format,
  } = require("date-fns");
  const { ptBR } = require("date-fns/locale");
  
  // Função que retorna um array com todos os dias de um mês se o ano não for passado o padrão é 2023
  function listarDiasDoMes(mes, ano = 2023) {
    // Obtém a data de início do mês
    const inicioDoMes = startOfMonth(new Date(ano, mes - 1));
  
    // Obtém a data de término do mês
    const fimDoMes = endOfMonth(new Date(ano, mes - 1));
  
    // Obtém um intervalo de datas que representa todos os dias do mês
    const diasDoMes = eachDayOfInterval({ start: inicioDoMes, end: fimDoMes });
  
    // Formata cada data para o formato desejado (dd/MM/yyyy) com o idioma em português
    const diasFormatados = diasDoMes.map((dia) =>
      format(dia, "dd/MM/yyyy", { locale: ptBR })
    );
  
    // Adiciona o dia da semana no array para cada dia do mês
    diasFormatados.forEach((dia, index) => {
      const diaDaSemana = format(diasDoMes[index], "EEEE", { locale: ptBR });
      diasFormatados[index] = `${dia} - ${diaDaSemana}`;
    });
  
    // Retorna o array com todos os dias do mês
    return diasFormatados;
  }
  
  module.exports = listarDiasDoMes;
  