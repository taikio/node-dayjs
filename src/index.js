const dayjs = require("dayjs");
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const horarios = ['08:00', '09:00', '10:00', '11:00', '12:00'];
const todosAgendamentos = [
    { tipo: 'Barba', duracao: 15, horario: '08:00' },
    { tipo: 'Sobrancelhas', duracao: 30, horario: '09:00' }
];

const agendamento = {
    tipo: 'Corte',
    duracao: 30
};

const horariosDisponiveis = [];

for (horario of horarios){

  /* busca todos os agendamentos para o horario atual, por exemplo o horário das 8:00 */
  const horariosExistentes = todosAgendamentos.filter((a) => a.horario === horario);

  if (horariosExistentes.length > 0) {
    /* soma o tempo de duração de todos os agendamentos encontrados */
    const tempoTotalHorarios = horariosExistentes.map((h) => h.duracao).reduce((total, tempo) => total + tempo, 0);

    /* verifica se a duração do agendamento a ser feito ainda cabe naquele horário (período de 1 hora) */
    if ((tempoTotalHorarios + agendamento.duracao) < 60) {
      const [hora, minutos] = horario.split(':');

      /* cria uma data com o horário atual, ex. 11/11/2020 08:00 */
      let dataHora = dayjs().hour(hora).minute(minutos);
      
      /* adiciona o tempo total em minutos de todos os agendamentos para indicar a hora exata que o próximo agendamento pode começar */
      dataHora = dataHora.add(tempoTotalHorarios, 'minute');
      
      horariosDisponiveis.push(dataHora.format('HH:mm'));
    }
  } else {
    horariosDisponiveis.push(horario);
  }
};

console.log(horariosDisponiveis);
