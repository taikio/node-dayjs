var dayjs = require("dayjs")
var duration = require('dayjs/plugin/duration')
var utc = require('dayjs/plugin/utc')

dayjs.extend(duration)
dayjs.extend(utc)

/* ======= parametros ======= */
const HorasEmMinutos = {
  1: 60,
  2: 120,  
};

const TiposServicos = {
  corte: 'Corte',
  barba: 'Barba',
  sobrancelha: 'Sobrancelhas'
};

/* ======= parametros ======= */

const novoServico = {
  tipo: TiposServicos.corte,
  duracao: {
    horas: 1,
    minutos: 20
  }
};

const getHorasEmMinutos = (horas) => {
  return HorasEmMinutos[horas] || 0;
};

const cadastrarServico = (servico) => {
  const { horas, minutos } = servico.duracao;
  const duracaoTotal = getHorasEmMinutos(horas) + minutos;
  return duracaoTotal;
};

console.log(cadastrarServico(novoServico));